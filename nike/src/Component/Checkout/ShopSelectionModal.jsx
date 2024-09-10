import React from "react";
import { Modal, Button } from "@mui/material";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ShopCartList from "./ShopCartList";
import ShopCart from "./ShopCart";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://example.com/path-to-custom-icon.png', // Replace with actual path to the icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const ShopSelectionModal = ({
  isOpen,
  onClose,
  coordinates,
  nearbyShops = [],
  onSelectShop,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white rounded-lg p-5 w-full max-w-5xl mx-auto max-h-[90vh] overflow-auto">
        <div className="flex flex-col sm:flex-row">
          {/* Left side: Map */}
          <div className="w-full sm:w-1/2 h-full mb-5 sm:mb-0">
            {coordinates ? (
              <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} className="h-96 w-full rounded">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {/* Current Location Marker */}
                <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
                  <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                    <strong>Your Location</strong>
                  </Tooltip>
                </Marker>

                {/* Nearby Shops Markers */}
                {nearbyShops.length > 0 ? (
                  nearbyShops.map((shop) => (
                    <Marker key={shop.sellerId} position={[shop.lat, shop.lng]}>
                      <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                        <strong>{shop.sellerName}</strong>
                      </Tooltip>
                    </Marker>
                  ))
                ) : (
                  <p>No shops available nearby.</p>
                )}
              </MapContainer>
            ) : (
              <p>Loading shop...</p>
            )}
          </div>

          {/* Right side: List of shops */}
          <div className="w-full sm:w-1/2 pl-0 sm:pl-6 overflow-y-auto max-h-96">
            <h2 className="text-xl font-semibold mb-4">Select a Shop</h2>
            {nearbyShops.length > 0 ? (
              nearbyShops.map((shop) => (
                <div key={shop.sellerId} className="mb-4 p-4 border rounded-lg cursor-pointer" onClick={() => onSelectShop(shop)}>
                  <h3 className="text-lg font-semibold">{shop.sellerName}</h3>
                  <p>Price: ₹{shop.price}</p>
                  <Button variant="contained" color="primary">
                    Select
                  </Button>
                </div>
              ))
            ) : (
              <div className="overflow-y-auto">
                <p>No shops available nearby.</p>
                <ShopCartList />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShopSelectionModal;
