import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { Button, FormControlLabel, Modal, Box } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const shopIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const shippingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/711/711769.png',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const initialShops = [
  { name: 'Shop 1', lat: 18.2591827, lng: 76.1773209, product: 'Product 1', productID: 'P001' },
  { name: 'Shop 2', lat: 18.563636, lng: 76.214588, product: 'Product 2', productID: 'P002' },
  // other shops
];

const ShopDetails = ({ selectedOption, setSelectedOption }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { shippingAddress } = useSelector((state) => state.checkout);
  const navigate = useNavigate();

  useEffect(() => {
    const savedShippingAddress = shippingAddress || JSON.parse(localStorage.getItem('shippingAddress'));
    if (savedShippingAddress) {
      fetchCoordinates(savedShippingAddress);
    }
  }, []);

  const fetchCoordinates = async (address) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        async (error) => {
          console.error('Error fetching current location:', error);
          await attemptAddressGeocoding(address);
        }
      );
    }
  };

  const attemptAddressGeocoding = async (address) => {
    // Function for geocoding
  };

  useEffect(() => {
    if (currentLocation) {
      const filteredShops = initialShops
        .filter((shop) => shop.productID === 'P002')
        .map((shop) => {
          const distance = getDistanceFromLatLonInKm(
            currentLocation.lat,
            currentLocation.lng,
            shop.lat,
            shop.lng
          );
          return { ...shop, distance };
        })
        .filter((shop) => shop.distance <= 100)
        .sort((a, b) => a.distance - b.distance);

      setNearbyShops(filteredShops);
      if (filteredShops.length > 0) {
        setSelectedShop(filteredShops[0]);
      }
    }
  }, [currentLocation]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsContinueEnabled(true);

    if (event.target.value === 'Ship from Dealer' || event.target.value === 'Pickup from Dealer') {
      setIsModalOpen(true);
    }
  };

  const handleShopSelection = (shop) => {
    setSelectedShop(shop);
    setIsContinueEnabled(true);
  };

  const handleModalClose = () => {
    localStorage.setItem('selectedShop', JSON.stringify(selectedShop));
    setIsModalOpen(false);
  };

  return (
    <div>
      <ToastContainer />
      <div className="mt-2">
        <h3 className="text-md font-semibold">Choose a shipping method</h3>
        <div className="flex flex-col pl-2 pt-2 gap-2">
          <FormControlLabel
            control={<input type="radio" checked={selectedOption === 'Shipping'} onChange={handleOptionChange} value="Shipping" />}
            label="Shipping"
          />
          {currentLocation && (
            <>
              <FormControlLabel
                control={<input type="radio" checked={selectedOption === 'Ship from Dealer'} onChange={handleOptionChange} value="Ship from Dealer" />}
                label="Ship from Dealer"
              />
              <FormControlLabel
                control={<input type="radio" checked={selectedOption === 'Pickup from Dealer'} onChange={handleOptionChange} value="Pickup from Dealer" />}
                label="Pickup from Dealer"
              />
            </>
          )}
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box className="modal-box">
          <div className="flex">
            <MapContainer center={[currentLocation?.lat, currentLocation?.lng]} zoom={8} style={{ height: '400px', width: '50%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[currentLocation?.lat, currentLocation?.lng]} icon={shippingIcon}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <strong>Your Location</strong>
                </Tooltip>
              </Marker>
              {nearbyShops.map((shop) => (
                <Marker key={shop.name} position={[shop?.lat, shop?.lng]} icon={shopIcon}>
                  <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                    <strong>{shop.name}</strong><br />
                    Distance: {shop.distance.toFixed(2)} km
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>

            <div className="shop-list" style={{ width: '50%', padding: '20px', overflowY: 'auto' }}>
              <h3>Select a Shop</h3>
              {nearbyShops.map((shop) => (
                <div
                  key={shop.name}
                  className={`shop-item ${selectedShop?.name === shop.name ? 'selected' : ''}`}
                  onClick={() => handleShopSelection(shop)}
                  style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ccc' }}
                >
                  <strong>{shop.name}</strong><br />
                  Distance: {shop.distance.toFixed(2)} km
                </div>
              ))}
              <Button variant="contained" color="primary" onClick={handleModalClose} disabled={!selectedShop}>
                Continue
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {isContinueEnabled && (
        <button   className="w-full bg-black text-white p-2 rounded-lg hover:bg-zinc-800 mt-4" onClick={() => navigate("/checkout/billing")}>
          Continue
        </button>
      )}
    </div>
  );
};

export default ShopDetails;
