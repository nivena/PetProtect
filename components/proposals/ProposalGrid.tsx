/*
// components/proposals/ProposalGrid.tsx
import ProposalCard from "@/components/proposals/ProposalCard";

interface Proposal {
  id: string;
  policyName: string; // renamed from propertyName
  description: string;
  executed: boolean;
  proposer?: string;
  votesFor?: string;
  votesAgainst?: string;
  onVote?: (id: string, support: boolean) => void;
}

interface ProposalGridProps {
  proposals: Proposal[];
}

export default function ProposalGrid({ proposals }: { proposals: Proposal[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {proposals.map((proposal) => (
        <ProposalCard key={proposal.id} {...proposal} />
      ))}
    </div>
  );
}
*/