import React from "react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-white/10 text-white p-10 rounded-2xl mt-16 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Get covered. Share the risk. Own the reward.
      </h2>
      <p className="mb-4 text-base text-white/90">
        Community-backed insurance powered by Web3 transparency.
      </p>
      <Link
        href="/coverage-exchange"
        className="inline-block bg-[#e0c370] text-[#272d32] font-semibold px-6 py-2.5 rounded-md hover:bg-[#8ac6ff] hover:text-white transition-all shadow-md"
      >
        Browse Coverage
      </Link>
    </div>
  );
}

