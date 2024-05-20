require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: 'https://ethereum-sepolia-rpc.publicnode.com',
      accounts: ["71ff11bff9096b819597830035d36aece912c61d1db9dcdc35506923e95e2db0"],//enter private key
    },
  },
};