"use client";

import { useState, useEffect } from "react";

import { connectWallet } from "@/utils/connectWallet";
import { ethers } from "ethers";
import Image from "next/image";
import axios from "axios";

import Sidebar from "@/components/shared/Sidebar";
import AddProperty from "@/components/policies/CreatePolicy"; 

import { useUserPolicies } from "@/hooks/useUserPolicies";
import { useMaticPrice } from "@/hooks/useMaticPrice";
import { FaChartBar } from "react-icons/fa";
import { fetchUserShares } from "@/utils/fetchUserShares";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Layout from "@/components/shared/Layout";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useMyPolicies } from "@/hooks/useMyPolicies";
import MiniPolicyGrid from "@/components/policies/MiniPolicyGrid";

export default function Dashboard() {
  const [account, setAccount] = useState<string | null>(null);
  const [ownershipContract, setOwnershipContract] =
    useState<ethers.Contract | null>(null);
  const [governanceContract, setGovernanceContract] =
    useState<ethers.Contract | null>(null);
    const [userPolicies, setUserPolicies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const maticPrice = useMaticPrice();
  const [isLoading, setIsLoading] = useState(false);
  const { policies, loading: loadingPolicies } = useMyPolicies();

  useEffect(() => {

    async function loadWallet() {
      const walletResponse = await connectWallet();
      setAccount(walletResponse.account);

      if (!walletResponse.signer) return;
    
    }

    loadWallet();
  }, []);

  const [userSharesToSell, setUserSharesToSell] = useState<
    Record<string, number>
  >({});
  console.log("🔄 Fetching user shares after transaction...");

  

  async function sellShares(propertyId: number, shares: number, price: number) {
    if (!ownershipContract) {
      alert("❌ Ownership contract is not connected!");
      return;
    }
    console.log("📝 Attempting to list shares:", {
      propertyId,
      shares,
      price,
      account,
    });

    try {
      console.log(
        `💰 Listing shares for sale: Property ${propertyId}, Shares: ${shares}, Price: ${price} MATIC`
      );

      const formattedPrice = ethers.parseUnits(price.toString(), "ether");

      let gasEstimate;
      try {
        gasEstimate = await ownershipContract.listSharesForSale.estimateGas(
          propertyId,
          shares,
          formattedPrice
        );
      } catch (error) {
        console.warn("⚠️ Gas estimation failed. Using fallback gas limit.");
        gasEstimate = ethers.toBigInt(250000);
      }
      setIsLoading(true);
      const tx = await ownershipContract.listSharesForSale(
        propertyId,
        shares,
        formattedPrice,
        {
          gasLimit: gasEstimate + gasEstimate / BigInt(10),
          maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
          maxFeePerGas: ethers.parseUnits("150", "gwei"),
        }
      );

      await tx.wait();
      setIsLoading(false);
      if (ownershipContract && account) {
        const updatedShares = await fetchUserShares(ownershipContract, account);
        console.log("✅ Updated shares after listing:", updatedShares);
      }

      alert("✅ Shares listed successfully!");
    } catch (error: any) {
      console.error("❌ Error listing shares:", error);
      alert(error?.reason || error?.message || "Transaction failed.");
    }
  }



  return (
    <Layout footerClassName="ml-64">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-6 pt-20 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen">
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          
            </div>
          )}
         <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-[#272d32]">
  <FaChartBar className="text-2xl" />
  Dashboard
  <img
    src="/fsre-logo.png"
    alt="Pet Protect Logo"
    className="h-8 w-8 rounded-full object-contain border border-gray-300 shadow-sm"
  />
</h1>
<p className="text-center mt-2 text-gray-600">
  Manage your policies, coverage, and claims.
</p>

{/* 🐾 Insurance Policies Preview */}
<div className="mt-6">
  <h2 className="text-xl font-semibold text-[#272d32] mb-2">Your Insurance Coverage</h2>
  <MiniPolicyGrid
  policies={policies.map((p, i) => ({ ...p, id: i })).slice(0, 4)} // ✅ Adds id
/>
{policies.length > 4 && (
  <div className="text-right mt-2">
    <a href="/my-coverage" className="text-sm text-blue-600 hover:underline">
      See all →
    </a>
  </div>
)}

</div>


          {false && (
            <div className="mt-8">
           
            </div>
          )}



          <div id="add-property" className="mt-8">
          <PrimaryButton
  onClick={() => setShowAddPolicy((prev) => !prev)}
  fullWidth={false}
  className="text-sm px-4 py-1 text-gold"
>
  {showAddPolicy ? (
    <div className="flex items-center gap-2">
      <FaMinusCircle className="text-gold text-lg" />
      <span className="text-gold">Hide Create Policy</span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <FaPlusCircle className="text-gold text-lg" />
      <span className="text-gold">Create a New Policy</span>
    </div>
  )}
</PrimaryButton>


            {showAddPolicy && (
              <div className="mt-4">
                <AddProperty
                  ownershipContract={ownershipContract}
                  account={account}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
