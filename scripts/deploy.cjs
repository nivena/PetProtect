const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("🔐 Deployer Address:", deployer.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "MATIC");

  const gasOverrides = {
    gasLimit: 3_000_000,
    maxFeePerGas: ethers.parseUnits("150", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
  };

  // ✅ Deploy PetPolicy.sol
  console.log("🚀 Deploying PetPolicy contract...");
  const PetPolicy = await hre.ethers.getContractFactory("PetPolicy");
  const petPolicy = await PetPolicy.deploy(gasOverrides);
  await petPolicy.waitForDeployment();
  const policyAddress = await petPolicy.getAddress();
  console.log("✅ PetPolicy deployed at:", policyAddress);

  // 🟡 OPTIONAL: Uncomment to deploy Governance.sol later
  /*
  console.log("🚀 Deploying Governance contract...");
  const Governance = await hre.ethers.getContractFactory("Governance");
  const governance = await Governance.deploy(policyAddress, gasOverrides);
  await governance.waitForDeployment();
  const governanceAddress = await governance.getAddress();
  console.log("✅ Governance deployed at:", governanceAddress);
  */
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error.message || error);
  process.exitCode = 1;
});

