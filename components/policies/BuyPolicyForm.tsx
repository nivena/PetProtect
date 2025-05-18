import { useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import { useCreatePolicy } from "@/hooks/useCreatePolicy";
import PrimaryButton from "@/components/shared/PrimaryButton";
import toast from "react-hot-toast";

const PLAN_PRICES: Record<string, string> = {
  "standard-dog": "0.01",
  "premium-dog": "0.02",
  "standard-cat": "0.01",
};

export default function BuyPolicyForm({
  selectedPlan: initialPlan,
}: {
  selectedPlan: string;
}) {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [preexisting, setPreexisting] = useState("No");
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || "");

  const { createPolicy, isCreating } = useCreatePolicy();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!petName.trim()) return alert("Please enter your pet's name.");
    if (!selectedPlan) return alert("Please select a plan.");

    try {
      await toast.promise(
        createPolicy(petName, imageFilename || "/uploads/default.png"),
        {
          loading: "⏳ Creating policy...",
          success: `✅ Policy for ${petName} created!`,
          error: "❌ Failed to create policy.",
        }
      );

      setPetName("");
      setPetAge("");
      setPreexisting("No");
    } catch (err: unknown) {
      console.error("❌ Error creating policy:", err);
      // If needed later, you can do:
      // if (err instanceof Error) console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4 pt-20">📝 Policy Details</h2>

      <input
        type="text"
        placeholder="🐶 Pet Name"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <ImageUpload onImageUpload={setImageFilename} />

      <input
        type="number"
        placeholder="🎂 Pet Age"
        value={petAge}
        onChange={(e) => setPetAge(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <select
        value={preexisting}
        onChange={(e) => setPreexisting(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="No">Does your pet have preexisting conditions?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <select
        value={selectedPlan}
        onChange={(e) => setSelectedPlan(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">🩺 Select a Plan</option>
        <option value="standard-dog">Standard Dog Plan</option>
        <option value="premium-dog">Premium Dog Plan</option>
        <option value="standard-cat">Standard Cat Plan</option>
      </select>

      <PrimaryButton
        type="submit"
        variant="blue"
        disabled={isCreating || !selectedPlan}
      >
        {isCreating
          ? "Creating..."
          : selectedPlan && PLAN_PRICES[selectedPlan]
          ? `Buy Policy for ${PLAN_PRICES[selectedPlan]} MATIC`
          : "Select a Plan"}
      </PrimaryButton>
    </form>
  );
}
