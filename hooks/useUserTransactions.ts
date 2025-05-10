// 📌 Real estate transaction feed only — not used in insurance yet.
/* import { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  getOwnershipContract,
  getGovernanceContract,
} from "@/utils/loadContract";

interface Transaction {
  type: string;
  amount?: number;
  date: string;
  status: string;
  propertyId?: number;
  txHash: string;
}

export function useUserTransactions(account: string | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;

    async function fetchTransactions() {
      try {
        setLoading(true);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const ownershipContract = getOwnershipContract(signer);
        const governanceContract = getGovernanceContract(signer);

        const latestBlock = await provider.getBlockNumber();
        const fromBlock = Math.max(latestBlock - 20000, 0);

        const txs: Transaction[] = [];

        // 🔹 ShareSold Events
        const soldEvents = await ownershipContract.queryFilter(
          ownershipContract.filters.ShareSold(null),
          fromBlock,
          latestBlock
        );
        console.log("🧾 Fetched sold events:", soldEvents);

        for (const raw of soldEvents) {
          const event = raw as ethers.EventLog;
          if (
            event.args &&
            account &&
            (event.args.buyer as string).toLowerCase() === account.toLowerCase()
          ) {
            const block = await event.getBlock();
            txs.push({
              type: "Buy",
              amount: 1, // TODO: replace with actual share amount if available
              date: new Date(block.timestamp * 1000).toLocaleDateString(),
              status: "Completed",
              txHash: event.transactionHash,
            });
          }
        }
        // ✅ Fetch ShareListed events
        const listedEvents = await ownershipContract.queryFilter(
          ownershipContract.filters.ShareListed(null, null, account),
          fromBlock,
          latestBlock
        );

        console.log("📦 Fetched listed events:", listedEvents);

        for (const raw of listedEvents) {
          const event = raw as ethers.EventLog;

          const block = await event.getBlock();

          txs.push({
            type: "Share Listed",
            amount: Number(event.args.shares || 0),
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            status: "Completed",
            txHash: event.transactionHash,
          });
        }
        // 🔹 ListingCancelled Events
        const cancelledEvents = await ownershipContract.queryFilter(
          ownershipContract.filters.ListingCancelled(null, account),
          fromBlock,
          latestBlock
        );
        console.log("🗑 Fetched cancelled events:", cancelledEvents);

        for (const raw of cancelledEvents) {
          const event = raw as ethers.EventLog;

          const block = await event.getBlock();

          txs.push({
            type: "Listing Cancelled",
            amount: undefined, // Optional: add shares if you emit it
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            status: "Completed",
            txHash: event.transactionHash,
          });
        }

        // 🔹 ProposalCreated Events
        const proposalEvents = await governanceContract.queryFilter(
          governanceContract.filters.ProposalCreated(null, null, null),
          fromBlock,
          latestBlock
        );
        console.log("📜 Fetched proposal events:", proposalEvents);

        console.log("👤 Wallet address:", account);

        for (const raw of proposalEvents) {
          const event = raw as ethers.EventLog;
          const proposer = (event.args?.proposer as string)?.toLowerCase();
          if (account && proposer === account.toLowerCase()) {
            const block = await event.getBlock();
            txs.push({
              type: "Proposal Created",
              date: new Date(block.timestamp * 1000).toLocaleDateString(),
              status: "Completed",
              txHash: event.transactionHash,
            });
          }
        }
        // 🔹 Voted Events (cannot filter voter directly)
        const votedEvents = await governanceContract.queryFilter(
          governanceContract.filters.Voted(), // No filter params
          fromBlock,
          latestBlock
        );
        console.log("🗳 Fetched vote events:", votedEvents);

        for (const raw of votedEvents) {
          const event = raw as ethers.EventLog;
          const voter = event.args?.voter as string;
          if (account && voter.toLowerCase() !== account.toLowerCase())
            continue;

          const block = await event.getBlock();

          txs.push({
            type: "Vote Cast",
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            status: "Completed",
            txHash: event.transactionHash,
          });
        }
        // 🏗 PropertyAdded Events
        const propertyAddedEvents = await ownershipContract.queryFilter(
          ownershipContract.filters.PropertyAdded(null, account),
          fromBlock,
          latestBlock
        );
        console.log("🏡 Fetched property added events:", propertyAddedEvents);

        for (const raw of propertyAddedEvents) {
          const event = raw as ethers.EventLog;
          const block = await event.getBlock();

          txs.push({
            type: "Property Added",
            amount: Number(event.args?.totalShares),
            date: new Date(block.timestamp * 1000).toLocaleDateString(),
            status: "Completed",
            propertyId: Number(event.args?.propertyId),
            txHash: event.transactionHash,
          });
        }

        // ✅ Sort & Save
        txs.sort((a, b) => (a.date < b.date ? 1 : -1));
        setTransactions(txs);
      } catch (error) {
        console.error("Error fetching user transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [account]);

  return { transactions, loading };
}
*/