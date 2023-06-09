const developmentChains = ['hardhat', 'localhost'];
const fs = require('fs');

// Function to read the deployment result JSON file
function readDeploymentResult(filePath) {
    let address;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        if (!data) {
            console.error('No data to parse');
            return;
        }
        const result = JSON.parse(data);
        address = result.address;  // Accessing the 'address' field
    } catch (error) {
        console.error('An error occurred:', error);
    }
    return address;  // Return 'address' instead of the whole JSON object
}

// Then call the function with your file path
const deploymentAddress = "0x4EA6f43804c96D250AE2d6f7b9679b0560C0Ec17";

if (deploymentAddress) {
    try {
    console.log(`Deployment address: ${deploymentAddress}`);
    }
    catch(error) {
            console.log('Address could not be retrieved');

    }
} else {
    console.log('Address could not be retrieved');
}

// then call the function with your file path


// Function to get the deployed contract's address
const getDeployedContractAddress = () => {
  const deploymentResult = deploymentResult
  const contractName = 'TwitterVerifier'; // Replace with your contract name
  const network = 'mumbai'; // Replace with your network name
  const deployment = deploymentResult[contractName][network];
  return deployment.address;
};
const TWITTER_VERIFIER = deploymentResult;
const SUB_ID = 30;

// Username & address to test
const TWITTER_USERNAME = 'ElonMusk';
const ETHEREUM_ADDRESS = 0x4EA6f43804c96D250AE2d6f7b9679b0560C0Ec17;

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
