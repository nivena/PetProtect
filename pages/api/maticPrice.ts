// pages/api/maticPrice.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    );
    const price = response.data["matic-network"].usd;
    res.status(200).json({ price });
  } catch (error) {
    console.error("❌ Failed to fetch MATIC price:", error);
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
