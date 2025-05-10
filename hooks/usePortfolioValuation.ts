/*
// 📌 Valuation for property shares — irrelevant for insurance. Replace later.

// hooks/usePortfolioValuation.ts
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { fetchMaticPrice } from "@/utils/fetchMaticPrice";

export function usePortfolioValuation(
  ownershipContract: ethers.Contract | null,
  account: string | null
) {
  const [portfolioValue, setPortfolioValue] = useState({
    matic: 0,
    usd: "0.00",
  });

  useEffect(() => {
    async function updatePortfolioValue() {
      console.log("🔄 usePortfolioValuation: Recalculating...");

      if (!ownershipContract || !account) return;

      try {
        const shares = await ownershipContract.getOwnedShares(account);
        let totalMatic = 0;
        const maticPrice = await fetchMaticPrice().catch((err) => {
          console.warn("⚠️ Fallback to default MATIC price:", err.message);
          return 0.2466;
        });
        const seenProperties = new Set();

        for (let i = 0; i < shares[0].length; i++) {
          const propertyId = shares[0][i];
          const shareCount = Number(shares[1][i]);

          if (seenProperties.has(propertyId)) continue;
          seenProperties.add(propertyId);

          let pricePerShare = 0;
          let listedShares = 0;
          let listedPrice = 0;
          let totalShares = 0;
          let propertyValuation = 0;
          let listing; // ✅ Declare listing outside the try so it's visible below

          try {
            const propertyDetails = await ownershipContract.getProperty(
              propertyId
            );
            totalShares = Number(propertyDetails[3][0]);

            if (totalShares <= 0) continue;

            const valuationBN = await ownershipContract.getPropertyValuation(
              propertyId
            );
            propertyValuation = parseFloat(
              ethers.formatUnits(valuationBN, "ether")
            );

            try {
              listing = await ownershipContract.getListing(propertyId);
              console.log("🔍 LISTING DEBUG:", {
                propertyId: propertyId.toString(),
                listing,
              });
              listedShares = Number(listing[2] || 0);
              listedPrice = parseFloat(
                ethers.formatUnits(listing[3] || 0, "ether")
              );

              const safeListed = listedShares || 0;
              const safeListedPrice = listedPrice || 0;
              const safeValuation = propertyValuation || 0;
              const safeTotalShares = totalShares || 1;

              const valuationPricePerShare = safeValuation / safeTotalShares;

              pricePerShare =
                (safeListed * safeListedPrice +
                  (safeTotalShares - safeListed) * valuationPricePerShare) /
                safeTotalShares;

              if (
                isNaN(pricePerShare) ||
                pricePerShare < 0 ||
                !isFinite(pricePerShare)
              ) {
                pricePerShare = 0;
              }
            } catch {
              pricePerShare = propertyValuation / totalShares;
            }
          } catch {
            continue;
          }

          const userOwnedListed =
            listing?.[1]?.toLowerCase() === account.toLowerCase()
              ? listedShares
              : 0;

          const totalUserShares = shareCount + userOwnedListed;

          const propertyValue = totalUserShares * pricePerShare;

          if (isNaN(propertyValue) || propertyValue < 0) continue;
          console.log("📈 VALUE DEBUG", {
            propertyId: propertyId.toString(),
            totalUserShares,
            shareCount,
            userOwnedListed,
            pricePerShare,
            propertyValue,
          });

          totalMatic += propertyValue;
        }

        const totalUSD = (totalMatic * maticPrice).toFixed(2);
        console.log("✅ FINAL PORTFOLIO:", {
          totalMatic,
          totalUSD,
          maticPrice,
        });

        setPortfolioValue({
          matic: Number(totalMatic.toFixed(2)),
          usd: totalUSD,
        });
      } catch (error) {
        console.error("❌ Error updating portfolio value:", error);
      }
    }

    updatePortfolioValue();
  }, [ownershipContract, account]);

  return portfolioValue;
}
*/