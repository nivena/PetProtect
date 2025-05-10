/*
// components/proposals/ProposalCard.tsx
import React from "react";
import Link from "next/link";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface ProposalCardProps {
  id: string;
  policyName: string;
  description: string;
  executed: boolean;
  proposer?: string;
  votesFor?: string;
  votesAgainst?: string;
  onVote?: (id: string, support: boolean) => void;
  showLink?: boolean; // ✅ NEW
}

function ProposalCardContent({
  id,
  policyName,
  description,
  executed,
  proposer,
  votesFor,
  votesAgainst,
  onVote,
}: ProposalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:bg-gray-50 transition">
<p className="font-bold text-lg">{policyName || "📄 Policy Proposal"}</p>
<p className="mt-1 text-gray-700">{description}</p>

      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <span>Status:</span>
          <span
            className={`font-semibold ${
              executed ? "text-green-600" : "text-black"
            }`}
          >
            {executed ? "✅ Executed" : "⏳ Pending"}
          </span>
        </div>

        {proposer && (
          <div className="flex items-center gap-2">
            <span>Proposed by:</span>
            <span className="font-mono font-semibold">
              {proposer.slice(0, 6)}...{proposer.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {votesFor && votesAgainst && (
        <div className="flex items-center gap-4 text-black mt-3">
          <div className="flex items-center gap-1">
            <FaThumbsUp />
            <span className="font-semibold">{votesFor}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaThumbsDown />
            <span className="font-semibold">{votesAgainst}</span>
          </div>
        </div>
      )}

      {onVote && !executed && (
        <div className="mt-4 flex justify-between">
          <PrimaryButton
            onClick={() => onVote(id, true)}
            variant="blue"
            textColor="white"
            fullWidth={false}
            className="flex items-center gap-1"
          >
            <FaThumbsUp className="inline" />
Approve Policy          </PrimaryButton>

          <PrimaryButton
            onClick={() => onVote(id, false)}
            variant="goldDark"
            fullWidth={false}
            className="flex items-center gap-1"
          >
            <FaThumbsDown className="inline" />
Reject Policy          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

// ✅ This handles link wrapping only when needed
export default function ProposalCard(props: ProposalCardProps) {
  const { showLink = true } = props;

  if (showLink) {
    return (
      <Link href="/proposals">
        <ProposalCardContent {...props} />
      </Link>
    );
  }

  return <ProposalCardContent {...props} />;
}
*/