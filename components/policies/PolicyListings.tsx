import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useCoverageExchange } from "@/hooks/useCoverageExchange";
import { purchasePolicy } from "@/utils/purchasePolicy";

export default function PolicyListings() {
  const { plans, policyContract, account } = useCoverageExchange();

  if (!plans || plans.length === 0)
    return <p className="text-center text-gray-500">No policies available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => {
const rawPrice = plan.price;

        return (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 duration-150"
            >
            <img
              src={`/images/${plan.petType.toLowerCase()}.jpg`}
              alt={`${plan.petType} Policy`}
              width={400}
              height={220}
              className="w-full h-[200px] object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">
                {plan.title}
              </h3>
              <p className="text-sm text-gray-600">Pet: {plan.petType}</p>
              <p className="text-sm text-gray-600">
                Coverage: {plan.insuredAmount} MATIC
              </p>
              <p className="text-sm text-gray-600">
                Duration: {plan.duration}
              </p>
              <p className="text-black font-semibold mt-2">
                Price: {plan.price} MATIC
              </p>

              <PrimaryButton
  onClick={() => {
    if (!policyContract) {
      alert("❌ Policy contract not loaded.");
      return;
    }

    const petName = prompt("🐶 Enter your pet’s name to continue:");
    if (!petName) return;

    purchasePolicy(policyContract, petName);
  }}
>
  Buy Coverage
</PrimaryButton>

            </div>
          </div>
        );
      })}
    </div>
  );
}