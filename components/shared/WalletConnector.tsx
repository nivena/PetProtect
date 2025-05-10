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
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      localSetAccount(savedWallet);
      setAccount(savedWallet);
    }

    // Optional: attach for debugging
    if (process.env.NODE_ENV !== "production") {
      (window as any).connectWallet = connectWallet;
    }
  }, []);

  async function handleConnectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask not detected. Please install a wallet.");
      return;
    }

    try {
      const { signer, account } = await connectWallet();
      if (!signer) {
        alert("Failed to connect wallet. Please check MetaMask.");
        return;
      }

      setAccount(account);
      localSetAccount(account);
      localStorage.setItem("walletAddress", account);
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
