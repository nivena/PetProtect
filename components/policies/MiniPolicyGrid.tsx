import React from "react";
import MiniPolicyCard, { MiniPolicy } from "./MiniPolicyCard"; // Use shared type

type Props = {
  policies: MiniPolicy[];
  maxToShow?: number;
};

export default function MiniPolicyGrid({ policies, maxToShow = 4 }: Props) {
  if (!policies || policies.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-[#272d32] mb-4">
        🛡️ Your Active Policies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.slice(0, maxToShow).map((policy, index) => (
            <MiniPolicyCard key={index} policy={policy} />
        ))}
      </div>
    </div>
  );
}
