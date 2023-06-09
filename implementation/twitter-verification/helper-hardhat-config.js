const developmentChains = ['hardhat', 'localhost'];
const fs = require('fs');

// Function to read the deployment result JSON file
function readDeploymentResult(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        if (!data) {
            console.error('No data to parse');
            return;
        }
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// then call the function with your file path
const deploymentResult = readDeploymentResult('./deployments/mumbai/TwitterVerifier.json') || {};


// Function to get the deployed contract's address
const getDeployedContractAddress = () => {
  const deploymentResult = deploymentResult
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
