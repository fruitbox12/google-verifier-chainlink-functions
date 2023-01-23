const { TWITTER_VERIFIER, SUB_ID } = require('../helper-hardhat-config');
const request = require('../tasks/request');

const executeRequest = async () => {
  await request({
    contract: TWITTER_VERIFIER,
    subid: SUB_ID,
    // gaslimit: optional
  });
};

executeRequest()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
