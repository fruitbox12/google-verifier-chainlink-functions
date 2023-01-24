const {
  TWITTER_VERIFIER,
  SUB_ID,
  TWITTER_USERNAME,
} = require('../helper-hardhat-config');
const requestConfig = require('../functions/Functions-request-config');
// If you want the console confirmations & simulation
// const request = require('../tasks/request');
// If you don't want the console confirmations & simulation
const request = require('../tasks/recklessRequest');

const executeRequest = async (username) => {
  const config = requestConfig(username);
  const response = await request(
    {
      contract: TWITTER_VERIFIER,
      subid: SUB_ID,
      // gaslimit: optional
    },
    config,
  );

  // If used with recklessRequest.js, it should return
  // response = {
  //   result: {
  //     hex: 'result_in_hex',
  //     decoded: 'result_as_string_number',
  //   },
  //   billing: {
  //     transmissionCost: 'transmission_cost',
  //     baseFee: 'base_fee',
  //     totalCost: 'total_cost',
  //   },
  //   error: true / false,
  // };

  return response;
};

executeRequest(TWITTER_USERNAME)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
