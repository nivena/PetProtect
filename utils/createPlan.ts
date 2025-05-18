// utils/createPlan.ts
import { ethers } from "ethers";

/**
 * Create a new insurance plan via smart contract
 */
export async function createPlan(
  policyContract: ethers.Contract,
  title: string,
  petType: string,
  price: number, // in MATIC
  insuredAmount: number, // in MATIC
  durationInDays: number
) {
  try {
    const priceWei = ethers.parseUnits(price.toString(), "ether");
    const insuredAmountWei = ethers.parseUnits(
      insuredAmount.toString(),
      "ether"
    );

    const tx = await policyContract.createPlan(
      title,
      petType,
      priceWei,
      insuredAmountWei,
      durationInDays,
      {
        gasLimit: ethers.toBigInt(300_000),
        maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
        maxFeePerGas: ethers.parseUnits("150", "gwei"),
      }
    );

    await tx.wait();
    alert("✅ Plan created successfully!");
  } catch (error: any) {
    console.error("❌ Error creating plan:", error);
    alert(error?.reason || error?.message || "Transaction failed.");
  }
}
