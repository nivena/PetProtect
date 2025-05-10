/*
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PrimaryButton from "@/components/shared/PrimaryButton";

// ✅ Fix TypeScript error for `window.ethereum`
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Governance({
  governanceContract,
}: {
  governanceContract: ethers.Contract | null;
}) {
  const [proposals, setProposals] = useState<
    {
      id: number;
      description: string;
      votesFor: number;
      votesAgainst: number;
      alreadyVoted: boolean;
    }[]
  >([]);
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadAccount() {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setAccount(await signer.getAddress());
      }
    }

    loadAccount();

    if (governanceContract) {
      console.log("🔄 Fetching governance proposals...");
      fetchProposals(governanceContract, isMounted);
    }

    return () => {
      isMounted = false;
    };
  }, [governanceContract]);

  async function fetchProposals(
    contractInstance: ethers.Contract,
    isMounted: boolean
  ) {
    try {
      console.log(
        `🔍 Fetching proposals from contract at: ${await contractInstance.getAddress()}`
      );

      const proposalCountRaw = await contractInstance.proposalCount();
      const proposalCount = Number(proposalCountRaw);

      console.log(`🔍 Total proposals found: ${proposalCount}`);

      if (proposalCount === 0) {
        console.warn("⚠️ No proposals found in contract.");
        setProposals([]);
        setLoading(false);
        return;
      }

      let proposalsArray = [];

      for (let i = 1; i <= proposalCount; i++) {
        const proposal = await contractInstance.proposals(i);

        let hasVoted = false;
        if (typeof contractInstance.hasVoted === "function" && account) {
          hasVoted = await contractInstance.hasVoted(i, account);
        }

        proposalsArray.push({
          id: i,
          description: proposal.description,
          votesFor: Number(proposal.votesFor),
          votesAgainst: Number(proposal.votesAgainst),
          alreadyVoted: hasVoted,
        });
      }

      if (isMounted) {
        setProposals(proposalsArray);
        setLoading(false);
        console.log("✅ Proposals updated:", proposalsArray);
      }
    } catch (error) {
      console.error("❌ Error fetching proposals:", error);
      alert("Error fetching proposals.");
      setLoading(false);
    }
  }

  async function createProposal() {
    if (!governanceContract) {
      alert("❌ Connect your wallet first!");
      return;
    }

    try {
      console.log("📝 Creating a new proposal...");
      const tx = await governanceContract.createProposal(
        "Frontend Test Proposal"
      );
      await tx.wait();
      alert("✅ Proposal created successfully!");
      fetchProposals(governanceContract, true);
    } catch (error: any) {
      console.error("❌ Error creating proposal:", error);
      alert(error?.message ?? "Error creating proposal.");
    }
  }

  async function handleVote(proposalId: number, support: boolean) {
    if (!governanceContract) {
      alert("❌ Connect your wallet first!");
      return;
    }

    try {
      console.log(
        `🔄 Voting ${support ? "FOR" : "AGAINST"} on proposal ${proposalId}...`
      );
      const tx = await governanceContract.voteOnProposal(proposalId, support);
      await tx.wait();
      alert(`✅ Vote submitted for proposal ${proposalId}!`);
      fetchProposals(governanceContract, true);
    } catch (error: any) {
      console.error("❌ Error voting on proposal:", error);

      if (error?.reason?.includes("You have already voted")) {
        alert("⚠️ You have already voted on this proposal.");
      } else {
        alert(error?.message ?? "Error submitting vote.");
      }
    }
  }

  return (
    <div className="mt-8">
<h2 className="text-2xl font-semibold">🛡 Policy Governance</h2>

      <PrimaryButton
        onClick={createProposal}
        variant="blue"
        fullWidth={false}
        className="mt-2"
      >
➕ Submit Policy Proposal
</PrimaryButton>

      {loading ? (
        <p className="mt-4 text-gray-500 animate-pulse">Loading proposals...</p>
      ) : proposals.length > 0 ? (
        proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="border p-4 mt-4 rounded-lg shadow-md bg-gray-100"
          >
<p className="text-lg font-bold">📄 {proposal.description}</p>
<p>Votes For: {proposal.votesFor}</p>
            <p>Votes Against: {proposal.votesAgainst}</p>

            <PrimaryButton
              onClick={() => handleVote(proposal.id, true)}
              disabled={proposal.alreadyVoted}
              variant="green"
              fullWidth={false}
              className="mt-2"
            >
              Vote FOR
            </PrimaryButton>

            <PrimaryButton
              onClick={() => handleVote(proposal.id, false)}
              disabled={proposal.alreadyVoted}
              variant="red"
              fullWidth={false}
              className="mt-2 ml-2"
            >
              Vote AGAINST
            </PrimaryButton>

            {proposal.alreadyVoted && (
              <p className="text-sm text-gray-500 mt-2">
                ⚠️ You have already voted on this proposal.
              </p>
            )}
          </div>
        ))
      ) : (
<p className="mt-4 text-gray-500">No policy proposals submitted yet.</p>
      )}
    </div>
  );
}
*/