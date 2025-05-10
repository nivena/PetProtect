import React from "react";

export default function HeroSection() {
  return (
    <div className="w-full text-center py-10 px-3">
      <h1 className="text-4xl md:text-5xl font-bold text-[#e0c370] drop-shadow font-headline tracking-wide antialiased mb-4">
        Decentralized insurance without middlemen.
      </h1>
      <p className="text-lg text-[#e0c370] max-w-2xl mx-auto mb-1">
        No paperwork. No excess. No BS.
      </p>
      <p className="text-lg text-[#e0c370] max-w-2xl mx-auto mb-1">
        Pet insurance built for trustless payouts.
      </p>
      <p className="text-sm text-[#e0c370] max-w-2xl mx-auto">
        Built by <strong>FractionalHQ</strong>. Powered by smart contracts.
      </p>
    </div>
  );
}

