import React from "react";
import ShopCart from "./ShopCart"; // Ensure you import the ShopCart component
export const shop = {
    data: [
      {
        variantId: "107",
        variantName: "Air Jordan 1 Low SE Brown/Sail/Neutral Grey/Archaeo Brown",
        sku: "HF1567-200",
        sellers: [
          {
            sellerId: "3",
            sellerName: "Sneakersnstuff",
            price: 1149500,
            coordinates: { lat: 59.3131645, lng: 18.0739928 },
            mapLink: "https://maps.app.goo.gl/ginWn95sFEK5PWKF8",
          },
        ],
      },
      {
        variantId: "150",
        variantName: "Jordan Artist Series By Darien Birks Dark Smoke Grey",
        sku: "HF5470-070",
        sellers: [
          {
            sellerId: "2",
            sellerName: "Dev Logistics",
            price: 274750,
            coordinates: { lat: 28.6513747, lng: 77.2316374 },
            mapLink: "https://www.google.com/maps/place/Chandni+Chowk,+Delhi/@28.6513747,77.2316374,15z/",
          },
          {
            sellerId: "5",
            sellerName: "Finish Line",
            price: 549500,
            coordinates: { lat: 39.8162553, lng: -85.9969006 },
            mapLink: "https://maps.app.goo.gl/tSQsEzQzpZca7uZc6",
          },
        ],
      },
    ],
  };
  

const ShopCartList = () => {
  return (
    <div>
      {shop.data.map((variant) => (
        <div key={variant.variantId}>
          <h1 className= "my-2 font-semibold">{variant.variantName}</h1>
          <div>
            {variant.sellers.map((seller) => (
              <ShopCart key={seller.sellerId} shop={seller} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCartList;
