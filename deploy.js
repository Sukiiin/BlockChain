// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through node <script>.
//
// You can also run a script with npx hardhat run <script>. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // Deploy ChocolateShop contract
    const ChocolateShop = await hre.ethers.getContractFactory("ChocolateShop");
    const chocolateShop = await ChocolateShop.deploy( {
      gasLimit: 1000000, // Adjust gas limit as needed
    });
    await chocolateShop.deployed();

    console.log(`ChocolateShop contract deployed to: ${chocolateShop.address}`);
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });