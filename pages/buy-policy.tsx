// pages/buy-policy.tsx
import { useRouter } from "next/router";
import Head from "next/head";
import BuyPolicyForm from "@/components/policies/BuyPolicyForm";

export default function BuyPolicyPage() {
  const router = useRouter();
  const { plan } = router.query;

  if (!plan || typeof plan !== "string") {
    return (
      <div className="p-4">
        ❌ No plan selected. Please go back to the Coverage Exchange.
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Buy Policy</title>
      </Head>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
        <BuyPolicyForm selectedPlan={plan} />
      </div>
    </>
  );
}
