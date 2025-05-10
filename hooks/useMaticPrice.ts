import { useEffect, useState } from "react";
import { fetchMaticPrice } from "@/utils/fetchMaticPrice";

export function useMaticPrice() {
  const [price, setPrice] = useState<number>(1);

  useEffect(() => {
    async function load() {
      try {
        const fetched = await fetchMaticPrice();
        setPrice(fetched);

        if (process.env.NODE_ENV !== "production") {
          console.log("💵 Matic Price Loaded:", fetched);
        }
      } catch (error) {
        console.error("❌ Failed to fetch MATIC price:", error);
      }
    }

    load();
  }, []);

  return price;
}

