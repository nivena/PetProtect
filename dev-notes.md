# Development Notes - Property Decentralized

April 18th

## 📌 Post-Freeze Technical Debt / Improvements

### 🔁 MATIC Price Fetch Reliability

- Problem: Occasional failures from Coingecko API cause inconsistent portfolio valuation (e.g., $NaN).
- Current Fix: Temporary fallback to static price (0.2 MATIC) on error.
- Future Fixes:
  - Use paid Coingecko API or another premium service with higher rate limits.
  - Introduce retry & caching strategies (e.g. store last successful price).
  - Add Chainlink oracle integration for on-chain reliability.
  - Consider using SWR or getServerSideProps for more stable fetching.
  - Display "last updated" timestamp on UI to build trust.
