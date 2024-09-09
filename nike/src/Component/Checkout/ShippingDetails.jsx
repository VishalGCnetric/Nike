import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { toast } from 'react-toastify'; // For toast notifications
import axios from 'axios'; // For geocoding requests
import ShopSelectionModal from './ShopSelectionModal'; // Custom modal for shop selection
import { shop } from './shop'; // Assuming the shop data is imported
// pick from deler use current location cordinate to  check the shop
// ship from deler use popup to ask shipping and current is same or not 
// if same  then use current location
// if not fetch cordinate using the shipping address.
const ShippingDetails = () => {
  const [locationGranted, setLocationGranted] = useState(false);
  const [browserCoordinates, setBrowserCoordinates] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('shipping');
  const [selectedShop, setSelectedShop] = useState(null);
  const [nearbyShops, setNearbyShops] = useState([]); // Stores shops within 50km
  const [shippingCoordinates, setShippingCoordinates] = useState(null);

  // Get shipping data from the Redux store
  const shippingData = useSelector(state => state.checkout.shippingAddress) || JSON.parse(localStorage.getItem('shippingAddress')); // Assuming address is in the Redux store
  // Request browser location permission
  useEffect(() => {
    // if(shippingData.isDefaultShipping){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationGranted(true);
        setBrowserCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log('Permission denied', error);
        setLocationGranted(false);
      }
    );
// }else{
//     attemptAddressGeocoding(shippingData)
// }
  }, []);

  // Fetch nearby shops based on browser coordinates
  useEffect(() => {
    if (browserCoordinates) {
      const shopsWithin50km = shop?.data?.filter((s) => {
        const distance = calculateDistance(
          browserCoordinates?.lat,
          browserCoordinates?.lng,
          s.coordinates?.lat,
          s.coordinates?.lng
        );
        return distance <= 50;
      });
      setNearbyShops(shopsWithin50km);
    }
  }, [browserCoordinates]);

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Attempt address geocoding
  const attemptAddressGeocoding = async (address) => {
    const performGeocoding = async (query) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
        );
        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setShippingCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error fetching geocode:', error);
        return false;
      }
    };

    // Prioritize geocoding attempts
    const geocodePriorities = [
      `${address.streetLine1}, ${address.city}, ${address.state}, ${address.country}`,
      `${address.streetLine2}, ${address.city}, ${address.state}, ${address.country}`,
      `${address.postalCode}, ${address.city}, ${address.state}, ${address.country}`
    ];

    for (const query of geocodePriorities) {
      const found = await performGeocoding(query);
      if (found) return;
    }

    toast.error('Address not found. Please opt for normal shipping.');
  };

  // Handle shipping option change
  const handleOptionChange = async (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    // For "Pick from dealer" or "Ship from dealer", attempt to geocode address or use browser location
    if (value === 'pick' || value === 'ship') {
      if (!browserCoordinates && shippingData) {
        await attemptAddressGeocoding(shippingData);
      }
      setIsModalOpen(true);
    }
  };

  // Handle shop selection and close modal
  const handleShopSelection = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(false);
    localStorage.setItem("selectedShop", JSON.stringify(shop));
  };
  return (
    <div>
      <h1>Shipping Details</h1>
      {/* Shipping or picking options */}
      <RadioGroup value={selectedOption} onChange={handleOptionChange}>
        <FormControlLabel value="shipping" control={<Radio />} label="Ship to my address" />
        {locationGranted && (
          <>
            <FormControlLabel value="pick" control={<Radio />} label="Pick from dealer" />
            <FormControlLabel value="ship" control={<Radio />} label="Ship from dealer" />
          </>
        )}
      </RadioGroup>

      {/* Modal for selecting shop */}
      <ShopSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        coordinates={browserCoordinates || shippingCoordinates}
        nearbyShops={nearbyShops}
        onSelectShop={handleShopSelection}
      />

      {/* Show continue button if shop is selected */}
      <Button 
        variant="contained" 
        color="primary" 
        disabled={!selectedShop && selectedOption !== 'shipping'}>
        Continue
      </Button>
    </div>
  );
};

export default ShippingDetails;
