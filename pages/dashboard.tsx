"use client";

import { useState, useEffect } from "react";
import { connectWallet } from "@/utils/connectWallet";
import Image from "next/image";
import Layout from "@/components/shared/Layout";
import Sidebar from "@/components/shared/Sidebar";
import PrimaryButton from "@/components/shared/PrimaryButton";
import MiniPolicyGrid from "@/components/policies/MiniPolicyGrid";
import CreatePolicy from "@/components/policies/CreatePolicy";
import { useMyPolicies } from "@/hooks/useMyPolicies";
import { FaChartBar, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export default function Dashboard() {
  const [account, setAccount] = useState<string | null>(null);
  const [showAddPolicy, setShowAddPolicy] = useState(false);
  const { policies, loading: loadingPolicies } = useMyPolicies();

  useEffect(() => {
    async function loadWallet() {
      const wallet = await connectWallet();
      setAccount(wallet.account);
    }

    loadWallet();
  }, []);

  return (
    <Layout footerClassName="ml-64">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-6 pt-20 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-3 text-[#272d32]">
            <FaChartBar className="text-2xl" />
            Dashboard
            <img
              src="/fsre-logo.png"
              alt="Pet Protect Logo"
              className="h-8 w-8 rounded-full object-contain border border-gray-300 shadow-sm"
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
                <a href="/my-coverage" className="text-sm text-blue-600 hover:underline">
                  See all →
                </a>
              </div>
            )}
          </div>

          {/* ➕ Toggle Create Policy Form */}
          <div className="mt-8">
            <PrimaryButton
              onClick={() => setShowAddPolicy((prev) => !prev)}
              fullWidth={false}
              className="text-sm px-4 py-1 text-gold"
            >
              {showAddPolicy ? (
                <div className="flex items-center gap-2">
                  <FaMinusCircle className="text-gold text-lg" />
                  <span className="text-gold">Hide Create Policy</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FaPlusCircle className="text-gold text-lg" />
                  <span className="text-gold">Create a New Policy</span>
                </div>
              )}
            </PrimaryButton>

            {showAddPolicy && (
              <div className="mt-4">
                <CreatePolicy />
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

