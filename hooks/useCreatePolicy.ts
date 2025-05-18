// hooks/useCreatePolicy.ts
import { useState } from "react";
import { ethers } from "ethers";
import { getPetPolicyContract } from "@/utils/loadContract";

export function useCreatePolicy() {
  const [isCreating, setIsCreating] = useState(false);

  async function createPolicy(
    petName: string,
    imageURI: string
  ): Promise<number | null> {
    try {
      if (!window.ethereum) throw new Error("No wallet provider found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = getPetPolicyContract(signer);

      setIsCreating(true);

      const tx = await contract.createPolicy(petName, imageURI, {
        value: ethers.parseEther("0.01"),
      });

      const receipt = await tx.wait();

      const event = receipt.logs?.find(
        (log: any) => log?.eventName === "PolicyCreated"
      );

      setIsCreating(false);

      return event?.args?.policyId?.toNumber?.() ?? null;
    } catch (err: any) {
      console.error("❌ Error creating policy:", err);
      setIsCreating(false);
      throw err;
    }
  }

  return { createPolicy, isCreating };
}
