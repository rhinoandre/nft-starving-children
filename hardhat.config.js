require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
     mumbai: {
       url: "https://rpc-mumbai.maticvigil.com",
       accounts: [process.env.privateKey]
     }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./blockchain/contracts",
    tests: "./blockchain/test",
    cache: "./blockchain/cache",
    artifacts: "./blockchain/artifacts"
  }
}