/*import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import Link from "next/link";

interface PolicyListing {
  id: number;
  policyId: number;
  seller: string;
  coverageUnits: number;
  price: string;
  image: string;
  policyName?: string;
  active: boolean;
}

interface Props {
  ownershipContract: ethers.Contract;
}

export default function FeaturedPolicies({ ownershipContract }: Props) {
  const [marketListings, setMarketListings] = useState<PolicyListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarketListings() {
      try {
        const [
          policyIds,
          sellers,
          coverageArray,
          prices,
          actives,
          imageFilenames,
        ] = await ownershipContract.getAllListings();

        const formattedListings: PolicyListing[] = await Promise.all(
          policyIds.map(async (id: any, i: number) => {
            let policyName = `Policy #${id}`;
            try {
              const details = await ownershipContract.getProperty(id); // replace with getPolicy(id) when contract is updated
              policyName = details[0] || policyName;
            } catch (error) {
              console.warn(`⚠️ Could not fetch policy name for ID ${id}`);
            }

            return {
              id: i,
              policyId: Number(id),
              seller: sellers[i],
              coverageUnits: Number(coverageArray[i]),
              price: ethers.formatEther(prices[i]),
              image: imageFilenames[i].includes("/uploads/")
                ? imageFilenames[i]
                : `/uploads/${imageFilenames[i]}`,
              policyName,
              active: actives[i],
            };
          })
        );

        setMarketListings(
          formattedListings.filter((listing) => listing.active)
        );
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch policy listings:", error);
        setLoading(false);
      }
    }

    if (ownershipContract) fetchMarketListings();
  }, [ownershipContract]);

  if (loading)
    return <p className="text-center text-gray-500">Loading policies...</p>;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {marketListings.map((listing) => (
        <div
          key={listing.id}
          className="border p-3 rounded shadow bg-white text-sm"
        >
          <Image
            src={listing.image}
            alt={`Policy ${listing.policyId}`}
            width={400}
            height={150}
            className="rounded object-cover w-full h-[120px]"
          />
          <h2 className="text-md font-semibold mt-2 truncate">
            {listing.policyName || "Unnamed Policy"}
          </h2>
          <p className="text-gray-600 text-xs">
            Underwriter:{" "}
            {listing.seller
              ? `${listing.seller.slice(0, 6)}...${listing.seller.slice(-4)}`
              : "Unknown"}
          </p>
          <p className="text-black-600 font-semibold text-xs">
            Coverage Units: {listing.coverageUnits}
          </p>
          <p className="text-black-600 font-semibold text-xs">
            Price: {listing.price} MATIC
          </p>
          <Link
            href="/marketplace"
            className="mt-2 block text-center bg-[#272d32] text-[#e0c370] px-4 py-2 rounded-md font-semibold hover:bg-[#3a3f45] hover:text-white transition"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
}
*/