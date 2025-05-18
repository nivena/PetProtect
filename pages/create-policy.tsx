"use client";

import { useState } from "react";
import Layout from "@/components/shared/Layout";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { connectWallet } from "@/utils/connectWallet";
import { getPetPolicyContract } from "@/utils/loadContract";
import { createPlan } from "@/utils/createPlan";

export default function CreatePolicyPage() {
  const [title, setTitle] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [price, setPrice] = useState("");
  const [insuredAmount, setInsuredAmount] = useState("");
  const [duration, setDuration] = useState("365");

  const handleSubmit = async () => {
    const wallet = await connectWallet();
    if (!wallet.signer) {
      alert("❌ Wallet signer not found. Please connect your wallet.");
      return;
    }

    const contract = await getPetPolicyContract(wallet.signer); // now safe

    if (!title || !price || !insuredAmount || !duration) {
      alert("Please fill in all fields");
      return;
    }

    await createPlan(
      contract,
      title,
      petType,
      parseFloat(price),
      parseFloat(insuredAmount),
      parseInt(duration)
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          🐾 Create a New Pet Insurance Plan
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Plan Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>

          <input
            type="number"
            placeholder="Price (MATIC)"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Insured Amount (MATIC)"
            className="w-full p-2 border rounded"
            value={insuredAmount}
            onChange={(e) => setInsuredAmount(e.target.value)}
          />

          <input
            type="number"
            placeholder="Duration (days)"
            className="w-full p-2 border rounded"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <PrimaryButton fullWidth onClick={handleSubmit}>
            Create Plan
          </PrimaryButton>
        </div>
      </div>
    </Layout>
  );
}
