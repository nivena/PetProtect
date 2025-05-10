import { ethers } from "ethers";

export function formatPrice(price: bigint | number): string {
  if (!price || price === 0n) return "0.00 MATIC";

  if (price < BigInt("1000000000000000")) {
    return price.toString() + ".00 MATIC";
  }

  return ethers.formatEther(price) + " MATIC";
}
