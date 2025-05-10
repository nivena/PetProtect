/*

import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface ListingProps {
  userShares: {
    id: string;
    propertyName?: string;
    shares: number;
    image: string;
  }[];
  userSharesToSell: Record<string, number>;
  setUserSharesToSell: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
  sellShares: (propertyId: number, shares: number, price: number) => void;

  maticPrice: number;
}

export default function Listings({
  userShares,
  userSharesToSell,
  setUserSharesToSell,
  sellShares,
}: ListingProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">📂 Your Active Policies</h2>
      {userShares.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {userShares.map((share) => (
            <div key={share.id} className="border p-4 rounded-md shadow-lg">
              <Image
                src={share.image}
                alt={`Property ${share.id}`}
                width={400}
                height={250}
                className="rounded-md object-contain w-full h-[250px]"
              />
              <h3 className="text-xl font-semibold mt-2">
                {share.propertyName
                  ? share.propertyName
                  : `Policy ID: ${share.id}`}
              </h3>
              <p className="text-black-500 font-bold">
                Policy Shares Owned: {share.shares}
              </p>
              <input
                type="number"
                min="1"
                max={share.shares}
                className="mt-2 w-full border rounded-lg p-2 text-lg"
                placeholder="Coverage shares to sell"
                value={userSharesToSell[share.id] || ""}
                onChange={(e) =>
                  setUserSharesToSell((prev) => ({
                    ...prev,
                    [share.id]:
                      Number(e.target.value) > share.shares
                        ? share.shares
                        : Number(e.target.value),
                  }))
                }
              />
              <input
                type="number"
                min="0"
                step="0.01"
                className="mt-2 w-full border rounded-lg p-2 text-lg"
                placeholder="Price per share (MATIC)"
                value={userSharesToSell[`${share.id}-price`] || ""}
                onChange={(e) =>
                  setUserSharesToSell((prev) => ({
                    ...prev,
                    [`${share.id}-price`]: Number(e.target.value),
                  }))
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                ≈ $
                {((userSharesToSell[`${share.id}-price`] || 0) * 0.2466).toFixed(
                  2
                )}{" "}
                USD per share
              </p>
              <PrimaryButton
                onClick={() =>
                  sellShares(
                    parseInt(share.id),
                    userSharesToSell[share.id] || 1,
                    userSharesToSell[`${share.id}-price`] !== undefined
                      ? userSharesToSell[`${share.id}-price`]
                      : parseFloat("0.1")
                  )
                }
                variant="gold"
                className="mt-4 text-lg"
              >
                List Shares for Sale
              </PrimaryButton>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          You don’t own any shares yet.
        </p>
      )}
    </div>
  );
}

*/
