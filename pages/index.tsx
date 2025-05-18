"use client";

import Layout from "@/components/shared/Layout";
import HeroSection from "@/components/shared/HeroSection";
import CategoryNav from "@/components/shared/CategoryNav";
import CallToAction from "@/components/shared/CallToAction";

export default function Home() {
  return (
    <Layout>
      <div
        className="relative min-h-screen flex flex-col bg-cover bg-top bg-no-repeat mt-[72px]"
        style={{
          backgroundImage: "url('/backgrounds/BackgroundInsurance.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 pt-10 container mx-auto p-6">
          <HeroSection />

          {/* 🔄 Categories + Search */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 mb-4 gap-4 px-2">
            <CategoryNav />
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <input
                type="text"
                placeholder="Search insurance policies..."
                className="px-4 py-2 border rounded-md w-full md:w-72"
              />
            </div>
          </div>

          <CallToAction />
        </div>
      </div>
    </Layout>
  );
}
