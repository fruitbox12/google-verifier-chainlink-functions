const {
  TWITTER_VERIFIER,
  SUB_ID,
  TWITTER_USERNAME,
} = require('../helper-hardhat-config');
const request = require('../tasks/request');
// If you don't want the console confirmations
// const request = require('../tasks/recklessRequest');
const requestConfig = require('../functions/Functions-request-config');

const executeRequest = async () => {
  const config = requestConfig(TWITTER_USERNAME);
  await request(
    {
      contract: TWITTER_VERIFIER,
      subid: SUB_ID,
      // gaslimit: optional
    },
    config,
  );
};

executeRequest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
