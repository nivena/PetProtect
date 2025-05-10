console.log("📡 connectWallet.js has loaded!");

import { ethers } from "ethers";

if (typeof window !== "undefined" && !window.ethers) {
  window.ethers = ethers; // ✅ Ensures ethers is globally available
}

export async function connectWallet() {
  console.log("🔄 connectWallet function is being called...");
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    console.log("❌ MetaMask not detected.");
    return { provider: null, signer: null, account: null };
  }

  try {
    console.log("🔄 Requesting wallet connection...");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    console.log("✅ MetaMask connected!");

    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log("🛠️ Provider:", provider);

    const signer = await provider.getSigner();
    console.log("🛠️ Signer:", signer);

    const account = await signer.getAddress();
    console.log("✅ Wallet connected:", account);

    return { provider, signer, account };
  } catch (error) {
    console.error("❌ Wallet connection failed:", error);
    return { provider: null, signer: null, account: null };
  }
}
