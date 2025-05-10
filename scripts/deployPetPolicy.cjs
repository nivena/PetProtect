const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔐 Deploying as:", deployer.address);

  const PetPolicy = await hre.ethers.getContractFactory("PetPolicy");
  const contract = await PetPolicy.deploy({
    gasLimit: 3_000_000,
    maxFeePerGas: hre.ethers.parseUnits("150", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("100", "gwei"),
  });

  await contract.waitForDeployment();
  console.log("✅ PetPolicy deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
