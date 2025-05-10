/*
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Sidebar from "@/components/shared/Sidebar";
import { useUserTransactions } from "@/hooks/useUserTransactions";
import { FaExchangeAlt } from "react-icons/fa";

export default function Transactions() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    async function connect() {
      if (typeof window !== "undefined" && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      }
    }

    connect();
  }, []);

  const { transactions, loading } = useUserTransactions(account);

  return (
    <div className="flex">
    
      <Sidebar />

     
      <div className="flex-1 ml-64 mt-24 px-6">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#e0c370]">
          <FaExchangeAlt className="text-xl" />
          Policy Transaction History
        </h1>
        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Type</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{tx.type}</td>
                  <td className="border p-2">
                    {tx.amount ? `${tx.amount} shares` : "—"}
                  </td>
                  <td className="border p-2 text-green-500">{tx.status}</td>
                  <td className="border p-2">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
*/