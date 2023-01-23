# Step-by-step Guide (easy mode)

1. The EOA should be whitelisted to deploy a full oracle.

2. Create and deploy the FunctionsClient compatible contract (see example in /lib/contracts/FunctionsClient.sol) ; it should be deployed with the Functions Oracle address as a constructor argument (see lib/network-config.js).

3. Get the contract addresses from the output ()
   0x0D0bB690F09a6c5D25C5365Dd8f0a84dBd97B937

# To check after pull

- Update from lib
  - lib/network-config.js -> network-config.js
  - lib/contracts -> contracts/lib
  - tasks/Functions-billing/create -> tasks/create
  - tasks/Functions-client/request -> tasks/request
    - for both, module.exports, transform to classic async
    - for request, update Functions-request-config path
  - FunctionsRequestSimulator -> tasks/FunctionsRequestSimulator
