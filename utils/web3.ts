import { ethers } from "ethers";
import OwnershipABI from "@/artifacts/contracts/Ownership.sol/Ownership.json";  // ✅ Ensure correct path
import { Signer } from "ethers";

const CONTRACT_ADDRESS = "0x0794b85d40f88105769C643795FEAe4e458ba516";  // ✅ Update with latest deployed address

export async function connectWallet() {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return { signer: null, account: null };
    }

    try {
        console.log("🔄 Requesting wallet connection...");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        console.log("✅ Wallet connected:", accounts[0]);

        return { signer, account: accounts[0] };  
    } catch (error) {
        console.error("❌ Wallet connection failed:", error);
        return { signer: null, account: null };
    }
}

// ✅ Debugging `getOwnershipContract`
export async function getOwnershipContract(signer: Signer) {
    if (!signer) {
        console.error("❌ Signer is undefined! Cannot attach contract.");
        return null;
    }

    try {
        console.log("🔄 Fetching contract instance...");
        console.log("🔹 Using contract address:", CONTRACT_ADDRESS);
        console.log("🔹 Using contract ABI:", OwnershipABI.abi);

        const contract = new ethers.Contract(CONTRACT_ADDRESS, OwnershipABI.abi, signer);

        console.log("✅ Contract instance created:", contract);
        console.log("✅ Available functions:", Object.keys(contract));

        return contract;
    } catch (error) {
        console.error("❌ Error creating contract instance:", error);
        return null;
    }
}

// ✅ Make Functions Available in Browser Console
declare global {
    interface Window {
      getOwnershipContract?: typeof getOwnershipContract;
    }
  }
  
  if (typeof window !== "undefined") {
      window.getOwnershipContract = getOwnershipContract;
  }
  

