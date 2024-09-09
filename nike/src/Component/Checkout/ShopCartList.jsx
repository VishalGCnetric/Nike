import React from "react";
import ShopCart from "./ShopCart"; // Ensure you import the ShopCart component

export const shop = {
  data: [
    {
      variantId: "P001",
      variantName: "Product 1",
      sku: "404.068.14",
      sellers: [
        {
          sellerId: 1,
          sellerName: "Shop 1",
          price: 13000,
          coordinates: { lat: 21.1533321, lng: 79.0885306 },
          mapLink: "https://maps.google.com/?q=21.1533321,79.0885306",
        },
        {
          sellerId: 5,
          sellerName: "Shop 5",
          price: 12000,
          coordinates: { lat: 21.162742, lng: 79.071926 },
          mapLink: "https://maps.google.com/?q=21.162742,79.071926",
        },
      ],
    },
    {
      variantId: "P002",
      variantName: "Product 2",
      sku: "404.068.14",
      sellers: [
        {
          sellerId: 2,
          sellerName: "Shop 2",
          price: 14000,
          coordinates: { lat: 21.160134, lng: 79.094056 },
          mapLink: "https://maps.google.com/?q=21.160134,79.094056",
        },
        {
          sellerId: 6,
          sellerName: "Shop 6",
          price: 13500,
          coordinates: { lat: 21.149098, lng: 79.099121 },
          mapLink: "https://maps.google.com/?q=21.149098,79.099121",
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
          <h1>{variant.variantName}</h1>
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
