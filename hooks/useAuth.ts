"use client";

import { useEffect, useState } from "react";
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

export function useAuth() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedWallet = localStorage.getItem("walletAddress");
      if (savedWallet) {
        setAccount(savedWallet);
      }
    } catch (error) {
      console.error("❌ Error accessing localStorage:", error);
    }
  }, []);

  async function login() {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("❌ MetaMask not found. Please install it.");
      return;
    }

    try {
      const client = createWalletClient({
        chain: mainnet,
        transport: custom((window as any).ethereum),
      });

      const addresses = await client.getAddresses();
      if (!addresses.length) {
        alert("❌ No accounts found in MetaMask.");
        return;
      }

      const address = addresses[0];
      const message =
        "Sign this message to verify your identity for PetProtect insurance.";
      const signature = await client.signMessage({ account: address, message });

      console.log("✅ Wallet signed in:", address);
      console.log("📝 Signature:", signature);

      localStorage.setItem("walletAddress", address);
      setAccount(address);

      return { address, signature };
    } catch (error) {
      console.error("❌ Login failed:", error);
      alert("Login failed. Please try again.");
    }
  }

  function logout() {
    try {
      localStorage.removeItem("walletAddress");
      setAccount(null);
    } catch (error) {
      console.error("❌ Error clearing localStorage:", error);
    }
  }

  return { account, login, logout };
}
