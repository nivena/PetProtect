// components/policies/MyCoverage.tsx
import React from "react";
import { format } from "date-fns";

type Policy = {
  petName: string;
  insuredAmount: string;
  startDate: number;
  endDate: number;
  active: boolean;
  claimCount: number;
};

export default function MyCoverage({ policies }: { policies: Policy[] }) {
  if (!policies || policies.length === 0) {
    return <p className="text-gray-500">You don't have any active policies.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {policies.map((policy, idx) => (
        <div
          key={idx}
          className="bg-white border rounded-lg shadow-md p-4 space-y-2"
        >
          <h2 className="text-lg font-bold">🐶 {policy.petName}</h2>
          <p className="text-sm text-gray-600">
            Insured Amount: {policy.insuredAmount} MATIC
          </p>
          <p className="text-sm">
            Duration: {format(new Date(policy.startDate * 1000), "PPP")} →{" "}
            {format(new Date(policy.endDate * 1000), "PPP")}
          </p>
          <p className={`text-sm font-medium ${policy.active ? "text-green-600" : "text-red-600"}`}>
            Status: {policy.active ? "Active" : "Expired"}
          </p>
          <p className="text-sm text-gray-600">Claims Submitted: {policy.claimCount}</p>
        </div>
      ))}
    </div>
  );
}
