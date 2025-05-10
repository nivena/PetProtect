/* 
"use client";

import Sidebar from "@/components/shared/Sidebar";
import Proposals from "@/components/proposals/Proposals";
import { useState, useEffect } from "react";
import {
  getGovernanceContract,
  getOwnershipContract,
} from "@/utils/loadContract";
import { connectWallet } from "@/utils/connectWallet";
import { ethers } from "ethers";
import { useGovernanceProposals } from "@/hooks/useGovernanceProposals";
import { FaVoteYea } from "react-icons/fa";

export default function ProposalsPage() {
  const {
    governanceContract,
    ownershipContract,
    account,
    proposals,
    relevantProposals,
    voteOnProposal,

    refreshProposals,
  } = useGovernanceProposals();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-[#e0c370]">
          <FaVoteYea className="text-2xl" />
          Insurance Governance Proposals
        </h1>
        <Proposals
          governanceContract={governanceContract}
          ownershipContract={ownershipContract}
          account={account}
          proposals={relevantProposals}
          voteOnProposal={voteOnProposal}
          refreshProposals={refreshProposals}
        />
      </div>
    </div>
  );
}
*/