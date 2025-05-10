/*
import ProposalCard from "@/components/proposals/ProposalCard";
import CreateProposalForm from "./CreateProposalForm";
import { ethers } from "ethers";
import { FaVoteYea } from "react-icons/fa";
interface Proposal {
  id: string;
  propertyId: string;
  policyName: string;
  description: string;
  votesFor: string;
  votesAgainst: string;
  executed: boolean;
  proposer: string;
}

interface ProposalsProps {
  governanceContract: ethers.Contract | null;
  ownershipContract: ethers.Contract | null;
  account: string | null;
  proposals: Proposal[];
  voteOnProposal: (id: string, support: boolean) => void;

  refreshProposals: () => void;
}

export default function Proposals({
  governanceContract,
  ownershipContract,
  account,
  proposals,
  voteOnProposal,

  refreshProposals,
}: ProposalsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
  <FaVoteYea className="text-2xl text-black" />
  Policyholder Proposals
</h2>

      <CreateProposalForm
        ownershipContract={ownershipContract}
        governanceContract={governanceContract}
        account={account}
        refreshProposals={refreshProposals}
      />

{proposals.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    {proposals.map((proposal: Proposal) => (
      <ProposalCard
        key={proposal.id}
        id={proposal.id}
        showLink={false}
        policyName={proposal.policyName} // renamed
        description={proposal.description}
        executed={proposal.executed}
        proposer={proposal.proposer}
        votesFor={proposal.votesFor}
        votesAgainst={proposal.votesAgainst}
        onVote={voteOnProposal}
      />
    ))}
  </div>
) : (
  <p className="text-center text-gray-500 mt-4">
    No proposals available for your policies.
  </p>
)}
    </div>
  );
}
*/