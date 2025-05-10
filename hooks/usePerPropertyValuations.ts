/*
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function usePerPropertyValuations(
  ownershipContract: ethers.Contract | null,
  userShares: {
    id: string;
    shares: number;
  }[],
  maticPrice: number
) {
  const [valuations, setValuations] = useState<{
    [id: string]: { valueMatic: number; valueUSD: number };
  }>({});

  useEffect(() => {
    async function calculatePerPropertyValues() {
      if (!ownershipContract || !userShares || userShares.length === 0) return;

      const result: { [id: string]: { valueMatic: number; valueUSD: number } } =
        {};

      for (const share of userShares) {
        const propertyId = share.id;

        try {
          const ownedShares = Number(share.shares);
          const propertyDetails = await ownershipContract.getProperty(
            propertyId
          );
          const totalShares = Number(propertyDetails[3][0]);
          const propertyValuationBN =
            await ownershipContract.getPropertyValuation(propertyId);
          const propertyValuation = parseFloat(
            ethers.formatUnits(propertyValuationBN, "ether")
          );

          let pricePerShare = propertyValuation / totalShares;

          let listedShares = 0;
          let listedPrice = 0;

          try {
            const listing = await ownershipContract.getListing(propertyId);
            if (
              listing &&
              listing[2] &&
              listing[3] &&
              listing[2].toString() !== "0"
            ) {
              listedShares = Number(listing[2]);
              listedPrice = parseFloat(ethers.formatUnits(listing[3], "ether"));
            }
          } catch (err: any) {
            if (
              err?.code === "CALL_EXCEPTION" &&
              err?.reason === "Invalid listing index"
            ) {
              console.info(`ℹ️ Property ${propertyId} has no active listing.`);
            } else {
              console.warn(
                `⚠️ Unexpected error for property ${propertyId}:`,
                err
              );
            }
          }

          if (listedShares > 0 && listedPrice > 0) {
            const remainingShares = totalShares - listedShares;
            const valuationPricePerShare = propertyValuation / totalShares;
            pricePerShare =
              (listedShares * listedPrice +
                remainingShares * valuationPricePerShare) /
              totalShares;
          }

          const valueMatic = ownedShares * pricePerShare;
          const valueUSD = valueMatic * maticPrice;

          result[propertyId] = {
            valueMatic: Number(valueMatic.toFixed(2)),
            valueUSD: Number(valueUSD.toFixed(2)),
          };
        } catch (err) {
          console.warn(
            `❌ Error calculating value for property ${propertyId}`,
            err
          );
        }
      }

      setValuations(result);
    }

    calculatePerPropertyValues();
  }, [ownershipContract, userShares, maticPrice]);

  return valuations;
}
*/