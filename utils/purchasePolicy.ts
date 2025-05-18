import { ethers } from "ethers";

export async function purchasePolicy(
  policyContract: ethers.Contract,
  petName: string
) {
  try {
    if (!petName || petName.trim().length < 2) {
      alert("❌ Please enter a valid pet name.");
      return;
    }

    const tx = await policyContract.createPolicy(petName, {
      value: ethers.parseUnits("0.01", "ether"), // Must match PREMIUM_PRICE in contract
      gasLimit: ethers.toBigInt(250000),
      maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
      maxFeePerGas: ethers.parseUnits("150", "gwei"),
    });

    await tx.wait();
    alert("✅ Policy created successfully!");
  } catch (error: any) {
    console.error("❌ Failed to purchase policy:", error);
    alert(error?.reason || error?.message || "Transaction failed.");
  }
}
