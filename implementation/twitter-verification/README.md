# Step-by-step Guide (easy mode)

1. The EOA should be whitelisted to deploy a full oracle.
2. Deploy the oracle (with env variables setup in /lib):

```sh
cd ../../lib
npx hardhat functions-deploy-client --network network_name_here --verify true
```

3. Get the contract addresses from the output ()
   0xea6913f789b03dF45D9EE3C42Ba35E287924D159
