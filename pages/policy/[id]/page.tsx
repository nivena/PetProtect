"use client";

import { useRouter } from "next/navigation";
import policies, { Policy } from "@/data/policies";

export default function PolicyDetails({ params }: { params: { id: string } }) {
  const policy = policies.find((p: Policy) => p.id.toString() === params.id);

  if (!policy) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold">Policy Not Found</h1>
        <p>The insurance policy you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold">{policy.name}</h1>
      <img
        src={policy.image}
        alt={policy.name}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <p className="text-lg">Coverage Area: {policy.location}</p>
      <p className="text-lg font-semibold">
        Coverage Amount: ${policy.price.toLocaleString()}
      </p>
      <p className="text-md">Policy Type: {policy.ownershipType}</p>
    </div>
  );
}

