const hre = require("hardhat");
const ethers = require("ethers"); // ✅ Ensure ethers is imported

async function main() {
    console.log("🚀 Deploying Governance contract...");

    // ✅ Ensure this is correctly formatted
    const ownershipContractAddress = "0x45baec4F14d3dA2958a411271Eca629cd60f84E3"; // Replace with latest deployed Ownership contract
    if (!ethers.isAddress(ownershipContractAddress)) {
        throw new Error("❌ Invalid Ownership contract address!");
    }

    const Governance = await hre.ethers.getContractFactory("Governance");

    try {
        const governance = await Governance.deploy(ownershipContractAddress);
        await governance.waitForDeployment();

        const governanceAddress = await governance.getAddress();
        console.log("✅ Governance contract deployed at:", governanceAddress);
    } catch (error) {
        console.error("❌ Deployment error:", error);
    }
}

main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});
