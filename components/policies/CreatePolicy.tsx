import { useState } from "react";
import { ethers } from "ethers";
// import { getOwnershipContract } from "@/utils/loadContract"; ❌ Ownership contract not used for Insurance
import axios from "axios";
import ImageUpload from "@/components/shared/ImageUpload";
import { useUserPolicies } from "@/hooks/useUserPolicies"; // 🔁 Consider renaming later
import { fetchMaticPrice } from "@/utils/fetchMaticPrice";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function CreatePolicy({
  ownershipContract,
  account,
}: {
  ownershipContract: ethers.Contract | null;
  account: string | null;
}) {
  const [policyName, setPolicyName] = useState("");
  const [valuation, setValuation] = useState("");
  const [coverageUnits, setCoverageUnits] = useState("");
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const handleImageUpload = (filename: string) => setImageFilename(filename);

  const { refreshPolicies } = useUserPolicies(ownershipContract, account);

  async function handleCreatePolicy(event: React.FormEvent) {
    event.preventDefault();

    // ❌ Skip real estate contract logic for now
  //  alert("🔧 Policy creation coming soon!");
  //  return;

    /*
    if (!ownershipContract || !account) {
      alert("❌ Insurance contract or account not loaded.");
      return;
    }

    console.log("📤 Debugging Policy Creation:", {
      policyName,
      imageFilename,
      coverageUnits,
      valuation,
    });

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const insuranceInstance = await getOwnershipContract(signer);

      if (!insuranceInstance) {
        console.error("❌ getOwnershipContract returned undefined.");
        return;
      }

      if (!policyName.trim()) {
        alert("❌ Policy name is required.");
        return;
      }

      const finalImageFilename = imageFilename?.startsWith("/uploads/")
        ? imageFilename
        : `/uploads/${imageFilename}`;

      const maticPrice = await fetchMaticPrice();
      const valuationInMatic = ethers.parseUnits(
        (Number(valuation) / maticPrice).toFixed(6),
        "ether"
      );

      if (!valuationInMatic || valuationInMatic <= 0n) {
        alert("❌ Invalid valuation amount.");
        return;
      }

      const coverageUnitsNumber = Number(coverageUnits);
      if (coverageUnitsNumber <= 0) {
        alert("❌ Invalid coverage units.");
        return;
      }

      let gasLimit;
      try {
        gasLimit = await insuranceInstance.addProperty.estimateGas(
          policyName,
          finalImageFilename,
          coverageUnits.toString(),
          valuationInMatic
        );
      } catch (error) {
        console.error("❌ Gas estimation failed:", error);
        alert("❌ Error estimating gas.");
        return;
      }

      const tx = await insuranceInstance.addProperty(
        policyName,
        finalImageFilename,
        coverageUnits.toString(),
        valuationInMatic,
        { gasLimit }
      );

      await tx.wait();
      alert(`✅ Policy "${policyName}" created successfully!`);

      setPolicyName("");
      setValuation("");
      setCoverageUnits("");
      refreshPolicies();
    } catch (error: any) {
      console.error("❌ Error creating policy:", error);
      if (error.code === "ACTION_REJECTED") {
        alert("❌ Transaction rejected.");
      } else {
        alert(error.message || "Unknown error occurred.");
      }
    }
    */
  }

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">➕ Create a New Policy</h2>
      <form onSubmit={handleCreatePolicy} className="space-y-4">
        <input
          type="text"
          placeholder="🐶 Policy Name"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <ImageUpload onImageUpload={handleImageUpload} />

        <input
          type="number"
          placeholder="💰 Total Coverage Value (USD)"
          value={valuation}
          onChange={(e) => setValuation(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="🔢 Coverage Units"
          value={coverageUnits}
          onChange={(e) => setCoverageUnits(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <PrimaryButton type="submit" variant="blue">
          Create Policy
        </PrimaryButton>
      </form>
    </div>
  );
}


