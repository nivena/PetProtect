import { useState } from "react";
import { ethers } from "ethers";
import ImageUpload from "@/components/shared/ImageUpload";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function CreatePolicy() {
  const [policyName, setPolicyName] = useState("");
  const [valuation, setValuation] = useState("");
  const [coverageUnits, setCoverageUnits] = useState("");
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const handleImageUpload = (filename: string) => setImageFilename(filename);

  async function handleCreatePolicy(event: React.FormEvent) {
    event.preventDefault();
    console.log("🚧 Create policy logic goes here.");
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
