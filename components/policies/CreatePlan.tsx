// components/policies/CreatePlan.tsx
"use client";

import { useState } from "react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useCoverageExchange } from "@/hooks/useCoverageExchange";
import { createPlan } from "@/utils/createPlan";

export default function CreatePlan() {
  const { policyContract, account } = useCoverageExchange();

  const [title, setTitle] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [price, setPrice] = useState("");
  const [insuredAmount, setInsuredAmount] = useState("");
  const [duration, setDuration] = useState("365");

  const handleSubmit = async () => {
    if (!policyContract || !account) {
      alert("❌ Connect your wallet first.");
      return;
    }

    if (!title || !price || !insuredAmount || !duration) {
      alert("⚠️ Please complete all fields.");
      return;
    }

    try {
      await createPlan(
        policyContract,
        title,
        petType,
        parseFloat(price),
        parseFloat(insuredAmount),
        parseInt(duration)
      );
    } catch (error) {
      console.error("❌ Plan creation failed:", error);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold">➕ Create Insurance Plan</h2>

      <input
        type="text"
        placeholder="Plan Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <select
        value={petType}
        onChange={(e) => setPetType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      <input
        type="number"
        placeholder="Premium Price (MATIC)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Insured Amount (MATIC)"
        value={insuredAmount}
        onChange={(e) => setInsuredAmount(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Coverage Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <PrimaryButton fullWidth onClick={handleSubmit}>
        Create Plan
      </PrimaryButton>
    </div>
  );
}
