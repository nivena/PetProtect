// pages/404.tsx
import Link from "next/link";
import Layout from "@/components/shared/Layout";

export default function Custom404() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-[#272d32] px-6 pt-24">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </Layout>
  );
}
