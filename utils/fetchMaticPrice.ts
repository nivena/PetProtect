export async function fetchMaticPrice(): Promise<number> {
  try {
    const response = await fetch("/api/maticPrice");
    const data = await response.json();

    const price = data?.price;

    if (typeof price === "number" && !isNaN(price) && price > 0) {
      if (process.env.NODE_ENV !== "production") {
        console.log("💵 fetchMaticPrice() returned:", price);
      }
      return price;
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.warn("⚠️ Invalid MATIC price response. Using fallback.");
      }
      return 0.2466; // Fallback price in MATIC (used when API fails or offline mode)
    }
  } catch (error) {
    console.error("❌ Error fetching MATIC price (via proxy):", error);
    return 0.2466; // Fallback price in MATIC (used when API fails or offline mode)
  }
}
