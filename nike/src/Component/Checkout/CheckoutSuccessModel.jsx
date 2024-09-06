import React from 'react';
import { motion } from 'framer-motion';

const CheckoutSuccessModal = ({ isVisible, onClose, orderId, expectedDelivery }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            >
                <h2 className="text-2xl font-semibold text-green-600">Checkout Successful!</h2>
                <p className="mt-4">Your order has been placed successfully.</p>
                <p className="mt-2">Order ID: <strong>{orderId}</strong></p>
                <p className="mt-2">Expected Delivery: <strong>{expectedDelivery}</strong></p>

                <button 
                    onClick={onClose} 
                    className="mt-6 px-4 py-2 bg-black-500 text-white rounded-lg w-full hover:bg-blue-600"
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default CheckoutSuccessModal;
