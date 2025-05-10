/*import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { connectWallet } from "@/utils/connectWallet";
import {
  getOwnershipContract,
  getGovernanceContract,
} from "@/utils/loadContract";

export function useGovernanceProposals() {
  const [governanceContract, setGovernanceContract] =
    useState<ethers.Contract | null>(null);
  const [ownershipContract, setOwnershipContract] =
    useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [proposals, setProposals] = useState<any[]>([]);
  const [userShares, setUserShares] = useState<any[]>([]); // ✅ Added this

  useEffect(() => {
    async function loadContracts() {
      const wallet = await connectWallet();
      setAccount(wallet.account);

      const signer = wallet.signer;
      if (!signer) return;

      const gov = await getGovernanceContract(signer);
      const own = await getOwnershipContract(signer);

      setGovernanceContract(gov);
      setOwnershipContract(own);

      fetchGovernanceProposals(gov, own);

      // 🛠️ Get user's shares (correct mapping)
      const [propertyIds, shares, _] = await own.getOwnedShares(wallet.account);

      const mapped = await Promise.all(
        propertyIds.map(async (propertyId: any, index: number) => {
          let name = `Property #${propertyId}`;
          let listed = 0;

          try {
            const details = await own.getProperty(propertyId);
            name = details?.[0] || name;

            const listing = await own.getListing(propertyId); // ✅ CRUCIAL: use propertyId here
            if (
              listing[1]?.toLowerCase() === wallet.account.toLowerCase() &&
              listing[4]
            ) {
              listed = Number(listing[2]);
            }
          } catch {}

          const owned = Number(shares[index]);
          const unlisted = Math.max(0, owned - listed);

          return {
            id: propertyId.toString(),
            propertyName: name,
            shares: unlisted, // ✅ accurate voting power
          };
        })
      );

      setUserShares(mapped);
    }

    loadContracts();
  }, []);

  const fetchGovernanceProposals = async (
    govContract: ethers.Contract,
    ownContract: ethers.Contract
  ) => {
    try {
      const proposalsData = await govContract.getAllProposals();

      console.log("📥 Raw Proposal Data (from contract):", proposalsData);

      const formattedProposals = await Promise.all(
        proposalsData[0].map(async (id: any, index: number) => {
          const propertyId = proposalsData[1][index].toString();
          let propertyName = `Property #${propertyId}`;

          try {
            const details = await ownContract.getProperty(propertyId);
            propertyName = details?.[0] || propertyName;
          } catch {
            console.warn(
              `⚠️ Could not fetch property name for ID ${propertyId}`
            );
          }

          const proposal = {
            id: id.toString(),
            propertyId,
            propertyName,
            description: proposalsData[2][index],
            votesFor: proposalsData[3][index].toString(),
            votesAgainst: proposalsData[4][index].toString(),
            executed: proposalsData[5][index],
            proposer: proposalsData[6][index],
          };

          console.log("🧮 Mapped Proposal:", proposal);
          return proposal;
        })
      );

      console.log("✅ Final Proposal List (set to state):", formattedProposals);
      setProposals(formattedProposals);
    } catch (err) {
      console.error("❌ Error fetching proposals:", err);
    }
  };

  const voteOnProposal = async (id: string, support: boolean) => {
    if (!governanceContract || !ownershipContract || !account) return;

    try {
      // 🔄 Get user's owned shares
      const [ids, shares] = await ownershipContract.getOwnedShares(account);
      const proposal = proposals.find((p) => p.id === id);

      if (!proposal) {
        alert("❌ Proposal not found.");
        return;
      }

      const ownedShares = await Promise.all(
        ids.map(async (pid: any, index: number) => {
          let listed = 0;

          try {
            const listing = await ownershipContract.getListing(pid);
            if (
              listing[1]?.toLowerCase() === account.toLowerCase() &&
              listing[4] // active
            ) {
              listed = Number(listing[2]);
            }
          } catch {}

          const total = Number(shares[index]);
          return {
            id: pid.toString(),
            shares: Math.max(0, total - listed),
          };
        })
      );
      console.log("🔍 VOTING DEBUG", {
        proposalId: id,
        proposalPropertyId: proposal.propertyId,
        ownedShares,
      });
      console.log("🔍 VOTING DEBUG", {
        proposalId: id,
        proposalPropertyId: proposal.propertyId,
        ownedShares: ownedShares.map((s) => ({
          id: s.id,
          shares: s.shares,
        })),
      });

      const match = ownedShares.find(
        (s: { id: string; shares: number }) => s.id === proposal.propertyId
      );

      if (!match || match.shares === 0) {
        alert("❌ You must own shares in this property to vote.");
        return;
      }

      // 🔒 Prevent double voting
      const hasVoted = await governanceContract.hasVoted(id, account);
      if (hasVoted) {
        alert("❌ You have already voted on this proposal.");
        return;
      }

      // ⛽ Estimate gas and cast vote
      const gasEstimate = await governanceContract.voteOnProposal.estimateGas(
        id,
        support
      );
      console.log("✅ MATCH DEBUG", {
        proposalId: proposal.id,
        proposalPropertyId: proposal.propertyId,
        userShares: ownedShares,
      });

      const tx = await governanceContract.voteOnProposal(id, support, {
        gasLimit: gasEstimate + gasEstimate / BigInt(10),
        maxFeePerGas: ethers.parseUnits("150", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("100", "gwei"),
      });

      await tx.wait();
      alert("✅ Vote cast successfully!");

      // 🔁 Refresh proposals to update UI
      await fetchGovernanceProposals(governanceContract, ownershipContract!);
    } catch (err: any) {
      console.error("❌ Error voting on proposal:", err);

      const message = err?.reason || err?.data?.message || err?.message || "";
      if (message.toLowerCase().includes("already voted")) {
        alert("❌ You have already voted on this proposal.");
      } else {
        alert("❌ Error casting vote. See console for details.");
      }
    }
  };

  const relevantProposals = proposals.filter(
    (p) =>
      p.proposer === account ||
      userShares.some((s: any) => s.id === p.propertyId && s.shares > 0)
  );

  const refreshProposals = () => {
    if (governanceContract && ownershipContract) {
      fetchGovernanceProposals(governanceContract, ownershipContract);
    }
  };

  return {
    governanceContract,
    ownershipContract,
    account,
    proposals,
    relevantProposals,
    voteOnProposal,
    refreshProposals,
  };
}
*/