import { useState } from "react";
import ImageUpload from "@/components/shared/ImageUpload";
import { getPetPolicyContract } from "@/utils/loadContract";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { ethers } from "ethers";
import toast from "react-hot-toast";

type SubmitClaimFormProps = {
  policyId: number;
  onClose: () => void;
  refresh: () => Promise<void>;
};

export default function SubmitClaimForm({
  policyId,
  onClose,
  refresh,
}: SubmitClaimFormProps) {
  const [description, setDescription] = useState("");
  const [invoiceURI, setInvoiceURI] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.ethereum) {
      toast.error("❌ Please connect your wallet.");
      return;
    }

    if (!invoiceURI) {
      toast.error("❌ Please upload your vet's invoice.");
      return;
    }

    if (!description.trim()) {
      toast.error("❌ Enter a short description.");
      return;
    }

    try {
      setSubmitting(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getPetPolicyContract(signer);

      // Step 1: Submit claim to policy contract
      const tx = await contract.submitClaim(policyId);
      await toast.promise(tx.wait(), {
        loading: "⏳ Submitting claim...",
        success: "✅ Claim submitted!",
        error: "❌ Failed to submit claim.",
      });

      setDescription("");
      setInvoiceURI(null);
      await refresh(); // now properly typed
      onClose(); // collapse form after success
    } catch (err) {
      console.error("❌ Submission failed:", err);
      toast.error("❌ Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-lg shadow"
    >
      <h3 className="text-lg font-bold">Submit a Claim</h3>

      <textarea
        placeholder="📝 Describe what happened"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        rows={4}
        required
      />

      <ImageUpload onImageUpload={setInvoiceURI} />

      <PrimaryButton type="submit" variant="blue" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Claim"}
      </PrimaryButton>
    </form>
  );
}
