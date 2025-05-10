// hooks/useMaticPrice.ts
import { useEffect, useState } from "react";
import { fetchMaticPrice } from "@/utils/fetchMaticPrice";

export function useMaticPrice() {
  const [price, setPrice] = useState<number>(1);

  useEffect(() => {
    console.log("💵 Matic Price Loaded:", price);

    async function load() {
      const fetched = await fetchMaticPrice();
      setPrice(fetched);
    }

    load();
  }, []);

  return price;
}
