// hooks/useMyPolicies.ts
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getPetPolicyContract } from "@/utils/loadContract";
import { connectWallet } from "@/utils/connectWallet";

type Policy = {
  petName: string;
  insuredAmount: string;
  startDate: number;
  endDate: number;
  active: boolean;
  claimCount: number;
};

export function useMyPolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPolicies() {
      try {
        const wallet = await connectWallet();

        if (!wallet.signer) return;
        const contract = await getPetPolicyContract(wallet.signer);

        const rawPolicies = await contract.getMyPolicies();

        const formatted = rawPolicies.map((p: any) => ({
          petName: p.petName,
          insuredAmount: ethers.formatEther(p.insuredAmount),
          startDate: Number(p.startDate),
          endDate: Number(p.endDate),
          active: p.active,
          claimCount: Number(p.claimCount),
        }));

        setPolicies(formatted);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching policies:", error);
        setLoading(false);
      }
    }

    fetchPolicies();
  }, []);

  return { policies, loading };
}
