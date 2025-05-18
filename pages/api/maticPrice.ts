import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
    );

    const price = response.data["matic-network"].usd;

    // ✅ Encourage cache on Vercel or CDN
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    res.status(200).json({ price });
  } catch (error) {
    console.error("❌ Failed to fetch MATIC price:", error);
    res.status(500).json({ error: "Failed to fetch price" });
  }
}
