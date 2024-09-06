import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress, saveShippingAddress } from '../../redux/slices/checkoutSlice'; // Redux action
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const AddressForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSameAsBilling, setIsSameAsBilling] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        landmark: '',
        streetLine1: '',
        streetLine2: '',
        city: '',
        postalCode: '',
        state: '',
        country: '', // Default to India
        phoneNumber: '',
        // isDefaultBilling: true,
        // defaultShippingAddress: false,
    });

    // Function to fetch address details based on postal code
    const fetchAddressFromPostalCode = async (postalCode) => {
        try {
            const response = await axios.get(`https://api.zippopotam.us/IN/${postalCode}`);
            if (response.data && response.data.places.length > 0) {
                const { 'place name': city, state } = response.data.places[0];
                setFormData({
                    ...formData,
                    city,
                    state,
                    country: response.data.country,
                    postalCode:postalCode 
                });
            }
        } catch (error) {
            console.error("Error fetching address details:", error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch form data to Redux
        dispatch(saveShippingAddress(formData));

        // Store form data in local storage
        localStorage.setItem('shippingAddress', JSON.stringify(formData));

        // Update URL parameter to move to the next step (e.g., 'shipping')
        // setSearchParams({ step: 'shipping' });

        // Optional: Navigate to the next step
        navigate('/checkout/shipping'); 
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // If postalCode is being changed, fetch address details
        if (name === 'postalCode' && value.length === 6) {
            fetchAddressFromPostalCode(value);
        }

       
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setIsSameAsBilling(e.target.checked);
        setFormData({
            ...formData,
            // defaultShippingAddress: !formData.defaultShippingAddress,
        });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-card rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Enter your shipping address:</h2>
            <form onSubmit={handleSubmit}>
                {/* Form inputs for address */}
                <div className="block mb-2">
                    <label className="text-muted-foreground">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>

                <div className="block mb-2">
                    <label className="text-muted-foreground">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>

                <div className="block mb-2">
                    <label className="text-muted-foreground">Landmark</label>
                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                    />
                </div>

                <div className="block mb-2">
                    <label className="text-muted-foreground">Street Line 1</label>
                    <input
                        type="text"
                        name="streetLine1"
                        value={formData.streetLine1}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>

                <div className="block mb-2">
                    <label className="text-muted-foreground">Street Line 2</label>
                    <input
                        type="text"
                        name="streetLine2"
                        value={formData.streetLine2}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                    />
                </div>

                <div className="block mb-2">
                    <label className="text-muted-foreground">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>

                <div className="block mb-2">
                    <label className="text-muted-foreground">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>
                <div className="block mb-2">
                    <label className="text-muted-foreground">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>
                <div className="block mb-2">
                    <label className="text-muted-foreground">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>
                <div className="block mb-2">
                    <label className="text-muted-foreground">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md p-2 border border-border"
                        required
                    />
                </div>
               

                {/* Checkbox for Billing Address same as Shipping */}
                <div className="block mb-4">
                    <label>
                        <input
                            type="checkbox"
                            checked={isSameAsBilling}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        Shipping address is the same as current address
                    </label>
                </div>

                <button type="submit" className="w-full p-2 font-semibold bg-gray-200 rounded hover:bg-black hover:text-white">
                    Submit & Continue
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
