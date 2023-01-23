const { network, ethers } = require('hardhat');
const {
  developmentChains,
  networkConfig,
} = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const functionsOracleAddress = networkConfig[network.name].functionsOracle;

  const twitterVerifier = await deploy('TwitterVerifier', {
    from: deployer,
    args: [functionsOracleAddress],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log('Verifying contract...');
    await verify(twitterVerifier.address, [functionsOracleAddress]);
  }
};

module.exports.tags = ['all', 'twitter-verifier', 'main'];
