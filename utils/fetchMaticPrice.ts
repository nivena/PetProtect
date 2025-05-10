export async function fetchMaticPrice(): Promise<number> {
  try {
    const response = await fetch("/api/maticPrice");
    const data = await response.json();

    const price = data?.price;

    if (typeof price === "number" && !isNaN(price) && price > 0) {
      console.log("💵 fetchMaticPrice() returned:", price);
      return price;
    } else {
      console.warn("⚠️ Invalid MATIC price response. Using fallback 0.1905");
      return 0.2466; // Safe fallback
    }
  } catch (error) {
    console.error("❌ Error fetching MATIC price (via proxy):", error);
    return 0.2466; // Safe fallback
  }
}
