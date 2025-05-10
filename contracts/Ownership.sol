// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// import "hardhat/console.sol"; // ✅ Add this at the top for debugging

contract Ownership {

    // ✅ Add a debug event to confirm deploy success
    event ContractDeployed(address indexed deployer);

    // ✅ Add a constructor right after declaring the contract
    constructor() {
        emit ContractDeployed(msg.sender);
    }
    struct Property {
    string name;  // ✅ NEW: Store property name
    string imageFilename;
    address[] owners;
    uint256[] shares;
    uint256 valuation; // ✅ Store valuation for property value calculations
    uint256 totalRating;
    uint256 totalVotes;
}  

    struct Listing {
        uint256 propertyId;
        address seller;
        uint256 shares;
        uint256 price;
        bool active;
    }

    // ✅ Store ratings separately
    mapping(uint256 => mapping(address => bool)) public hasRated;

    mapping(uint256 => Property) public properties;
    Listing[] public listings;

    // ✅ Property count variable added to track number of properties
    uint256 public propertyCount;

    event PropertyRated(uint256 indexed propertyId, address indexed user, uint256 rating);
    event ShareAdded(uint256 indexed propertyId, address indexed owner, uint256 share);
    event ShareListed(uint256 indexed listingId, uint256 propertyId, address indexed seller, uint256 shares, uint256 price);
    event ShareSold(uint256 indexed listingId, address indexed buyer);
    event DebugShares(uint256 indexed propertyId, address[] owners, uint256[] shares);
event PropertyAdded(
    uint256 indexed propertyId, 
    address indexed owner, 
    string name,  // ✅ Added name field
    string imageFilename, 
    uint256 totalShares, 
    uint256 valuation
);
    event DebugPayment(uint256 listingId, address buyer, uint256 sentAmount, uint256 expectedAmount);
    // ✅ Debugging Event
    event DebugSharesOwned(address indexed user, uint256[] propertyIds, uint256[] shareAmounts, string[] images);
    // ✅ Debugging Events - Place These at the Top with Other Events
    event DebugPropertyOwners(uint256 indexed propertyId, address[] owners);
    event DebugPropertyShares(uint256 indexed propertyId, uint256[] shares);
    event ListingCancelled(uint256 indexed listingId, address indexed seller);
    event ListingUpdated(uint256 indexed listingId, uint256 newShares);
    
 // ✅ Allow contract to receive MATIC payments
    receive() external payable {}

    fallback() external payable {}

/** 📊 Rate a Property */
function rateProperty(uint256 propertyId, uint8 rating) public {
    require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
    require(!hasRated[propertyId][msg.sender], "You have already rated this property");

    Property storage property = properties[propertyId];  // ✅ Uses storage to modify state
    property.totalRating += rating;
    property.totalVotes += 1;
    hasRated[propertyId][msg.sender] = true;

    emit PropertyRated(propertyId, msg.sender, rating);
}


  function getPropertyRating(uint256 propertyId) public view returns (uint256 averageRating, uint256 votes) {
    Property storage property = properties[propertyId];  // ✅ Uses storage instead of memory
    if (property.totalVotes == 0) {
        return (0, 0);
    }
    return (property.totalRating / property.totalVotes, property.totalVotes);
}


/** ✅ Check if User has Rated */
function hasUserRated(uint256 propertyId, address user) public view returns (bool) {
    return hasRated[propertyId][user];
}

  
/** 🏡 Add Property with Name, Image, Total Shares & Valuation (Prevents Duplicates) */
function addProperty(string memory name, string memory imageFilename, uint256 totalShares, uint256 valuation) public {
    require(bytes(name).length > 0, "Property name cannot be empty");  // ✅ Ensure name is provided
    require(bytes(imageFilename).length > 0, "Image filename cannot be empty");
    require(totalShares > 0, "Total shares must be greater than zero");
    require(valuation > 0, "Valuation must be greater than zero");

    // 🔥 Fix: Allow duplicate filenames but enforce unique (name + filename)
for (uint256 i = 0; i < propertyCount; i++) {
    if (
        keccak256(abi.encodePacked(properties[i].name, properties[i].imageFilename)) ==
        keccak256(abi.encodePacked(name, imageFilename))
    ) {
        revert("Duplicate property detected.");
    }
}


    uint256 propertyId = propertyCount;

    // ✅ Ensure proper struct initialization
    Property storage newProperty = properties[propertyId];
    newProperty.name = name;  // ✅ Store the property name
    newProperty.imageFilename = imageFilename;
    newProperty.owners.push(msg.sender);
    newProperty.shares.push(totalShares);
    newProperty.valuation = valuation;

    propertyCount++;

    // ✅ Preserve all event emissions
    emit PropertyAdded(propertyId, msg.sender, name, imageFilename, totalShares, valuation); // ✅ Updated event with name
    emit DebugPropertyOwners(propertyId, newProperty.owners);
    emit DebugPropertyShares(propertyId, newProperty.shares);
}

/** 🏡 Update Property Valuation */
function updatePropertyValuation(uint256 propertyId, uint256 newValuation) public {
    require(propertyId < propertyCount, "Invalid property ID.");
    require(newValuation > 0, "Valuation must be greater than zero.");
    require(properties[propertyId].owners.length > 0, "Property does not exist.");
    
    // ✅ Only the original owner can update valuation
    require(properties[propertyId].owners[0] == msg.sender, "Only the original owner can update valuation.");

    properties[propertyId].valuation = newValuation;

    emit PropertyValuationUpdated(propertyId, newValuation);
}

/** 📢 Emit Event for Frontend Sync */
event PropertyValuationUpdated(uint256 indexed propertyId, uint256 newValuation);


/** 💰 Get Property Valuation */
function getPropertyValuation(uint256 propertyId) public view returns (uint256) {
    require(propertyId < propertyCount, "Invalid property ID.");
    return properties[propertyId].valuation;
}




/** 🔍 Get Property Details */
function getProperty(uint256 propertyId) public view returns (string memory, string memory, address[] memory, uint256[] memory, uint256) {
    Property storage property = properties[propertyId];
    return (property.name, property.imageFilename, property.owners, property.shares, property.valuation); // ✅ Return name
}

   /** 🏡 Add Share to a Property */
function addShare(uint256 propertyId, address newOwner, uint256 share) public {
    require(newOwner != address(0), "Invalid address");
    require(share > 0, "Share must be greater than zero");

    // Explicitly reference the property in storage
    Property storage property = properties[propertyId];

    bool isExistingOwner = false;
    for (uint256 i = 0; i < property.owners.length; i++) {
        if (property.owners[i] == newOwner) {
            isExistingOwner = true;
            property.shares[i] += share;
            break;
        }
    }

    if (!isExistingOwner) {
        property.owners.push(newOwner);
        property.shares.push(share);
    }

    emit ShareAdded(propertyId, newOwner, share);
    emit DebugShares(propertyId, property.owners, property.shares);
}



    /** 🏡 Get Shares of a Property */
function getShares(uint256 propertyId) public view returns (address[] memory owners, uint256[] memory shares) {
    require(propertyId < propertyCount, "Invalid property ID."); // Ensure valid property

    Property storage property = properties[propertyId];

    uint256 ownersCount = property.owners.length;
    uint256 sharesCount = property.shares.length;
    
    // ✅ Ensure array sizes match, preventing storage issues
    require(ownersCount == sharesCount, "Owners and shares length mismatch");

    owners = new address[](ownersCount);
    shares = new uint256[](sharesCount);

    for (uint256 i = 0; i < ownersCount; i++) {
        owners[i] = property.owners[i];
        shares[i] = property.shares[i];
    }

    return (owners, shares);
}

/** 🏡 Check if a user owns shares in a property */
function isPropertyOwner(uint256 propertyId, address user) external view returns (bool) {
    require(properties[propertyId].owners.length > 0, "Invalid property ID."); // ✅ Fix for mapping
    
    for (uint256 i = 0; i < properties[propertyId].owners.length; i++) {
        if (properties[propertyId].owners[i] == user) {
            return true;
        }
    }
    return false;
}



   /** 🏡 List Shares for Sale */
function listSharesForSale(uint256 propertyId, uint256 shares, uint256 price) public {
    require(shares > 0, "Must list at least one share.");
    require(price > 0, "Price must be greater than zero.");

    // Check if sender is an owner and has enough shares
    bool isOwner = false;
    uint256 ownerIndex = 0;
    for (uint256 i = 0; i < properties[propertyId].owners.length; i++) {
        if (properties[propertyId].owners[i] == msg.sender) {
            isOwner = true;
            require(properties[propertyId].shares[i] >= shares, "Not enough shares to list.");
            ownerIndex = i;
            break;
        }
    }
    require(isOwner, "Only property owners can list shares.");

    // ✅ Deduct shares from seller's ownership balance
    properties[propertyId].shares[ownerIndex] -= shares;

    // Check if seller already has an active listing for this property
    bool listingExists = false;
    uint256 listingIndex = 0;
    for (uint256 i = 0; i < listings.length; i++) {
        if (listings[i].propertyId == propertyId && listings[i].seller == msg.sender && listings[i].active) {
            listingExists = true;
            listingIndex = i;
            break;
        }
    }

    if (listingExists) {
        // ✅ Update existing listing instead of creating a new one
        listings[listingIndex].shares += shares; // Add shares to listing
        listings[listingIndex].price = price; // Update price in case the seller changes it
    } else {
        // ✅ Create a new listing
        listings.push(Listing({
            propertyId: propertyId,
            seller: msg.sender,
            shares: shares,
            price: price,
            active: true
        }));
    }

    emit ShareListed(listings.length - 1, propertyId, msg.sender, shares, price);
}



/** 🏡 Reduce or Remove Shares from a Listing */
function updateListing(uint256 listingId, uint256 newShares) public {
    require(listingId < listings.length, "Invalid listing ID.");
    Listing storage listing = listings[listingId];

    require(listing.seller == msg.sender, "Only the seller can update this listing.");
    require(listing.active, "Listing is not active.");
    require(newShares <= listing.shares, "Cannot increase shares using this function.");

    uint256 sharesToReturn = listing.shares - newShares;

    if (newShares == 0) {
        // ✅ Remove the listing completely
        listing.active = false;
        listing.shares = 0;
    } else {
        // ✅ Reduce the number of shares in the listing
        listing.shares = newShares;
    }

    // ✅ Return the removed shares back to the seller
    for (uint256 i = 0; i < properties[listing.propertyId].owners.length; i++) {
        if (properties[listing.propertyId].owners[i] == msg.sender) {
            properties[listing.propertyId].shares[i] += sharesToReturn;
            break;
        }
    }

    emit ListingUpdated(listingId, newShares);
}


    /** 🔄 Get Number of Listings */
    function getListingCount() public view returns (uint256) {
        return listings.length;
    }

    /** 🔄 Get Specific Listing */
function getListing(uint256 index) public view returns (
    uint256 propertyId, 
    address seller, 
    uint256 shares, 
    uint256 price, 
    bool active, 
    string memory imageFilename
) {
    require(index < listings.length, "Invalid listing index");
    Listing storage listing = listings[index];
    
    // ✅ Fetch the image filename from the property struct
    return (
        listing.propertyId, 
        listing.seller, 
        listing.shares, 
        listing.price, 
        listing.active, 
        properties[listing.propertyId].imageFilename  // ✅ Now correctly retrieves image!
    );
}

/** 🔄 Get All Listings */
function getAllListings() public view returns (
    uint256[] memory propertyIds,
    address[] memory sellers,
    uint256[] memory shares,
    uint256[] memory prices,
    bool[] memory active,
    string[] memory imageFilenames
) {
    uint256 length = listings.length;
    propertyIds = new uint256[](length);
    sellers = new address[](length);
    shares = new uint256[](length);
    prices = new uint256[](length);
    active = new bool[](length);
    imageFilenames = new string[](length);

    for (uint256 i = 0; i < length; i++) {
        Listing storage listing = listings[i];
        propertyIds[i] = listing.propertyId;
        sellers[i] = listing.seller;
        shares[i] = listing.shares;
        prices[i] = listing.price;
        active[i] = listing.active;
        imageFilenames[i] = properties[listing.propertyId].imageFilename; // ✅ Fetch image
    }

    return (propertyIds, sellers, shares, prices, active, imageFilenames);
}



/** 🔄 Get Shares Owned by a User */
function getOwnedShares(address user) public view returns (uint256[] memory, uint256[] memory, string[] memory) {
    uint256 count = 0;

    // ✅ Count the properties where user owns shares
    for (uint256 i = 0; i < propertyCount; i++) {
        for (uint256 j = 0; j < properties[i].owners.length; j++) {
            if (properties[i].owners[j] == user) {
                count++;
            }
        }
    }

    uint256[] memory propertyIds = new uint256[](count);
    uint256[] memory shareAmounts = new uint256[](count);
    string[] memory images = new string[](count);
    uint256 index = 0;

    // ✅ Populate arrays with user's property IDs and total share amounts
    for (uint256 i = 0; i < propertyCount; i++) {
        uint256 totalShares = 0; // ✅ Store total shares per property

        for (uint256 j = 0; j < properties[i].owners.length; j++) {
            if (properties[i].owners[j] == user) {
                totalShares += properties[i].shares[j]; // ✅ Sum up all purchases
            }
        }

        if (totalShares > 0) { // ✅ Only store if the user owns shares
            propertyIds[index] = i;
            shareAmounts[index] = totalShares;
            images[index] = properties[i].imageFilename;
            index++;
        }
    }

    return (propertyIds, shareAmounts, images);
}



/** 🔄 Transfer Shares */
function transferShares(uint256 propertyId, address recipient, uint256 sharesToTransfer) public {
    require(sharesToTransfer > 0, "Invalid share amount");
    
    Property storage property = properties[propertyId];
    bool senderOwnsShares = false;
    uint256 senderIndex = 0;
    
    // ✅ Find the sender in the owners list
    for (uint256 i = 0; i < property.owners.length; i++) {
        if (property.owners[i] == msg.sender && property.shares[i] >= sharesToTransfer) {
            senderOwnsShares = true;
            senderIndex = i;
            break;
        }
    }
    require(senderOwnsShares, "Sender does not own enough shares");

    // ✅ Deduct shares from sender
    property.shares[senderIndex] -= sharesToTransfer;

    // ✅ If sender has 0 shares left, remove them from owners list
    if (property.shares[senderIndex] == 0) {
        removeOwner(property, senderIndex);
    }

    // ✅ Add shares to recipient
    property.owners.push(recipient);
    property.shares.push(sharesToTransfer);

    emit DebugShares(propertyId, property.owners, property.shares);
    emit ShareTransferred(propertyId, msg.sender, recipient, sharesToTransfer);
}

event ShareTransferred(uint256 indexed propertyId, address indexed from, address indexed to, uint256 shares);


    /** 💰 Buy Shares */
function buyShares(uint256 listingId, uint256 sharesToBuy) public payable {
    require(listingId < listings.length, "Invalid listing ID");
    Listing storage listing = listings[listingId];
    require(listing.active, "Listing is not active");
    require(sharesToBuy > 0 && sharesToBuy <= listing.shares, "Invalid share amount");

    // ✅ Ensure buyer sends correct amount for the shares they want
    uint256 expectedAmount = listing.price * sharesToBuy;
    require(msg.value >= expectedAmount, "Incorrect payment amount");

    // ✅ Verify seller has an active listing but DO NOT deduct again
    bool sellerHasListing = false;
    uint256 ownerIndex = 0;
    for (uint256 i = 0; i < properties[listing.propertyId].owners.length; i++) {
        if (properties[listing.propertyId].owners[i] == listing.seller) {
            sellerHasListing = true;
            ownerIndex = i;
            break;
        }
    }
    require(sellerHasListing, "Seller does not exist in ownership records");

    // ✅ Add shares to buyer (NO DEDUCTION FROM SELLER)
    properties[listing.propertyId].owners.push(msg.sender);
    properties[listing.propertyId].shares.push(sharesToBuy);

    // ✅ Transfer payment to seller
    (bool success, ) = payable(listing.seller).call{value: msg.value}("");
    require(success, "Transfer failed");

    // ✅ Update listing (reduce shares or mark as sold)
    listing.shares -= sharesToBuy;
    if (listing.shares == 0) {
        listing.active = false;
    }

    emit ShareSold(listingId, msg.sender);
}

/** 🔄 Helper function: Remove owner when they have zero shares left */
function removeOwner(Property storage property, uint256 index) internal {
    require(index < property.owners.length, "Invalid owner index");

    // Swap with last element and pop to reduce gas
    property.owners[index] = property.owners[property.owners.length - 1];
    property.shares[index] = property.shares[property.shares.length - 1];

    property.owners.pop();
    property.shares.pop();
}


function cancelListing(uint256 listingId) public {
    require(listingId < listings.length, "Invalid listing index.");
    Listing storage listing = listings[listingId];

    require(listing.seller == msg.sender, "Only the seller can cancel this listing.");
    require(listing.active, "Listing is already inactive.");

    listing.active = false;
    listing.price = 0; // ✅ Reset price to avoid lingering issues
    listing.shares = 0; // ✅ Prevent ghost shares from appearing in marketplace

    emit ListingCancelled(listingId, msg.sender);
}




    /** 🔄 Get Owned Property Count */
    function getOwnedPropertyCount(address user) public view returns (uint256 count) {
        count = 0;
        for (uint256 i = 0; i < listings.length; i++) {
            if (listings[i].seller == user) {
                count++;
            }
        }
    }
}