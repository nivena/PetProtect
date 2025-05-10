import { ethers } from "ethers";

// ✅ Global fallback for ethers in browser (Edge case)
if (typeof window !== "undefined" && !window.ethers) {
  window.ethers = ethers;
}

// ✅ Load ABI
// import ownershipABI from "@/artifacts/contracts/Ownership.sol/Ownership.json";
// import governanceABI from "@/artifacts/contracts/Governance.sol/Governance.json";
import petPolicyABI from "@/artifacts/contracts/PetPolicy.sol/PetPolicy.json";

// ✅ Network provider (Polygon Amoy)
const POLYGON_AMOY_RPC = "https://rpc-amoy.polygon.technology";
const provider = new ethers.JsonRpcProvider(POLYGON_AMOY_RPC);

// ✅ Contract addresses
const POLICY_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_POLICY_CONTRACT as string;
// const OWNERSHIP_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_OWNERSHIP_CONTRACT as string;
// const GOVERNANCE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT as string;

// ✅ Check for required contract
if (!POLICY_CONTRACT_ADDRESS) {
  throw new Error("❌ Policy contract address missing from .env!");
}

/** 🐾 Load PetPolicy Contract */
export function getPetPolicyContract(signer: ethers.Signer) {
  if (!signer) throw new Error("❌ No signer provided to getPetPolicyContract");
  return new ethers.Contract(POLICY_CONTRACT_ADDRESS, petPolicyABI.abi, signer);
}

/** 💤 Optional: Legacy functions you can restore later
export function getOwnershipContract(signer: ethers.Signer) {
  if (!signer) throw new Error("❌ No signer provided to getOwnershipContract");
  return new ethers.Contract(OWNERSHIP_CONTRACT_ADDRESS, ownershipABI.abi, signer);
}

export function getGovernanceContract(signer: ethers.Signer) {
  if (!signer) throw new Error("❌ No signer provided to getGovernanceContract");
  return new ethers.Contract(GOVERNANCE_CONTRACT_ADDRESS, governanceABI.abi, signer);
}
*/
