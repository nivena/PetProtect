"use client";

import Sidebar from "@/components/shared/Sidebar";
/* import Listings from "@/components/policies/Listings"; */ // Not used yet
import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { getOwnershipContract } from "@/utils/loadContract";
import { connectWallet } from "@/utils/connectWallet";
import { useMaticPrice } from "@/hooks/useMaticPrice";
// import { fetchUserShares } from "@/utils/fetchUserShares"; // Real estate–specific

export default function PoliciesPage() {
  // Commenting out unused state for insurance vertical
  /*
  const [userShares, setUserShares] = useState<any[]>([]);
  const [userSharesToSell, setUserSharesToSell] = useState<Record<string, number>>({});
  const [ownershipContract, setOwnershipContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  */

  const [loading, setLoading] = useState(true);
  const maticPrice = useMaticPrice();

  // Commenting out real estate data loading
  /*
  useEffect(() => {
    async function loadProperties() {
      console.log("🔄 Connecting Wallet & Fetching Properties...");
      const walletResponse = await connectWallet();
      const signer = walletResponse.signer;
      if (!signer) return;

      const contractInstance = await getOwnershipContract(signer);
      if (!contractInstance) return;

      setOwnershipContract(contractInstance);
      setAccount(walletResponse.account);

      const shares = await fetchUserShares(contractInstance, walletResponse.account);
      setUserShares(shares);
      setLoading(false);
    }

    loadProperties();
  }, []);
  */

  // This will eventually be replaced by something like useMyInsurancePolicies()

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-center">🏥 Policies</h1>

        {loading ? (
          <p className="text-center text-gray-500">🔄 Loading Policies...</p>
        ) : (
          <p className="text-center text-gray-400">
            {/* TODO: Show actual insurance policies here once PetPolicy supports it */}
            No policies to display yet.
          </p>

          // Future component insertion point
          /*
          <Listings
            userShares={userShares.map((share) => ({
              ...share,
              propertyName: share.propertyName || `Policy #${share.id}`,
            }))}
            userSharesToSell={userSharesToSell}
            setUserSharesToSell={setUserSharesToSell}
            sellShares={sellShares}
            maticPrice={maticPrice}
          />
          */
        )}
      </div>
    </div>
  );
}

