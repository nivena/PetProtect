"use client";

import Sidebar from "@/components/shared/Sidebar";
import { useState, useEffect } from "react";

import { connectWallet } from "@/utils/connectWallet";
import { useMaticPrice } from "@/hooks/useMaticPrice";

export default function PoliciesPage() {
  

  const [loading, setLoading] = useState(true);
  const maticPrice = useMaticPrice();

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-center">🏥 Policies</h1>

        {loading ? (
          <p className="text-center text-gray-500">🔄 Loading Policies...</p>
        ) : (
          <p className="text-center text-gray-400">
            No policies to display yet.
          </p>

        )}
      </div>
    </div>
  );
}

