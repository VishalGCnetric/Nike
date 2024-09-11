import React, { useState } from "react";
import ShopCart from "./ShopCart"; // Ensure you import the ShopCart component
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Assuming shop is passed as a prop
const ShopCartList = ({ shop }) => {
  const [selectedSellers, setSelectedSellers] = useState({});
  const navigate = useNavigate();

  // Handle seller selection when a card is clicked
  const handleSelectSeller = (variantId, sellerId) => {
    const selectedVariant = shop?.find(v => v.variantId === variantId);
    const selectedSeller = selectedVariant.sellers.find(s => s.sellerId === sellerId);

    setSelectedSellers((prevSelected) => ({
      ...prevSelected,
      [variantId]: selectedSeller, // Store the selected seller for this variant
    }));
  };

  // Transform selectedSellers into the desired format
  const transformSelectedSellers = () => {
    return Object.entries(selectedSellers)?.map(([variantId, seller]) => {
      const variant = shop?.find(v => v.variantId === variantId);
      return {
        variantId,
        variantName: variant.variantName,
        sku: variant.sku,
        sellers: [seller], // Store only the selected seller for this variant
      };
    });
  };

  const notify = () => toast.success("Added sellers address");

  const handleContinue = () => {
    const selectedDealers = transformSelectedSellers(); // Call the function to get the data
    localStorage.setItem("selectedShippingDealers", JSON.stringify(selectedDealers));
    notify();
    navigate("/checkout/billing");
  };

  // Check if all variants have a selected seller
  const isAllSelected = shop?.every(variant => selectedSellers[variant.variantId]);

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-end mb-3 mr-3">
        <button
          onClick={handleContinue}
          className={`px-4 py-2 text-white font-semibold rounded-md transition duration-300 ${
            isAllSelected
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isAllSelected} // Disable the button if not all sellers are selected
        >
          Continue
        </button>
      </div>

      {shop?.map((variant, index) => (
        <div className="border mb-3 p-5" key={index}>
          <h1 className="my-2 font-semibold">{variant.variantName}</h1>
          <div>
            {variant.sellers.map((seller) => (
              <div
                key={seller.sellerId}
                className={`relative border p-4 mb-2 rounded-md cursor-pointer ${
                  selectedSellers[variant.variantId]?.sellerId === seller.sellerId
                    ? "border-green-600"
                    : "border-gray-300"
                }`}
                onClick={() => handleSelectSeller(variant.variantId, seller.sellerId)}
              >
                <ShopCart shop={seller} />
                {/* Display "Selected" label if this seller is selected */}
                {selectedSellers[variant.variantId]?.sellerId === seller.sellerId && (
                  <div className="absolute bottom-2 right-2 text-green-600 font-semibold">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCartList;
