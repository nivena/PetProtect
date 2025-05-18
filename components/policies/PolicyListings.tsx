import React from "react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useCoverageExchange } from "@/hooks/useCoverageExchange";
import Link from "next/link";
import Image from "next/image";

export default function PolicyListings() {
  const { plans } = useCoverageExchange();

  if (!plans || plans.length === 0)
    return (
      <p className="text-center text-gray-500">
        There are currently no pet insurance plans available.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const imageSrc = `/images/${plan.petType.toLowerCase()}.jpg`;

        return (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 duration-150"
          >
            <Image
              src={imageSrc}
              alt={`Photo representing ${plan.petType} insurance plan`}
              title={`Coverage for ${plan.petType}`}
              width={400}
              height={230}
              className="w-full object-contain mx-auto"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{plan.title}</h3>
              <p className="text-sm text-gray-600">Pet: {plan.petType}</p>
              <p className="text-sm text-gray-600">
                Coverage: {Number(plan.insuredAmount).toFixed(2)} MATIC
              </p>
              <p className="text-sm text-gray-600">Duration: {plan.duration}</p>
              <p className="text-black font-semibold mt-2">
                Price: {Number(plan.price).toFixed(2)} MATIC
              </p>

              <Link href={`/buy-policy?plan=${plan.id}`}>
                <PrimaryButton>Buy Coverage</PrimaryButton>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
