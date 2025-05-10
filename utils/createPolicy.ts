// utils/createPolicy.ts
import { ethers } from "ethers";

export async function createPolicy(
  contract: ethers.Contract,
  planId: number,
  priceInMatic: number
) {
  try {
    const value = ethers.parseUnits(priceInMatic.toString(), "ether");

    const gasEstimate = await contract.createPolicy.estimateGas(planId, {
      value,
    });

    const tx = await contract.createPolicy(planId, {
      value,
      gasLimit: gasEstimate + gasEstimate / BigInt(10),
      maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
      maxFeePerGas: ethers.parseUnits("150", "gwei"),
    });

    await tx.wait();
    alert("✅ Policy created successfully!");
  } catch (error: any) {
    console.error("❌ Error creating policy:", error);
    alert(error?.reason || error?.message || "Policy creation failed.");
  }
}
