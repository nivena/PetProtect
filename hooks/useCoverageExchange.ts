// hooks/useCoverageExchange.ts
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { connectWallet } from "@/utils/connectWallet";
import { getPetPolicyContract } from "@/utils/loadContract";

type Plan = {
  id: number;
  title: string;
  petType: "Dog" | "Cat";
  price: number; // e.g., 0.01 MATIC
  insuredAmount: number; // e.g., 1.0 MATIC
  duration: string; // "12 months"
};

export function useCoverageExchange() {
  const [policyContract, setPolicyContract] = useState<ethers.Contract | null>(
    null
  );
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function load() {
      const wallet = await connectWallet();
      setAccount(wallet.account);

      if (!wallet.signer) {
        console.warn("❌ No signer found. Cannot load policy contract.");
        return;
      }

      const contract = await getPetPolicyContract(wallet.signer);
      setPolicyContract(contract);

      // ✅ Using static demo plans for whitelabel MVP. Replace with contract fetch in full version.
      setPlans([
        {
          id: 0,
          title: "Standard Dog Plan",
          petType: "Dog",
          price: 0.01,
          insuredAmount: 1.0,
          duration: "12 months",
        },
        {
          id: 1,
          title: "Standard Cat Plan",
          petType: "Cat",
          price: 0.01,
          insuredAmount: 1.0,
          duration: "12 months",
        },
      ]);

      setLoading(false);
      console.log("✅ Coverage plans loaded. Connected as:", wallet.account);
    }

    load();
  }, []);

  return { policyContract, account, loading, plans };
}
