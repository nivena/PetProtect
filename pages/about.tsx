import React from "react";
import Image from "next/image";
import Layout from "@/components/shared/Layout";

const BRAND_NAME = "Pet Protect Insurance";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-24 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            About {BRAND_NAME}
          </h1>

          <blockquote className="italic text-center text-blue-600 text-xl mb-6">
            &quot;Decentralized protection. Transparent claims.
            Community-powered insurance.&quot;
          </blockquote>

          <p className="text-lg mb-4 leading-relaxed text-center">
            <strong>{BRAND_NAME}</strong> is reshaping how we protect the things
            we love&mdash; starting with our pets. We believe insurance should
            be transparent, accessible, and fair. Using blockchain technology,
            we enable people to co-fund risk pools and vote on claims without
            relying on legacy insurers.
          </p>

          <p className="text-md text-gray-700 leading-relaxed mb-6">
            Our platform is powered by smart contracts on{" "}
            <strong>Polygon</strong>, enabling dog and cat owners to join
            decentralized insurance pools. Members stake into shared coverage
            plans, then propose and vote on claims&mdash;all recorded
            transparently on-chain.
          </p>

          <p className="text-lg mb-4 leading-relaxed text-center">
            Community-based coverage for the Web3 era&mdash;fair, fast, and
            collectively owned.
          </p>

          <div className="flex justify-center my-8">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#e0c370] shadow-lg animate-fadeIn">
              <Image
                src="/fractionalhqlogo.png"
                alt="Pet Protect Logo"
                width={112}
                height={112}
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              A world where anyone can create or join coverage
              pools&mdash;protecting pets, livelihoods, or events&mdash;without
              bureaucracy or middlemen. We&apos;re starting with animals, but
              the possibilities go far beyond.
            </p>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">Founding Ethos</h2>
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              Pet Protect was born out of frustration with outdated systems.
              Built between Kuala Lumpur and Singapore, it reflects a new
              mindset: mutual trust, blockchain transparency, and user-governed
              decisions. Our team believes insurance should be a public
              utility&mdash;not a profit-first industry.
            </p>
          </div>

          <div className="mt-10 text-center text-sm text-blue-600">
            Contact us:{" "}
            <a href="mailto:support@petprotect.com" className="underline">
              support@petprotect.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
