import Layout from "@/components/shared/Layout";

export default function WhyAffordablePage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto pt-24 p-6 text-[#272d32]">
        <h1 className="text-3xl font-bold mb-4">
          💸 Why It&rsquo;s So Affordable
        </h1>

        <p className="mb-4">
          We&rsquo;ve rebuilt pet insurance from the ground up using blockchain
          to remove overhead, middlemen, and inefficiencies. Here&rsquo;s how we
          cut costs:
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">🚫 No Middlemen</h2>
        <p className="text-sm mb-4">
          No agents. No underwriters. No 6&ndash;floor office buildings. Your
          policy is managed by smart contracts, not call centers.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          🤝 Community Governance
        </h2>
        <p className="text-sm mb-4">
          Claims are reviewed transparently by policyholders and trusted nodes
          in the DAO. No bias. No paperwork. Just results.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          🧱 Blockchain-Powered
        </h2>
        <p className="text-sm mb-4">
          Policies and claims are recorded on&ndash;chain, minimizing fraud and
          reducing admin costs. Funds stay in the pool, not in someone&rsquo;s
          bonus.
        </p>

        <p className="text-sm text-gray-600 mt-6">
          The result? You pay $You pay $5&ndash;10/month instead of $40+ instead
          of $40+. And you help build a smarter system for all pet owners.
        </p>
      </div>
    </Layout>
  );
}
