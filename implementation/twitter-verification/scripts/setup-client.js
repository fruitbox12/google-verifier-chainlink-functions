//const { TWITTER_VERIFIER } = require('../helper-hardhat-config');
const create = require('../tasks/create');

const FUNDING_AMOUNT = '1'; // 1.0 LINK

const setupClient = async () => {
  await create({
    amount: FUNDING_AMOUNT,
    contract: "0x4EA6f43804c96D250AE2d6f7b9679b0560C0Ec17",
  });
};

setupClient()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
