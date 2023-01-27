const { TWITTER_VERIFIER, SUB_ID } = require('../helper-hardhat-config');
const requestConfig = require('../functions/Functions-request-config');
const request = require('../tasks/recklessRequest');

const executeRequest = async (username, address, network) => {
  const config = requestConfig(username, address);
  const response = await request(
    { contract: TWITTER_VERIFIER, subid: SUB_ID },
    config,
    network,
  );

  const obj = response.result?.decoded
    ? JSON.parse(response.result.decoded)
    : {};

  return {
    data: obj,
    billing: response.billing,
    error: response.error,
    errorMsg: response.errorMsg,
    requestId: response.requestId,
  };
};

module.exports = executeRequest;
