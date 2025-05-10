/*
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaHome } from "react-icons/fa";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface Props {
  ownershipContract: ethers.Contract | null;
  governanceContract: ethers.Contract | null;
  account: string | null;
  refreshProposals: () => void;
}

export default function CreateProposalForm({
  ownershipContract,
  governanceContract,
  account,
  refreshProposals,
}: Props) {
  const [ownedProperties, setOwnedProperties] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Fetch owned properties on load
  useEffect(() => {
    async function fetchOwnedProperties() {
      if (!ownershipContract || !account) return;

      try {
        const [propertyIds, ,] = await ownershipContract.getOwnedShares(
          account
        );

        const results = await Promise.all(
          propertyIds.map(async (id: any) => {
            try {
              const propertyDetails = await ownershipContract.getProperty(id);
              return {
                id: id.toString(),
                name: propertyDetails[0] || `Property #${id}`,
              };
            } catch {
              return {
                id: id.toString(),
                name: `Property #${id}`,
              };
            }
          })
        );

        setOwnedProperties(results);
      } catch (error) {
        console.error("❌ Error fetching owned properties:", error);
      }
    }

    fetchOwnedProperties();
  }, [ownershipContract, account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!governanceContract || !selectedPropertyId || !description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const gasLimit = await governanceContract.createProposal.estimateGas(
        parseInt(selectedPropertyId),
        description
      );
      console.log("📨 Creating proposal with values:", {
        propertyId: parseInt(selectedPropertyId),
        description,
      });

      const tx = await governanceContract.createProposal(
        parseInt(selectedPropertyId),
        description,
        {
          gasLimit: gasLimit + gasLimit / BigInt(10),
          maxFeePerGas: ethers.parseUnits("150", "gwei"), // ✅ Safe default
          maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"), // ✅ Boosts confirmation
        }
      );

      await tx.wait();
      alert("✅ Proposal created successfully!");
      setSelectedPropertyId("");
      setDescription("");
      refreshProposals();
    } catch (error) {
      console.error("❌ Error creating proposal:", error);
      alert("Error creating proposal. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mt-6 max-w-xl mx-auto"
    >
<h3 className="text-lg font-semibold mb-4">📜 Submit a Policy Proposal</h3>

<label className="block mb-2 flex items-center gap-2 text-gray-700">
  <FaHome className="text-lg" />
  Select Policy:

        <select
          value={selectedPropertyId}
          onChange={(e) => setSelectedPropertyId(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">-- Select --</option>
          {[...new Map(ownedProperties.map((p) => [p.id, p])).values()].map(
            (prop) => (
              <option key={prop.id} value={prop.id}>
                {prop.name}
              </option>
            )
          )}
        </select>
      </label>

      <label className="block mb-4">
        ✏️ Policy Proposal Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Describe your policy change, payout, or update..."
          />
      </label>

      <PrimaryButton
        type="submit"
        variant="gold"
        fullWidth={false}
        className="flex items-center gap-2 text-gold"
      >
        <FaPlusCircle className="text-lg" />
        Submit Policy Proposal
      </PrimaryButton>
    </form>
  );
}
*/