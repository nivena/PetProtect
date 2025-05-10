/*"use client";

import { useState } from "react";
import { ethers } from "ethers"; // ✅ Import ethers
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function AddShares({
 // ownershipContract,
  propertyId,
}: {
  ownershipContract: ethers.Contract | null;
  propertyId: number;
}) {
  const [newOwner, setNewOwner] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(1); // ✅ Minimum 1%
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAddShares() {
    if (!ownershipContract) {
      alert("❌ Connect your wallet first!");
      return;
    }

    // ✅ Corrected ethers address validation for Ethers v6
    if (!ethers.isAddress(newOwner)) {
      alert("❌ Invalid wallet address.");
      return;
    }

    if (percentage < 1 || percentage > 100) {
      alert("❌ Share percentage must be between 1% and 100%.");
      return;
    }

    try {
      setLoading(true);
      console.log(
        `🔄 Adding ${percentage}% shares of property ${propertyId} to ${newOwner}...`
      );

      // ✅ Calls addShare() correctly
      const tx = await ownershipContract.addShare(
        propertyId,
        newOwner,
        percentage
      );
      console.log("📡 Waiting for transaction to complete...");
      await tx.wait();

      alert(`✅ Successfully added ${percentage}% shares to ${newOwner}!`);
      setNewOwner("");
      setPercentage(1); // ✅ Reset to 1% instead of 0%
    } catch (error: any) {
      console.error("❌ Error adding shares:", error);
      alert(error?.message ?? "Error adding shares.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border p-4 rounded-lg shadow-md bg-gray-100 mt-4">
      <h2 className="text-xl font-bold">📈 Add Policy Shares</h2>

      <input
        type="text"
        placeholder="New Policyholder Wallet"
        className="border p-2 w-full"
        value={newOwner}
        onChange={(e) => setNewOwner(e.target.value)}
        id="newOwner"
      />

      <input
        type="number"
        placeholder="Coverage Share % (1-100)"
        className="border p-2 w-full mt-2"
        value={percentage}
        min="1"
        max="100"
        onChange={(e) => setPercentage(Number(e.target.value))}
        id="percentage"
      />

      <PrimaryButton
        onClick={handleAddShares}
        disabled={loading}
        variant="blue"
        fullWidth={false}
        className="mt-2"
      >
        {loading ? "Processing..." : "Add Shares"}
      </PrimaryButton>
    </div>
  );
}
*/