import React, { useState } from "react";
import ShopCart from "./ShopCart"; // Ensure you import the ShopCart component
import { json, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
          mapLink:
            "https://www.google.com/maps/place/Chandni+Chowk,+Delhi/@28.6513747,77.2316374,15z/",
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
  const [selectedSellers, setSelectedSellers] = useState({});
  const navigate = useNavigate()

  // Handle checkbox change
  const handleSelectSeller = (variantId, sellerId) => {
    const selectedVariant = shop.data.find(v => v.variantId === variantId);
    const selectedSeller = selectedVariant.sellers.find(s => s.sellerId === sellerId);

    setSelectedSellers((prevSelected) => ({
      ...prevSelected,
      [variantId]: selectedSeller // Store the selected seller for this variant
    }));
  };

  // Transform selectedSellers into the desired format
  const transformSelectedSellers = () => {
    return Object.entries(selectedSellers).map(([variantId, seller]) => {
      const variant = shop.data.find(v => v.variantId === variantId);
      return {
        variantId,
        variantName: variant.variantName,
        sku: variant.sku,
        sellers: [seller] // Store only the selected seller for this variant
      };
    });
  };

  const notify = () => toast.success("Added sellers address");
  const handleContinue = () => {
    const selectedDealers = transformSelectedSellers(); // Call the function to get the data
    localStorage.setItem("selectedShippingDealers", JSON.stringify(selectedDealers));
    notify(); // Assuming `notify` is a function to show a notification
    navigate('/checkout/billing')
  };
  


  return (
    <div>
      <ToastContainer/>
      <div className="flex justify-end mb-3 mr-3">
        <button
          onClick={handleContinue}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Continue
        </button>
      </div>

      {shop.data.map((variant) => (
        <div className="border mb-3 p-5" key={variant.variantId}>
          <h1 className="my-2 font-semibold">{variant.variantName}</h1>
          <div>
            {variant.sellers.map((seller) => (
              <div key={seller.sellerId} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedSellers[variant.variantId]?.sellerId === seller.sellerId}
                  onChange={() => handleSelectSeller(variant.variantId, seller.sellerId)}
                  className="mr-2"
                />
                <ShopCart shop={seller} />
              </div>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default ShopCartList;
