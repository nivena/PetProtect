"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { connectWallet } from "@/utils/connectWallet";
import Layout from "@/components/shared/Layout";
import Sidebar from "@/components/shared/Sidebar";
import MiniPolicyGrid from "@/components/policies/MiniPolicyGrid";
import { useMyPolicies } from "@/hooks/useMyPolicies";
import { FaChartBar } from "react-icons/fa";

export default function Dashboard() {
  const { policies } = useMyPolicies();

  useEffect(() => {
    async function loadWallet() {
      await connectWallet(); // no need to track account here
    }

    loadWallet();
  }, []);

  return (
    <Layout footerClassName="ml-64">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-6 pt-28 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-[#272d32]">
            <FaChartBar className="text-2xl" />
            Dashboard
            <Image
              src="/Logo.png"
              alt="Pet Protect Logo"
              width={32}
              height={32}
              className="rounded-full object-contain border border-gray-300 shadow-sm"
            />
          </h1>
          <p className="text-center mt-2 text-gray-600">
            Manage your policies, coverage, and claims.
          </p>

          {/* 🐾 Insurance Policies Preview */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#272d32] mb-2">
              Your Insurance Coverage
            </h2>
            <MiniPolicyGrid
              policies={policies.map((p, i) => ({ ...p, id: i })).slice(0, 4)}
            />
            {policies.length > 4 && (
              <div className="text-right mt-2">
                <Link
                  href="/my-coverage"
                  className="text-sm text-blue-600 hover:underline"
                >
                  See all →
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
