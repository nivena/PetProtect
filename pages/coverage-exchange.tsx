"use client";

import Layout from "@/components/shared/Layout";
import PolicyListings from "@/components/policies/PolicyListings";

export default function Marketplace() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] min-h-screen pt-24 px-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-3">
            Insurance Policy Marketplace
            <img
              src="/fsre-logo.png"
              alt="Pet Protect Logo"
              className="h-8 w-8 rounded-full object-contain border border-gray-300 shadow-sm"
            />
          </h1>
          <p className="text-center mt-2 text-gray-600">
            Buy and sell coverage units across decentralized insurance pools.
          </p>
          <div className="flex justify-center mt-4">
            <img
              src="/backgrounds/Polygonsleek.png"
              alt="Powered by Polygon"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* ✅ Simplified Coverage Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Available Coverage</h2>
            <PolicyListings />
          </div>
        </div>
      </div>
    </Layout>
  );
}

