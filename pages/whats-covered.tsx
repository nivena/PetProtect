// pages/whats-covered.tsx
import Layout from "@/components/shared/Layout";

export default function WhatsCoveredPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto pt-24 p-6 text-[#272d32]">
        <h1 className="text-3xl font-bold mb-4">🩺 What’s Covered</h1>
        <p className="mb-4">
          FractionalHQ Insurance currently offers microinsurance for dogs and cats. Our goal is to make preventative and emergency care more accessible, starting with coverage for everyday accidents.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">✅ Covered Events</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>✔️ Vet visits for minor injuries (limping, cuts, swelling)</li>
          <li>✔️ Basic X-rays and diagnostics</li>
          <li>✔️ Emergency vet visits (accidents)</li>
          <li>✔️ Some prescription medications</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">❌ Not Covered (Yet)</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>✖️ Cancer treatments</li>
          <li>✖️ Ongoing chronic conditions</li>
          <li>✖️ Non-verified or unlicensed providers</li>
          <li>✖️ Breeding, pregnancy, elective surgery</li>
        </ul>

        <p className="mt-6 text-sm text-gray-600">
          Full terms will be defined and voted on by the community via DAO governance in future phases.
        </p>
      </div>
    </Layout>
  );
}
