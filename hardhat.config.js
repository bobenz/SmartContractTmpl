require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const TEST_NETWORK_URL = process.env.TEST_NETWORK_URL || "";
const DEPLOY_NETWORK_URL = process.env.DEPLOY_NETWORK_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    testNetwork: {
      url: TEST_NETWORK_URL,
      accounts: [PRIVATE_KEY],
    },
    deployNetwork: {
      url: DEPLOY_NETWORK_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
