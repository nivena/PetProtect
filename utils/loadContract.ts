import { ethers } from "ethers";



import petPolicyABI from "@/artifacts/contracts/PetPolicy.sol/PetPolicy.json";

// ✅ Network provider (Polygon Amoy)
const POLYGON_AMOY_RPC = "https://rpc-amoy.polygon.technology";
const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC);

// ✅ Contract addresses
const POLICY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_POLICY_CONTRACT as string;

// ✅ Check for required contract
if (!POLICY_CONTRACT_ADDRESS) {
  throw new Error("❌ Policy contract address missing from .env!");
}

/** 🐾 Load PetPolicy Contract */
export function getPetPolicyContract(signer: ethers.Signer) {
  if (!signer) throw new Error("❌ No signer provided to getPetPolicyContract");
  return new ethers.Contract(POLICY_CONTRACT_ADDRESS, petPolicyABI.abi, signer);
}


