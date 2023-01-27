# Step-by-step Guide (easy mode)

1. The EOA should be whitelisted to deploy a full oracle.

2. Create and deploy the FunctionsClient compatible contract (see example in `/lib/contracts/FunctionsClient.sol`) ; it should be deployed with the Functions Oracle address as a constructor argument (see lib/network-config.js).

3. Get the contract addresses from the output, and update it in `./helper-hardhat-config.js`.

4. Run `scripts/setup-client.js`, after updating the `FUNDING_AMOUNT`.

5. Get the subscription ID from the output, and update it in `./helper-hardhat-config.js`.

6. Run `scripts/execute-request.js`, after putting an example `TWITTER_USERNAME` and `ETHEREUM_ADDRESS` in `./helper-hardhat-config.js`.

Example:

```bash
$ yarn hardhat run scripts/execute-request.js --network mumbai
```

---

# To check after pull

- Update from lib
  - lib/network-config.js -> network-config.js
  - lib/contracts -> contracts/lib
  - tasks/Functions-billing/create -> tasks/create
  - tasks/Functions-client/request -> tasks/request
    - for both, module.exports, transform to classic async
    - for request, update Functions-request-config path
  - FunctionsRequestSimulator -> tasks/FunctionsRequestSimulator
