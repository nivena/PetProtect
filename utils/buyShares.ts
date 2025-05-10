// utils/buyShares.ts
import { ethers } from "ethers";

export async function buyShares(
  ownershipContract: ethers.Contract,
  listingId: number,
  sharesToBuy: number,
  pricePerShare: string | number
) {
  try {
    const rawPrice =
      typeof pricePerShare === "string"
        ? parseFloat(pricePerShare.replace(" MATIC", ""))
        : pricePerShare;

    const pricePerShareWei = ethers.parseUnits(rawPrice.toString(), "ether");
    const totalCost = pricePerShareWei * BigInt(sharesToBuy);

    // ✅ Try estimating gas dynamically
    let gasEstimate;
    try {
      gasEstimate = await ownershipContract.buyShares.estimateGas(
        listingId,
        sharesToBuy,
        { value: totalCost }
      );
    } catch (error) {
      console.warn("⚠️ Gas estimation failed. Using fallback gas limit.");
      gasEstimate = ethers.toBigInt(250000);
    }

    const tx = await ownershipContract.buyShares(listingId, sharesToBuy, {
      value: totalCost,
      gasLimit: gasEstimate + gasEstimate / BigInt(10), // Add buffer
      maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
      maxFeePerGas: ethers.parseUnits("150", "gwei"),
    });

    await tx.wait();
    alert("✅ Shares purchased successfully!");
  } catch (error: any) {
    console.error("❌ buyShares failed:", error);
    alert(error?.reason || error?.message || "Transaction failed.");
  }
}
