import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../../redux/slices/checkoutSlice'; // Import the Redux action
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        landmark: '',
        streetLine1: '',
        streetLine2: '',
        city: '',
        postalCode: '',
        state: '',
        country: 'US',
        phoneNumber: '',
    });
const navigate=useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData)); // Dispatch the form data to Redux
        localStorage.setItem("shippingAddress",formData)
        navigate("checkout/shipping")
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-card rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Enter your shipping address:</h2>
            <form onSubmit={handleSubmit}>
                {/* Form inputs */}
                {Object.keys(formData).map((key) => (
                    <div key={key} className="block mb-2">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <input
                            type="text"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md p-2 border border-border"
                            required={key !== 'streetLine2'}
                        />
                    </div>
                ))}
                <button type="submit" className="w-full p-2 font-semibold bg-gray-200 rounded hover:bg-black hover:text-white">
                    Submit & Continue
                </button>
            </form>
            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">shipping</h4>
            {/* <p className={sharedClasses.textZinc}>Your payment information goes here.</p> */}
        </div>
            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Billing</h4>
            {/* <p className={sharedClasses.textZinc}>Your payment information goes here.</p> */}
        </div>
            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Payment</h4>
            {/* <p className={sharedClasses.textZinc}>Your payment information goes here.</p> */}
        </div>
        </div>
    );
};

export default AddressForm;
