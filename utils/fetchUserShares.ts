import { ethers } from "ethers";

export async function fetchUserShares(
  contractInstance: ethers.Contract,
  userAccount: string
) {
  const [propertyIds, shares, images] = await contractInstance.getOwnedShares(
    userAccount
  );

  return await Promise.all(
    propertyIds.map(async (id: any, index: number) => {
      let propertyName = `Property #${id}`;
      let listed = 0;

      // ✅ Get property name
      try {
        const propertyDetails = await contractInstance.getProperty(id);
        propertyName = propertyDetails[0] || `Property #${id}`;
      } catch {}

      // ✅ Scan all listings to find match
      try {
        const listingCount = await contractInstance.getListingCount();
        for (let i = 0; i < listingCount; i++) {
          const listing = await contractInstance.listings(i);

          // 🔍 Match by propertyId, seller, and active status
          if (
            Number(listing.propertyId) === Number(id) &&
            listing.seller.toLowerCase() === userAccount.toLowerCase() &&
            listing.active
          ) {
            listed = Number(listing.shares);

            // 🛡️ Safety checks
            if (listed > Number(shares[index]) * 2) {
              console.warn("🛑 Skipping listing: Possible mismatch/overflow", {
                id: id.toString(),
                listed,
                owned: Number(shares[index]),
              });
              listed = 0;
            }

            if (listed > Number(shares[index])) {
              listed = 0;
            }

            break; // ✅ Stop after first valid match
          }
        }
      } catch (error) {
        console.warn("⚠️ Failed to scan listings for", id.toString(), error);
      }

      return {
        id: id.toString(),
        shares: Number(shares[index]),
        listed,
        image: images[index]?.includes("/uploads/")
          ? images[index]
          : `/uploads/${images[index]}`,
        propertyName,
      };
    })
  );
}
