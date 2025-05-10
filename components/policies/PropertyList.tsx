/*
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function PropertyList({
  ownershipContract,
}: {
  ownershipContract: ethers.Contract | null;
}) {
  const [ratings, setRatings] = useState<{
    [key: number]: { average: number; votes: number };
  }>({});
  const [userRating, setUserRating] = useState<{ [key: number]: number }>({});
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Travel Insurance Plan A",
      location: "Global",
      price: "2.5 ETH",
      available: 100,
    },
    {
      id: 2,
      name: "Health Coverage Basic",
      location: "USA",
      price: "1.2 ETH",
      available: 200,
    },
    {
      id: 3,
      name: "Dental Plan Premium",
      location: "Malaysia",
      price: "0.8 ETH",
      available: 150,
    }
    
  ]);

  useEffect(() => {
    let isMounted = true;
    if (ownershipContract) {
      console.log("🏡 Fetching property ratings...");
      fetchPropertyRatings(ownershipContract, isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [ownershipContract]);

  async function fetchPropertyRatings(
    contractInstance: ethers.Contract,
    isMounted: boolean
  ) {
    try {
      let newRatings: { [key: number]: { average: number; votes: number } } =
        {};
      for (let property of properties) {
        console.log(`🔍 Fetching rating for property ${property.id}...`);
        const result = await contractInstance.getPropertyRating(property.id);
        if (result) {
          newRatings[property.id] = {
            average: Number(result[0] || 0),
            votes: Number(result[1] || 0),
          };
        }
      }
      if (isMounted) {
        setRatings((prev) =>
          JSON.stringify(prev) !== JSON.stringify(newRatings)
            ? newRatings
            : prev
        );
        console.log("✅ Ratings updated:", newRatings);
      }
    } catch (error) {
      console.error("❌ Error fetching ratings:", error);
      alert("Error fetching property ratings.");
    }
  }

  async function handleRateProperty(propertyId: number, rating: number) {
    if (!ownershipContract) {
      alert("❌ Connect your wallet first!");
      return;
    }
    try {
      console.log(
        `🔄 Submitting rating ${rating} for property ${propertyId}...`
      );
      const tx = await ownershipContract.rateProperty(propertyId, rating);
      await tx.wait();
      alert(`✅ Successfully rated property ${propertyId}!`);
      fetchPropertyRatings(ownershipContract, true);
    } catch (error: any) {
      console.error("❌ Error submitting rating:", error);
      alert(error?.message ?? "Error submitting rating.");
    }
  }

  return (
    <div className="p-6">
<h1 className="text-2xl font-bold mb-4">📋 Available Policies</h1>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="border rounded-lg shadow-lg p-4 bg-white"
          >
            <h2 className="text-xl font-semibold">{property.name}</h2>
            <p className="text-gray-600">📍 {property.location}</p>
            <p className="text-gray-900 font-bold">💰 {property.price}</p>
            <p className="text-sm text-gray-500">
  Coverage Units Available: {property.available}
</p>


            <p className="mt-2">
  ⭐ User Rating: {ratings[property.id]?.average?.toFixed(1) || "N/A"}
  ({ratings[property.id]?.votes || 0} reviews)
</p>

            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-2xl ${
                    star <= (userRating[property.id] || 0)
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleRateProperty(property.id, star)}
                >
                  ★
                </button>
              ))}
            </div>

            
            <PrimaryButton
              onClick={() => alert(`Buying shares in ${property.name}`)}
              variant="blue"
            >
Subscribe            </PrimaryButton>
          </div>
        ))}
      </div>
    </div>
  );
}
*/