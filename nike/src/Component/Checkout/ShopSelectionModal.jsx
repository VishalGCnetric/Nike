import React, { useState, useEffect } from "react";
import { Modal, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import ShopCartList from "./ShopCartList";
import Maps from "./Maps";
import ShopCart from "./ShopCart";

// Custom marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ShopSelectionModal = ({
  isOpen,
  onClose,
  coordinates,
  nearbyShops = [],
  onSelectShop,
}) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [selectedShops, setSelectedShops] = useState({}); // Track selected shop per variant

  useEffect(() => {
    if (coordinates) {
      const fetchAddress = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`
          );
          setAddress(response.data.display_name);
        } catch (err) {
          setError('Unable to fetch address');
        }
      };

      fetchAddress();
    }
  }, [coordinates]);

  // Handle shop selection and update local storage
  const handleSelectShop = (variantName, shop) => {
    // Update selected shop for the variant
    const updatedSelection = {
      ...selectedShops,
      [variantName]: shop,
    };

    setSelectedShops(updatedSelection);

    // Store the selected shops in local storage
    localStorage.setItem("selectedShops", JSON.stringify(updatedSelection));

    // You can call onSelectShop to handle further actions outside the component
    if (onSelectShop) {
      onSelectShop(updatedSelection);
    }
  };

  // Fetch selected shops from localStorage on component mount
  useEffect(() => {
    const storedSelection = JSON.parse(localStorage.getItem("selectedShops")) || {};
    setSelectedShops(storedSelection);
  }, []);

  return (
    <Modal open={isOpen} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-5 w-full max-w-5xl mx-auto max-h-[90vh] overflow-auto">
        <div className="flex flex-col sm:flex-row">
          {/* Left side: Map */}
          <div className="w-full sm:w-1/2 h-full mb-5 sm:mb-0">
            {coordinates ? (
              <Maps currentLocation={coordinates} nearbyShops={nearbyShops} />
            ) : (
              <p>Loading map...</p>
            )}
          </div>

          {/* Right side: List of shops */}
          <div className="w-full sm:w-1/2 pl-0 sm:pl-6 overflow-y-auto max-h-96">
            <h2 className="text-xl font-semibold mb-4">Select a Shop</h2>
            <ShopCartList shop={nearbyShops}/>
</div>
      </div>
      </div>
    </Modal>
  );
};

export default ShopSelectionModal;
