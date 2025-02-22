const fs = require('fs');

// Loads environment variables from .env file (if it exists)
require('dotenv').config();

const Location = {
  Inline: 0,
};

const CodeLanguage = {
  JavaScript: 0,
};

const ReturnType = {
  uint: 'uint256',
  uint256: 'uint256',
  int: 'int256',
  int256: 'int256',
  string: 'string',
  bytes: 'Buffer',
  Buffer: 'Buffer',
};

// Configure the request by setting the fields below
const requestConfig = (clientId, address) => {
  return {
    // location of source code (only Inline is curently supported)
    codeLocation: Location.Inline,
    // location of secrets (only Inline is currently supported)
    secretsLocation: Location.Inline,
    // code language (only JavaScript is currently supported)
    codeLanguage: CodeLanguage.JavaScript,
    // string containing the source code to be executed
    // ! -- OVERRIDEN BY THE IMPLEMENTATION --
    source: fs
      .readFileSync('./functions/Functions-request-source.js')
      .toString(),
    //source: fs.readFileSync('./Functions-request-source-API-example.js').toString(),
    // number of HTTP queries the source code is allowed to make
    numAllowedQueries: 4,
    // secrets can be accessed within the source code with `secrets.varName` (ie: secrets.apiKey)
    // ! -- OVERRIDEN BY THE IMPLEMENTATION --
    secrets: { apiKey: process.env.GOOGLE_BEARER_TOKEN },
    // ETH wallet key used to sign secrets so they cannot be accessed by a 3rd party
    walletPrivateKey: process.env['PRIVATE_KEY'],
    // DON public key used to encrypt secrets so they are not exposed on-chain
    DONPublicKey:
      'f2f9c47363202d89aa9fa70baf783d70006fe493471ac8cfa82f1426fd09f16a5f6b32b7c4b5d5165cd147a6e513ba4c0efd39d969d6b20a8a21126f0411b9c6',
    // args (string only array) can be accessed within the source code with `args[index]` (ie: args[0]).
    // ! -- OVERRIDEN BY THE IMPLEMENTATION --
    // ! @param {string} twitterHandle - The twitter handle to be verified
    // ! @param {string} ethereumAddress - The ethereum address to be verified
    args: [clientId, address],
    // maximum size of a response in bytes
    maxResponseBytes: 256,
    // expected type of the returned value
    expectedReturnType: ReturnType.string,
  };
};

module.exports = requestConfig;
