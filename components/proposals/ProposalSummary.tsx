/*
// components/ProposalSummary.tsx

import React from "react";
import ProposalCard from "@/components/proposals/ProposalCard";
import { FaVoteYea } from "react-icons/fa";

interface Proposal {
  id: string;
  propertyId: string;
  policyName: string;
  description: string;
  executed: boolean;
}

export default function ProposalSummary({
  proposals,
}: {
  proposals: Proposal[];
}) {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <h3 className="text-lg font-semibold flex items-center gap-2 text-[#272d32]">
  <FaVoteYea className="text-[#272d32]" />
  Active Policy Proposals
</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {proposals.slice(0, 4).map((proposal) => (
  <ProposalCard
    key={proposal.id}
    id={proposal.id}
    policyName={proposal.policyName} // renamed
    description={proposal.description}
    executed={proposal.executed}
    showLink={true}
  />
))}
      </div>

      <div className="text-right mt-4">
        <a href="/proposals" className="text-sm text-blue-500 hover:underline">
          View All Proposals →
        </a>
      </div>
    </div>
  );
}
*/