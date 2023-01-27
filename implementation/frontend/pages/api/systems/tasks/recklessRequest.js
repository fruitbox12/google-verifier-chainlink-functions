const { ethers } = require('ethers');
const { buildRequest } = require('./FunctionsRequestSimulator');
const {
  VERIFICATION_BLOCK_CONFIRMATIONS,
  networkConfig,
} = require('../network-config');

const twitterVerifierAbi = require('../abi/TwitterVerifier.json');
const functionsOracleAbi = require('../abi/FunctionsOracle.json');
const functionsBillingRegistryAbi = require('../abi/FunctionsBillingRegistry.json');

let returned = {
  result: null,
  billing: null,
  error: false,
  errorMsg: null,
  requestId: null,
};

module.exports = async (taskArgs, requestConfig, network) => {
  // A manual gas limit is required as the gas limit estimated by Ethers is not always accurate
  const overrides = {
    gasLimit: 500000,
  };

  if (network === 'goerli') {
    overrides.maxPriorityFeePerGas = ethers.utils.parseUnits('50', 'gwei');
    overrides.maxFeePerGas = ethers.utils.parseUnits('50', 'gwei');
  }

  // Setup a provider we can use in ethers.Contract
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_MUMBAI_RPC_URL,
  );
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider,
  );

  // Get the required parameters
  const contractAddr = taskArgs.contract;
  const subscriptionId = taskArgs.subid;
  const gasLimit = parseInt(taskArgs.gaslimit ?? '100000');
  if (gasLimit > 300000) {
    throw Error('Gas limit must be less than or equal to 300,000');
  }

  const clientContract = new ethers.Contract(
    contractAddr,
    twitterVerifierAbi,
    signer,
  );
  const oracle = new ethers.Contract(
    networkConfig[network]['functionsOracle'],
    functionsOracleAbi,
    signer,
  );
  const registryAddress = await oracle.getRegistry();
  const registry = new ethers.Contract(
    registryAddress,
    functionsBillingRegistryAbi,
    signer,
  );

  // ! This step is extremely important
  // ! If the listeners are not removed, the listeners will keep listening for events
  // ! for an indefinite amount of time (until the server is stopped), therefore
  // ! making a very high amount of requests to the provider
  const removeAllListeners = () => {
    oracle.removeAllListeners();
    clientContract.removeAllListeners();
    registry.removeAllListeners();
  };

  const returnError = (msg) => {
    returned.error = true;
    returned.errorMsg = msg;
    removeAllListeners();

    return returned;
  };

  // Check that the subscription is valid
  let subInfo;
  try {
    subInfo = await registry.getSubscription(subscriptionId);
  } catch (err) {
    if (err.errorName === 'InvalidSubscription')
      return returnError(
        `Subscription ID "${subscriptionId}" is invalid or does not exist`,
      );

    return returnError(err.message);
  }
  // Validate the client contract has been authorized to use the subscription
  const existingConsumers = subInfo[2].map((addr) => addr.toLowerCase());
  if (!existingConsumers.includes(contractAddr.toLowerCase())) {
    return returnError(
      `Consumer contract ${contractAddr} is not registered to use subscription ${subscriptionId}`,
    );
  }

  // Fetch the DON public key from on-chain
  const DONPublicKey = await oracle.getDONPublicKey();
  // Remove the preceeding 0x from the DON public key
  requestConfig.DONPublicKey = DONPublicKey.slice(2);
  // Build the parameters to make a request from the client contract
  const request = await buildRequest(requestConfig);

  // Loose the cost estimation here ; it's low enough that
  // it's not worth the effort to get it right in that non-hardhat environment

  // Use a promise to wait & listen for the fulfillment event before returning
  return await new Promise(async (resolve, reject) => {
    let requestId;

    // Initate the listeners before making the request
    // Listen for fulfillment errors
    oracle.once('UserCallbackError', async (eventRequestId, msg) => {
      if (requestId == eventRequestId) {
        console.log('Error in client contract callback function');
        console.log(msg);

        // ! kill all listeners
        return resolve(
          returnError('Error in client contract callback function'),
        );
      }
    });
    oracle.once('UserCallbackRawError', async (eventRequestId, msg) => {
      if (requestId == eventRequestId) {
        console.log('Raw error in client contract callback function');
        console.log(Buffer.from(msg, 'hex').toString());

        // ! kill all listeners
        return resolve(
          returnError('Raw error in client contract callback function'),
        );
      }
    });
    // Listen for successful fulfillment
    let billingEndEventRecieved = false;
    let ocrResponseEventReceived = false;
    clientContract.once('OCRResponse', async (eventRequestId, result, err) => {
      // Ensure the fulfilled requestId matches the initiated requestId to prevent logging a response for an unrelated requestId
      if (eventRequestId !== requestId) {
        return;
      }
      console.log(`Request ${requestId} fulfilled!`);

      if (result !== '0x') {
        const decodedOutput = Buffer.from(result.slice(2), 'hex').toString();

        console.log(
          `Response returned to client contract represented as a hex string: ${result}\n${decodedOutput}`,
        );

        returned.result = {
          hex: result,
          decoded: decodedOutput,
        };
      }
      if (err !== '0x') {
        console.log(
          `Error message returned to client contract: "${Buffer.from(
            err.slice(2),
            'hex',
          )}"\n`,
        );

        returned.error = true;
        returned.errorMsg = Buffer.from(err.slice(2), 'hex').toString();
      }

      ocrResponseEventReceived = true;

      if (billingEndEventRecieved) {
        // ! kill all listeners
        removeAllListeners();
        return resolve(returned);
      }
    });

    // Listen for the BillingEnd event, log cost breakdown & resolve
    registry.once(
      'BillingEnd',
      async (
        eventRequestId,
        eventSubscriptionId,
        eventSignerPayment,
        eventTransmitterPayment,
        eventTotalCost,
        eventSuccess,
      ) => {
        if (requestId == eventRequestId) {
          const transmissionCost = ethers.utils.formatUnits(
            eventTransmitterPayment,
            18,
          );
          const baseFee = ethers.utils.formatUnits(eventSignerPayment, 18);
          const totalCost = ethers.utils.formatUnits(eventTotalCost, 18);

          // Check for a successful request & log a mesage if the fulfillment was not successful
          console.log(`Transmission cost: ${transmissionCost} LINK`);
          console.log(`Base fee: ${baseFee} LINK`);
          console.log(`Total cost: ${totalCost} LINK\n`);
          if (!eventSuccess) {
            console.log(
              'Error encountered when calling fulfillRequest in client contract.\n' +
                'Ensure the fulfillRequest function in the client contract is correct and the --gaslimit is sufficent.',
            );

            // ! kill all listeners
            return resolve(
              returnError(`Error encountered when calling fulfillRequest in client contract.\n
            Ensure the fulfillRequest function in the client contract is correct and the --gaslimit is sufficent.`),
            );
          }

          billingEndEventRecieved = true;
          returned.billing = {
            transmissionCost,
            baseFee,
            totalCost,
          };

          if (ocrResponseEventReceived) {
            // ! kill all listeners
            removeAllListeners();
            return resolve(returned);
          }
        }
      },
    );

    // Initiate the on-chain request after all listeners are initalized
    console.log(
      `\nRequesting new data for FunctionsConsumer contract ${contractAddr} on network ${network}`,
    );
    const requestTx = await clientContract.executeRequest(
      request.source,
      request.secrets ?? [],
      request.args ?? [],
      subscriptionId,
      gasLimit,
      overrides,
    );

    // If a response is not received within 5 minutes, the request has failed
    setTimeout(() => {
      // Don't just return an error, maybe one of the listeners
      // catched the response but not the other one
      returned.error = true;
      returned.errorMsg =
        'A response not received within 5 minutes of the request being initiated and has been canceled. Your subscription was not charged. Please make a new request.';
      // ! kill all listeners
      removeAllListeners();
      return resolve(returned);
    }, 300_000);

    console.log(
      `Waiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${requestTx.hash} to be confirmed...`,
    );

    const requestTxReceipt = await requestTx.wait(
      VERIFICATION_BLOCK_CONFIRMATIONS,
    );
    requestId = requestTxReceipt.events[2].args.id;
    returned.requestId = requestId;
    console.log(`\nRequest ${requestId} initiated`);
    console.log(`Waiting for fulfillment...\n`);
  });
};
