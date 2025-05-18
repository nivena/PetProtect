"use client";

import Sidebar from "@/components/shared/Sidebar";
import { useMyPolicies } from "@/hooks/useMyPolicies";
import MyCoverage from "@/components/policies/MyCoverage";
import { FaFolderOpen } from "react-icons/fa";

export default function MyCoveragePage() {
  const { loading } = useMyPolicies();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 pt-28 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen">
        <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-[#272d32]">
          <FaFolderOpen className="text-gold text-2xl" />
          My Coverage
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading your policies...</p>
        ) : (
          <MyCoverage />
        )}
      </div>
    </div>
  );
}
