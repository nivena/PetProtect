"use client";

import Sidebar from "@/components/shared/Sidebar";


import { useMyPolicies } from "@/hooks/useMyPolicies";
import MyCoverage from "@/components/policies/MyCoverage";

export default function PortfolioPage() {
  const { policies, loading } = useMyPolicies();

  

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-6 pt-20 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen">
        <h1 className="text-3xl font-bold text-center">🧾 My Coverage</h1>

        <MyCoverage policies={policies} />
        </div>
    </div>
  );
}


