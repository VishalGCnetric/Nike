import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const CheckoutSuccessModal = ({ isVisible, onClose }) => {
    const { orderId, expectedDelivery } = useSelector((state) => state.checkout);

    if (!isVisible || !orderId) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-semibold text-green-600">Checkout Successful!</h2>
                <p>Your order ID is: <strong>{orderId}</strong></p>
                <p>Expected delivery: <strong>{expectedDelivery}</strong></p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Close</button>
            </motion.div>
        </div>
    );
};

export default CheckoutSuccessModal;
