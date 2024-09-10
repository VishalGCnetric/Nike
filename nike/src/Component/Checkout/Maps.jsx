import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for missing marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Maps = ({ currentLocation, nearbyShops }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the current location of the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log('Position:', latitude, longitude); // Debug output
          setPosition([18.2604291, 76.1826324]); // Replace with actual position if needed

          // Fetch address from latitude and longitude
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${18.2604291}&lon=${76.1826324}&format=json`
            );
            console.log('Address Response:', response.data); // Debug output
            setAddress(response.data.display_name);
          } catch (err) {
            setError('Unable to fetch address');
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {position ? (
        <div>
          <MapContainer
            center={position}
            zoom={10} // Zoom level
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* Marker for the current user location */}
            <Marker position={position}>
              <Tooltip>You are here <br /> {address}</Tooltip>
            </Marker>

            {/* Markers for nearby shops */}
            {nearbyShops.length > 0 ? (
              nearbyShops.map((shop) =>
                shop.sellers.map((seller) => (
                  <Marker
                    key={seller.sellerId}
                    position={[seller.coordinates.lng, seller.coordinates.lat]} // Swapped lat and lng
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <strong>{seller.sellerName}</strong> <br />
                      <a href={seller.mapLink} target="_blank" rel="noopener noreferrer">View on map</a>
                    </Tooltip>
                  </Marker>
                ))
              )
            ) : (
              <p>No shops available nearby.</p>
            )}
          </MapContainer>

          <p>Address: {address}</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default Maps;
