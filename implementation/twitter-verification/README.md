# Step-by-step guide for testing (on a testnet)

Right now (2023-01-27), your EOA should be whitelisted to interact with the Functions Oracle.

1. Clone this repo

```bash
$ git clone git@github.com:0xpolarzero/twitter-verifier-chainlink-functions.git
```

2. Install dependencies

```bash
$ cd implementation/twitter-verification
$ yarn
```

3. Set the environment variables

```bash
$ cp .env.example .env
```

4. Deploy the client contract

```bash
$ yarn hardhat deploy --network network_name
```

5. Get the contract address from the output, and update it in `./helper-hardhat-config.js`.

6. Update the `FUNDING_AMOUNT` in `scripts/setup-client.js`, then create, fund and authorize the Functions billing subscription

```bash
$ yarn hardhat run scripts/setup-client.js --network network_name
```

7. Get the subscription ID from the output, and update it in `./helper-hardhat-config.js`.

8. Update the `TWITTER_USERNAME` and `ETHEREUM_ADDRESS` in `./helper-hardhat-config.js`. Then, create the request

```bash
$ yarn hardhat run scripts/execute-request.js --network network_name
```

---

# To check after pull

- Update from lib
  - lib/network-config.js -> network-config.js
  - lib/contracts -> contracts/lib
  - tasks/Functions-billing/create -> tasks/create
  - tasks/Functions-client/request -> tasks/request
    - for both, module.exports, transform to classic async
    - for request, update Functions-request-config path
  - FunctionsRequestSimulator -> tasks/FunctionsRequestSimulator
