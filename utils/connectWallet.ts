console.log("📡 connectWallet.ts has loaded!");

import { ethers } from "ethers";
import toast from "react-hot-toast";

// ✅ Fallback demo lock flag from .env
const isDemoLocked = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

if (typeof window !== "undefined" && !window.ethers) {
  window.ethers = ethers;
}

export async function connectWallet() {
  console.log("🔄 connectWallet function is being called...");

  const ethereum = (window as any).ethereum;

  if (!ethereum || typeof ethereum.request !== "function") {
    alert("Please install MetaMask!");
    console.log("❌ MetaMask not detected.");
    return { provider: null, signer: null, account: null };
  }

  if (isDemoLocked) {
    toast("🔒 Wallet connection disabled in demo. Contact us to unlock.", {
      icon: "🔐",
    });
    console.log("🔒 Demo mode enabled — blocking wallet connection.");
    return { provider: null, signer: null, account: null };
  }

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if (!accounts || accounts.length === 0) {
      console.error("❌ No accounts returned by MetaMask.");
      return { provider: null, signer: null, account: null };
    }

    console.log("✅ Accounts received:", accounts);

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    console.log("🛠️ Provider:", provider);
    console.log("🛠️ Signer:", signer);
    console.log("✅ Wallet connected:", account);

    return { provider, signer, account };
  } catch (error) {
    console.error("❌ Wallet connection failed:", error);
    return { provider: null, signer: null, account: null };
  }
}
