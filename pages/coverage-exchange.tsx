"use client";

import Image from "next/image";
import Layout from "@/components/shared/Layout";
import PolicyListings from "@/components/policies/PolicyListings";

export default function CoverageExchange() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen pt-32 px-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-3">
            Choose Your Coverage Plan
            <Image
              src="/fractionalhqlogo.png"
              alt="FractionalHQ Logo"
              width={32}
              height={32}
              className="rounded-full object-contain border border-gray-300 shadow-sm"
            />
          </h1>

          <p className="text-center mt-2 text-gray-600">
            Select a plan and protect your pet with blockchain-backed insurance.
          </p>

          <div className="flex justify-center mt-4">
            <Image
              src="/backgrounds/Polygonsleek.png"
              alt="Powered by Polygon"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* ✅ Simplified Coverage Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Available Policies</h2>
            <PolicyListings />
          </div>
        </div>
      </div>
    </Layout>
  );
}
