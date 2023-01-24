const { TWITTER_VERIFIER } = require('../helper-hardhat-config');
const create = require('../tasks/create');

const FUNDING_AMOUNT = '0.1'; // 0.1 LINK

const setupClient = async () => {
  await create({
    amount: FUNDING_AMOUNT,
    contract: TWITTER_VERIFIER,
  });
};

setupClient()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
