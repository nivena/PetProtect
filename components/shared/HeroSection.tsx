import React from "react";

export default function HeroSection() {
  return (
    <div className="w-full text-center py-10 px-3">
      <h1 className="text-4xl md:text-5xl font-bold text-[#e0c370] drop-shadow font-headline tracking-wide antialiased mb-4">
        Pet insurance, powered by blockchain.
      </h1>
      <p className="text-lg text-[#e0c370] max-w-2xl mx-auto mb-1">
        No paperwork. No excess. Just peace of mind.
      </p>
      <p className="text-lg text-[#e0c370] max-w-2xl mx-auto mb-1">
        Smart-contract powered payouts you can trust.
      </p>
      <p className="text-sm text-[#e0c370] max-w-2xl mx-auto">
        Built by <strong>Pet Protect</strong>. Powered by smart contracts.
      </p>
    </div>
  );
}
