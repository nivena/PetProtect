import { ethers } from "ethers";

export function formatPrice(price: bigint | number): string {
  if (!price || price === 0n || price === 0) return "0.00 MATIC";

  // Normalize to bigint if it's a number
  const wei =
    typeof price === "bigint"
      ? price
      : ethers.parseUnits(price.toString(), "ether");

  return parseFloat(ethers.formatEther(wei)).toFixed(4) + " MATIC";
}
