"use client";

import { useState, useEffect } from "react";
import { connectWallet } from "@/utils/connectWallet";
import { getPetPolicyContract } from "@/utils/loadContract";
import { ethers } from "ethers";
import Layout from "@/components/shared/Layout";
import HeroSection from "@/components/shared/HeroSection";
import CategoryNav from "@/components/shared/CategoryNav";
import CallToAction from "@/components/shared/CallToAction";
//import FeaturedPolicies from "@/components/policies/FeaturedPolicies"; // You can replace or rename this later

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [policyContract, setPolicyContract] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContracts() {
      const wallet = await connectWallet();
      if (!wallet.signer || !wallet.account) return;

      setAccount(wallet.account);

      const contract = await getPetPolicyContract(wallet.signer);
      setPolicyContract(contract);

      setLoading(false);
    }

    loadContracts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold animate-pulse text-gray-400">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <Layout>
     <div
  className="relative min-h-screen flex flex-col bg-cover bg-top bg-no-repeat mt-[72px]"
  style={{ backgroundImage: "url('/backgrounds/Insurancetouse.jpg')" }}
>

  <div className="absolute inset-0 bg-black/40 z-0" />
  <div className="relative z-10 pt-20 container mx-auto p-6">
        
          <HeroSection />

          {/* 🔄 Categories + Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 mb-4 gap-4 px-2">
            <CategoryNav />
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <input
                type="text"
                placeholder="Search insurance policies..."
                className="px-4 py-2 border rounded-md w-full md:w-72"
              />
            </div>
          </div>

                  {/* 🔍 Show Featured Policies if connected */}
          {/* {account && policyContract && (
            <FeaturedPolicies ownershipContract={policyContract} />
          )} */}


          <CallToAction />
        </div>
      </div>
    </Layout>
  );
}

