import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DeliveryInformation from './DeliveryInformation';
import { Modal, Button } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ShopDetails from './ShopDetails';

const sharedClasses = {
    textZinc: 'text-zinc-600 dark:text-zinc-400',
    textBoldZinc: 'text-lg font-bold text-zinc-900 dark:text-zinc-100',
    borderZinc: 'border rounded-md border-zinc-300 dark:border-zinc-600',
    button: 'w-full bg-black text-white p-2 rounded-lg hover:bg-zinc-800',
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

const OrderDetails = () => {
    const [arrivalDate, setArrivalDate] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDealer, setSelectedDealer] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [dealers, setDealers] = useState(initialShops);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);

    useEffect(() => {
        // Calculate arrival date (5 days from now)
        const today = new Date();
        const arrival = new Date(today.setDate(today.getDate() + 5));
        setArrivalDate(arrival.toDateString());
    }, []);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        if (option === 'Pickup from Dealer') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setIsModalOpen(true);
                    },
                    (error) => alert('Location permission denied')
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        } else {
            setIsContinueEnabled(true);
        }
    };

    const handleDealerSelect = (dealer) => {
        setSelectedDealer(dealer);
        setIsContinueEnabled(true);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDealer(null);
    };

    const renderDealers = () => {
        if (dealers.length === 0) {
            return <p className="text-sm text-zinc-600 dark:text-zinc-400">No dealers found</p>;
        }
        return dealers.map((dealer) => (
            <div
                key={dealer.id}
                className="border rounded-md p-2 bg-gray-100 my-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleDealerSelect(dealer)}
            >
                <p className="font-semibold">{dealer.name}</p>
                <p className="text-sm">{dealer.location}</p>
            </div>
        ));
    };

    const defaultIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });

    return (
        <div className="p-6 bg-white dark:bg-background rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                When would you like to get your order?
            </h2>
            <div className={sharedClasses.borderZinc}>
                <p className="p-4 text-zinc-700 dark:text-zinc-300">Arrives {arrivalDate}</p>
            </div>

            <ShopDetails/>
            <div className="mt-6">
                <h3 className="text-md font-semibold text-zinc-800 dark:text-zinc-200">
                    Choose a shipping method
                </h3>
                <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            checked={selectedOption === 'Ship from Dealer'}
                            onChange={() => handleOptionChange('Ship from Dealer')}
                            className="mr-2"
                        />
                        Ship from Dealer
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            checked={selectedOption === 'Pickup from Dealer'}
                            onChange={() => handleOptionChange('Pickup from Dealer')}
                            className="mr-2"
                        />
                        Pickup from Dealer
                    </label>
                </div>

                {selectedDealer && (
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-zinc-800 dark:text-zinc-200 mb-2">Selected Dealer</h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {selectedDealer?.name} - {selectedDealer?.location}
                        </p>
                    </div>
                )}

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    This is an international shipment requiring customs clearance.
                </p>
            </div>
            <button
                className={`${sharedClasses.button} ${isContinueEnabled ? '' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!isContinueEnabled}
            >
                Continue
            </button>
            <DeliveryInformation />
            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
                <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Shipping</h4>
                <p className={sharedClasses.textZinc}>Your shipping information goes here.</p>
            </div>
            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
                <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Billing</h4>
            </div>
            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
                <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Payment</h4>
            </div>
            {/* Modal for Pickup from Dealer */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <div className="p-4 bg-white dark:bg-background rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Select a Dealer</h3>
                    <div className="flex">
                        <div className="w-1/2 pr-2">
                            <div className="border rounded-md p-2 bg-gray-100">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">Your Current Location</p>
                                {userLocation ? (
                                    <MapContainer
                                        center={[userLocation.lat, userLocation.lng]}
                                        zoom={13}
                                        style={{ height: '200px', width: '100%' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[userLocation.lat, userLocation.lng]} icon={defaultIcon}>
                                            <Popup>You are here</Popup>
                                        </Marker>
                                    </MapContainer>
                                ) : (
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fetching location...</p>
                                )}
                            </div>
                        </div>
                        <div className="w-1/2 pl-2">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Nearby Dealers</p>
                            {renderDealers()}
                        </div>
                    </div>
                    {selectedDealer && (
                        <div className="mt-4">
                            <h4 className="text-md font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                                Selected Dealer
                            </h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {selectedDealer.name} - {selectedDealer.location}
                            </p>
                            <button className={`${sharedClasses.button} mt-4`} onClick={handleCloseModal}>
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default OrderDetails;
