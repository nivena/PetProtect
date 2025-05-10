// 🚧 Temporary stub — using property-style logic.
// 🐾 Replace with `getMyPolicies()` from PetPolicy.sol for insurance MVP.
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useUserPolicies(
  ownershipContract: ethers.Contract | null,
  account: string | null
) {
  const [userPolicies, setUserPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUserPolicies(
    contractInstance: ethers.Contract,
    userAccount: string
  ) {
    try {
      const [policyIds, shares, images]: [BigInt[], BigInt[], string[]] =
        await contractInstance.getOwnedShares(userAccount);

      const policiesArray = policyIds.map((id, index) => ({
        id: Number(id),
        shares: Number(shares[index]),
        image: images[index]?.includes("/uploads/")
          ? images[index]
          : `/uploads/${images[index]}`,
      }));

      setUserPolicies([]);
      setTimeout(() => setUserPolicies(policiesArray), 100);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching user policies:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ownershipContract && account) {
      fetchUserPolicies(ownershipContract, account);
    }
  }, [ownershipContract, account]);

  const refreshPolicies = () => {
    if (ownershipContract && account) {
      fetchUserPolicies(ownershipContract, account);
    }
  };

  return {
    userPolicies,
    loading,
    refreshPolicies,
  };
}
