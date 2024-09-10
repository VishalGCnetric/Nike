import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ShopCart = ({ shop, onClick }) => {
  const position = [shop.coordinates.lat, shop.coordinates.lng];

  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow-md mb-8" onClick={onClick}>
      <div className="flex flex-row items-center justify-between space-y-4">
        <div className="relative h-36 w-36 rounded-lg overflow-hidden shadow-lg">
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>
                <span className="font-semibold">{shop.sellerName}</span> <br />
                Price: ₹{shop.price}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-indigo-900">{shop.sellerName}</h2>
          <p className="text-lg text-gray-700 font-medium">
            Price: <span className="text-green-600">₹{shop.price}</span>
          </p>
          <a href={shop.mapLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg transition duration-300 ease-in-out">
            View on GoogleMap
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
