import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return { provider: null, signer: null, account: null };
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    return { provider, signer, account };
  } catch (error) {
    console.error("❌ Wallet connection failed:", error);
    return { provider: null, signer: null, account: null };
  }
}
