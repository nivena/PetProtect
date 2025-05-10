"use client";

import Sidebar from "@/components/shared/Sidebar";
/* import Portfolio from "@/components/policies/Portfolio"; */
// import { ethers } from "ethers";
// import { getOwnershipContract } from "@/utils/loadContract";
// import { connectWallet } from "@/utils/connectWallet";
// import { usePortfolioValuation } from "@/hooks/usePortfolioValuation";
// import { useUserShares } from "@/hooks/useUserShares";
// import { useMaticPrice } from "@/hooks/useMaticPrice";

import { useMyPolicies } from "@/hooks/useMyPolicies";
import MyCoverage from "@/components/policies/MyCoverage";

export default function PortfolioPage() {
  const { policies, loading } = useMyPolicies();

  // Commented out logic tied to Ownership.sol
  /*
  const [ownershipContract, setOwnershipContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const userShares = useUserShares(ownershipContract, account);
  const maticPrice = useMaticPrice();
  const portfolioValue = usePortfolioValuation(ownershipContract, account);

  useEffect(() => {
    async function loadWallet() {
      const walletResponse = await connectWallet();
      setAccount(walletResponse.account);

      if (!walletResponse.signer) return;
      const contract = await getOwnershipContract(walletResponse.signer);
      setOwnershipContract(contract);
    }

    loadWallet();
  }, []);
  */

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-6 pt-20 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen">
        <h1 className="text-3xl font-bold text-center">🧾 My Coverage</h1>

        <MyCoverage policies={policies} />
        </div>
    </div>
  );
}


