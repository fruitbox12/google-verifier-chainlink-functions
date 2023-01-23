const developmentChains = ['hardhat', 'localhost'];

// TODO Check after pull that it didn't change
const networkConfig = {
  goerli: {
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    functionsOracle: '0xeB6863217327B044Ac3380D4122b32951377389A',
  },
  mumbai: {
    linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
    functionsOracle: '0x6199175d137B791B7AB06C3452aa6acc3519b254',
  },
  sepolia: {
    linkToken: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
    functionsOracle: '0x642E1EEE05Deedb98D92e3E0efDc37d36F7e6aeB',
  },
};

module.exports = {
  developmentChains,
  networkConfig,
};
