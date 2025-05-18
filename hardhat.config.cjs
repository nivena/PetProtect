require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // ✅ Enables .env file usage

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.18",
      },
      {
        version: "0.8.20",
      },
    ],
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygonAmoy: {
      url: process.env.QUICKNODE_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
      gasPrice: 70_000_000_000,
      maxPriorityFeePerGas: 60_000_000_000,
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
