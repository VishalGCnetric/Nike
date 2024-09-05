import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import Modal from './Modal'; // Your custom modal component
import { saveShippingAddress } from '../../redux/slices/checkoutSlice';
// import { saveShippingAddress } from '../features/checkoutSlice'; // Import your Redux action

const DeliveryInformation = () => {
    const dispatch = useDispatch();
    const { shippingAddress } = useSelector((state) => state.checkout); // Access shippingAddress from 
    const shipping=localStorage.getItem("shippingAddress");
console.log(shippingAddress)
    const [formData, setFormData] = useState(shipping || {
        firstName: shippingAddress?.firstName || '',
        lastName: shippingAddress?.lastName || '',
        landmark: shippingAddress?.landmark || '',
        streetLine1: shippingAddress?.streetLine1 || '',
        streetLine2: shippingAddress?.streetLine2 || '',
        city: shippingAddress?.city || '',
        postalCode: shippingAddress?.postalCode || '',
        state: shippingAddress?.state || '',
        countryCode: shippingAddress?.countryCode || '',
        phoneNumber: shippingAddress?.phoneNumber || ''
    } );

    const [isModalOpen, setModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(formData)); // Dispatch the updated form data to Redux
        setModalOpen(false); // Close the modal after submitting
    };

    return (
        <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
            <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Delivery</h4>
            <div className="flex justify-between items-center">
                <p className="text-zinc-800 dark:text-zinc-200">
                    {`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}
                </p>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    <AiOutlineEdit className="mr-1" /> Edit
                </button>
            </div>
            <p className="text-zinc-800 dark:text-zinc-200">{shippingAddress?.landmark}</p>
            <p className="text-zinc-800 dark:text-zinc-200">{`${shippingAddress?.streetLine1}, ${shippingAddress?.streetLine2}`}</p>
            <p className="text-zinc-800 dark:text-zinc-200">{`${shippingAddress?.city}, ${shippingAddress?.state} ${shippingAddress?.postalCode}`}</p>
            <p className="text-zinc-800 dark:text-zinc-200">{shippingAddress?.phoneNumber}</p>
            <p className="text-zinc-800 dark:text-zinc-200">{shippingAddress?.countryCode}</p>

            {/* Modal */}
            {isModalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <form onSubmit={handleSubmit} className="p-6 bg-white dark:bg-gray-800">
                        <h2 className="text-lg font-bold mb-4">Edit Delivery Information</h2>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Street Line 1</label>
                            <input
                                type="text"
                                name="streetLine1"
                                value={formData.streetLine1}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Street Line 2</label>
                            <input
                                type="text"
                                name="streetLine2"
                                value={formData.streetLine2}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Country Code</label>
                            <input
                                type="text"
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-zinc-800 dark:text-zinc-200">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Save
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default DeliveryInformation;
