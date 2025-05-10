export type Policy = {
  id: number;
  name: string;
  location: string;
  price: number;
  ownershipType: string;
  image: string;
};

const policies: Policy[] = [
  {
    id: 1,
    name: "Luxury Villa",
    location: "Bali",
    price: 300000,
    ownershipType: "personal",
    image: "/images/villa.jpg",
  },
    {
      id: 2,
      name: "Beachfront Apartment",
      location: "Miami",
      price: 500000,
      ownershipType: "rental",
      image: "/images/apartment.jpg",
    },
    {
      id: 3,
      name: "City Condo",
      location: "New York",
      price: 800000,
      ownershipType: "rental",
      image: "/images/condo.jpg",
    },
  ];
  
  export default policies;
  