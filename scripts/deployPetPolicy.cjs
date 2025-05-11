const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔐 Deploying as:", deployer.address);
  console.log("🌐 Network:", hre.network.name);

  const PetPolicy = await hre.ethers.getContractFactory("PetPolicy");
  const contract = await PetPolicy.deploy({
    gasLimit: 3_000_000,
    maxFeePerGas: hre.ethers.parseUnits("150", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("100", "gwei"),
  });

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`✅ PetPolicy deployed at: ${contractAddress}`);
  console.log(
    `🔗 View on PolygonScan: https://amoy.polygonscan.com/address/${contractAddress}`
  );
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
