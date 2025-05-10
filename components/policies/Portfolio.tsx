/*
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { usePerPropertyValuations } from "@/hooks/usePerPropertyValuations";
import { FaFolderOpen } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

interface PortfolioProps {
  userShares: {
    id: string;
    propertyName?: string;
    shares: number;
    listed?: number;
    image: string;
  }[];
  portfolioValue: { matic: number; usd: string };
  ownershipContract: ethers.Contract | null;
  maticPrice: number;
  maxToShow?: number;
  showSeeAll?: boolean;
}

export default function Portfolio({
  userShares,
  portfolioValue,
  ownershipContract,
  maticPrice,
  maxToShow,
  showSeeAll,
}: PortfolioProps) {
  console.log("📊 Portfolio receives shares:", userShares);

  const perPropertyValuations = usePerPropertyValuations(
    ownershipContract,
    userShares,
    maticPrice
  );

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md text-center">
      <h2
        className="text-xl font-semibold flex items-center gap-2 text-[#272d32]
"
      >
        <FaFolderOpen className="text-lg" />
        Policy Portfolio
      </h2>

   
      {portfolioValue.matic === 0 && portfolioValue.usd === "0.00" ? (
        <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
      ) : (
        <div>
          <p className="text-2xl font-bold text-black-600">
            Total: {portfolioValue.matic.toFixed(2)} MATIC
          </p>
          <p className="text-lg text-black-500">
            ≈{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(portfolioValue.usd))}
          </p>

          <p className="text-lg text-black-500 mt-2">
            Available:{" "}
            {userShares
              .reduce((sum, s) => {
                const valuation = perPropertyValuations[s.id]?.valueMatic || 0;
                const availableShares = s.shares - (s.listed || 0);
                const shareRatio =
                  s.shares > 0 ? availableShares / s.shares : 1;
                return sum + valuation * shareRatio;
              }, 0)
              .toFixed(2)}{" "}
            MATIC
          </p>
        </div>
      )}

      {userShares.length > 0 ? (
        <div className="mt-4 text-left">
       
          <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
  <FaHome className="text-[#272d32]" />
  Your Active Policies
</h3>

            {showSeeAll && (
              <a
                href="/portfolio"
                className="text-sm text-blue-500 hover:underline"
              >
                See All →
              </a>
            )}
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userShares.slice(0, maxToShow || 10).map((share) => {
              const valuation = perPropertyValuations[share.id] || {
                valueMatic: 0,
                valueUSD: 0,
              };
              console.log("📦 Rendering card:", {
                id: share.id,
                shares: share.shares,
                listed: share.listed,
              });
              return (
                <Link
                  href={`/portfolio#property-${share.id}`}
                  key={share.id}
                  className="bg-white shadow rounded-md p-4 flex space-x-4 hover:bg-gray-100 transition"
                >
                  <img
                    src={
                      share.image && share.image.includes("/uploads/")
                        ? share.image
                        : "/images/placeholder.jpg"
                    }
                    alt={share.propertyName || `Policy #${share.id}`}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div>
                    <p className="font-bold">
                    {share.propertyName ?? `Policy #${share.id}`}
                    </p>
                    <p>
                      {share.shares} Shares (
                      {share.listed !== undefined ? share.listed : 0} Listed)
                    </p>

                    <p>
                      Value: {valuation.valueMatic} MATIC (
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(valuation.valueUSD)}
                      )
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
<p className="text-gray-500">You don’t own any policy shares yet.</p>
      )}
    </div>
  );
}
*/