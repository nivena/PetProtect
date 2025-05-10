// 📌 Property vertical only — do not use in insurance flows.

/*import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { fetchUserShares } from "@/utils/fetchUserShares";

export function useUserShares(
  ownershipContract: ethers.Contract | null,
  account: string | null
) {
  const [userShares, setUserShares] = useState<any[]>([]);

  useEffect(() => {
    if (!ownershipContract || !account) return;

    const loadShares = async () => {
      try {
        const result = await fetchUserShares(ownershipContract, account);
        setUserShares(result);
      } catch (err) {
        console.error("❌ Failed to fetch userShares:", err);
      }
    };

    loadShares();
  }, [ownershipContract, account]);

  return userShares;
}*/
