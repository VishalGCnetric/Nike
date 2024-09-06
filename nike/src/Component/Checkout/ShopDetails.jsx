import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { Modal, Button, Checkbox, FormControlLabel } from '@mui/material';

const shippingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854866.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const shopIcon = new L.Icon({
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
  { name: 'Shop 3', lat: 18.409984, lng: 76.577656, product: 'Product 3', productID: 'P003' },
  { name: 'Shop 4', lat: 18.270430, lng: 76.256743, product: 'Product 4', productID: 'P004' },
  { name: 'Shop 5', lat: 18.380173, lng: 76.731065, product: 'Product 1', productID: 'P001' },
  { name: 'Shop 6', lat: 17.885044, lng: 76.586671, product: 'Product 2', productID: 'P002' },
  { name: 'Shop 7', lat: 18.545800, lng: 76.288155, product: 'Product 3', productID: 'P003' },
  { name: 'Shop 8', lat: 18.034805, lng: 76.425833, product: 'Product 4', productID: 'P004' },
  { name: 'Shop 9', lat: 18.318330, lng: 76.478090, product: 'Product 1', productID: 'P001' },
  { name: 'Shop 10', lat: 18.599326, lng: 76.623996, product: 'Product 2', productID: 'P002' },
];

const ShopDetails = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isPickupSelected, setIsPickupSelected] = useState(false);
  const [isShipFromSelected, setIsShipFromSelected] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    const savedShippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (savedShippingAddress) {
      const address = `${savedShippingAddress.address}, ${savedShippingAddress.city}, ${savedShippingAddress.postalCode}, ${savedShippingAddress.state}, ${savedShippingAddress.countryCode}`;
      fetchCoordinates(address);
    }
  }, []);

  const fetchCoordinates = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCurrentLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        alert('Address not found.');
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  useEffect(() => {
    if (currentLocation) {
      const filteredShops = initialShops
        .filter(shop => shop.productID === 'P002')
        .map(shop => {
          const distance = getDistanceFromLatLonInKm(
            currentLocation.lat,
            currentLocation.lng,
            shop.lat,
            shop.lng
          );
          return { ...shop, distance };
        })
        .filter(shop => shop.distance <= 100)
        .sort((a, b) => a.distance - b.distance);

      setNearbyShops(filteredShops);
      if (filteredShops.length > 0) {
        setSelectedShop(filteredShops[0]);
      }
    }
  }, [currentLocation]);

  const handleOptionChange = (event) => {
    const { value } = event.target;
    if (value === 'pickup') {
      setIsPickupSelected(true);
      setIsShipFromSelected(false);
    } else if (value === 'ship') {
      setIsPickupSelected(false);
      setIsShipFromSelected(true);
    }
    setIsContinueEnabled(true);
  };

  return (
    <div>
      {/* <h1>Shop Locator</h1> */}
      {currentLocation && (
        <>
          <MapContainer center={[currentLocation.lat, currentLocation.lng]} zoom={8} style={{ height: '400px', marginTop: '20px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={[currentLocation.lat, currentLocation.lng]} icon={shippingIcon}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                <strong>Your Location</strong>
              </Tooltip>
            </Marker>

            {nearbyShops.map((shop, index) => (
              <Marker key={index} position={[shop.lat, shop.lng]} icon={shopIcon}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <strong>{shop.name}</strong><br />
                  Distance: {shop.distance.toFixed(2)} km
                </Tooltip>
                {selectedShop && shop.name === selectedShop.name && (
                  <Polyline positions={[[currentLocation.lat, currentLocation.lng], [shop.lat, shop.lng]]} color="blue" />
                )}
              </Marker>
            ))}
          </MapContainer>

          <h2>Nearest Shop:</h2>
          {selectedShop ? (
            <div>
              <p><strong>{selectedShop.name}</strong></p>
              <p>Distance: {selectedShop.distance.toFixed(2)} km</p>

              <FormControlLabel
                control={<Checkbox checked={isShipFromSelected} onChange={handleOptionChange} value="ship" />}
                label="Ship from this shop"
              />
              <FormControlLabel
                control={<Checkbox checked={isPickupSelected} onChange={handleOptionChange} value="pickup" />}
                label="Pickup from this shop"
              />

              <Button
                variant="contained"
                color="primary"
                disabled={!isContinueEnabled}
              >
                Continue
              </Button>
            </div>
          ) : (
            <p>No shops found within 100 km for the selected product.</p>
          )}

          <h3>Other Nearby Shops:</h3>
          <ul>
            {nearbyShops.slice(1).map((shop, index) => (
              <li key={index}>
                <strong>{shop.name}</strong> - Distance: {shop.distance.toFixed(2)} km
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ShopDetails;
