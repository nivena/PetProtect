"use client";

import { useState, useEffect } from "react";
import { connectWallet } from "@/utils/connectWallet";
import PrimaryButton from "@/components/shared/PrimaryButton";

export default function WalletConnector({
  setAccount,
}: {
  setAccount: (account: string) => void;
}) {
  const [account, localSetAccount] = useState<string | null>(null);

  useEffect(() => {
    console.log("📡 WalletConnector loaded");

    // ✅ Load wallet from localStorage if it exists
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      localSetAccount(savedWallet);
      setAccount(savedWallet);
      console.log("✅ Loaded wallet from localStorage:", savedWallet);
    }

    (window as any).connectWallet = connectWallet;
  }, []);

  async function handleConnectWallet() {
    console.log("🔄 Connect Wallet Clicked!");
    try {
      const { signer, account } = await connectWallet();
      console.log("✅ Wallet connected:", account);

      if (!signer) {
        alert("Failed to connect wallet. Please check MetaMask.");
        return;
      }

      setAccount(account);
      localSetAccount(account);
      localStorage.setItem("walletAddress", account); // ✅ Save to localStorage
    } catch (error) {
      console.error("❌ Wallet connection error:", error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="flex justify-center my-4">
      <PrimaryButton
        onClick={handleConnectWallet}
        variant="blue"
        fullWidth={false}
        className="font-semibold"
      >
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </PrimaryButton>
    </div>
  );
}
