import React from "react";
import Link from "next/link";
import { format } from "date-fns";

export interface MiniPolicy {
  id: number;
  petName: string;
  startDate: number;
  endDate: number;
  active: boolean;
  claimCount: number;
}

export default function MiniPolicyCard({ policy }: { policy: MiniPolicy }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white">
      <h3 className="text-md font-semibold truncate">🐾 {policy.petName}</h3>
      <p className="text-sm text-gray-600">
        Ends: {format(new Date(policy.endDate * 1000), "MMM do, yyyy")}
      </p>
      <p
        className={`text-sm font-medium ${
          policy.active ? "text-green-600" : "text-red-500"
        }`}
      >
        {policy.active ? "Active" : "Expired"}
      </p>
      <Link
        href={`/my-coverage#policy-${policy.id}`}
        className="block mt-2 text-blue-500 text-sm hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}
