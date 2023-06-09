const developmentChains = ['hardhat', 'localhost'];
const fs = require('fs');

// Function to read the deployment result JSON file
const readDeploymentResult = () => {
  const deploymentResult = fs.readFileSync('./deployments/your-deployment-result.json');
  return JSON.parse(deploymentResult);
};

// Function to get the deployed contract's address
const getDeployedContractAddress = () => {
  const deploymentResult = readDeploymentResult();
  const contractName = 'YourContract'; // Replace with your contract name
  const network = 'mumbai'; // Replace with your network name
  const deployment = deploymentResult[contractName][network];
  return deployment.address;
};
const TWITTER_VERIFIER = '';
const SUB_ID = 30;

// Username & address to test
const TWITTER_USERNAME = 'ElonMusk';
const ETHEREUM_ADDRESS = getDeployedContractAddress();

module.exports = {
  developmentChains,
  TWITTER_VERIFIER,
  SUB_ID,
  TWITTER_USERNAME,
  ETHEREUM_ADDRESS,
   namedAccounts: {
    deployer: {
      default: 0,
    },
    contractAddress: {
      default: getDeployedContractAddress(),
    },
  },
};
