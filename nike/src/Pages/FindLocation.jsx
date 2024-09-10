import React, { useState } from 'react';

const FindLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null); // Clear any previous errors
        },
        (err) => {
          setError('Unable to retrieve your location');
        },
        {
          enableHighAccuracy: true, // This provides more accurate results if available
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Find Your Location</h1>
      <button
        onClick={handleFindLocation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Find My Location
      </button>
      {location.latitude && location.longitude ? (
        <div className="text-lg">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p className="text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FindLocation;
