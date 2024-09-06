import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation
import CheckoutSuccessModal from './CheckoutSuccessModel';

const INPUT_CLASS = 'input mb-4';
const TEXT_CLASS = 'text-lg font-semibold';
const TEXT_MUTED_CLASS = 'text-muted-foreground';

const PaymentForm = () => {
    // const cartId = useSelector((state) => state.cart.id); // Get cartId from Redux state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isModalVisible, setModalVisible] = useState(false);
    const [datas ,setData]=useState(null)

    const handlePlaceOrder = () => {
        const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')); // Get shipping address from localStorage
        const cartId = JSON.parse(localStorage.getItem('cartId')); // Get shipping address from localStorage
        if (!cartId || !shippingAddress) {
            console.log('Cart ID or shipping address is missing');
            return;
        }

        const data = JSON.stringify({
            cartId,
            shippingAddress
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/checkout`,
            headers: {
                'accesstoken': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const { orderId, expectedDelivery } = response.data;
                // Option 1: Update Redux store (Assuming you have a checkout slice)
                dispatch({ type: 'checkout/setCheckoutDetails', payload: { orderId, expectedDelivery } });
setData( { orderId, expectedDelivery })
                // Option 2: Use local state for simpler cases
                setModalVisible(true);

                // Optionally, you can also clear the cart here or update any other state
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        navigate('/'); // Redirect to home page
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow-md">
            <h2 className={TEXT_CLASS}>Have a promo code?</h2>
            <input type="text" placeholder="Promo" className={INPUT_CLASS} />

            <h2 className={TEXT_CLASS}>How would you like to pay?</h2>
            <div className="flex items-center mb-4">
                <input 
                    type="radio" 
                    id="card" 
                    name="payment-method" 
                    className="mr-2" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')} 
                />
                <label htmlFor="card" className={TEXT_MUTED_CLASS}>Credit or Debit Card</label>
            </div>
            <div className="flex items-center mb-4">
                <input 
                    type="radio" 
                    id="paypal" 
                    name="payment-method" 
                    className="mr-2" 
                    checked={paymentMethod === 'paypal'} 
                    onChange={() => setPaymentMethod('paypal')} 
                />
                <label htmlFor="paypal" className={TEXT_MUTED_CLASS}>PayPal</label>
            </div>

            <h2 className={TEXT_CLASS}>Enter your payment details:</h2>
            <input type="text" placeholder="Name on card" className={INPUT_CLASS} />
            <input type="text" placeholder="Card number" className={INPUT_CLASS} />
            <div className="flex mb-4">
                <input type="text" placeholder="MM/YY" className="input w-1/2 mr-2" />
                <input type="text" placeholder="CVV" className="input w-1/2" />
            </div>

            <p className="text-xs text-muted-foreground mb-4">
                By clicking Place Order, you agree to the <a href="#" className="text-primary">Terms and Conditions</a>.
            </p>

            <button 
                onClick={handlePlaceOrder} 
                className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
>
                Place Order
            </button>

            <div className="mt-6">
                <h2 className={TEXT_CLASS}>Shipping</h2>
                <span className={TEXT_MUTED_CLASS}>₹ 2,240.00 Shipping</span>
                <span className={TEXT_MUTED_CLASS}>Shipper Name</span>
                <span className={TEXT_MUTED_CLASS}>Arrives Tue, 13 Aug - Fri, 16 Aug</span>

                <h2 className={TEXT_CLASS}>Billing</h2>
                <div className="flex justify-between items-center">
                    <span className={TEXT_MUTED_CLASS}>Velvet Girl</span>
                    <button className="text-primary">Edit</button>
                </div>
                <span className={TEXT_MUTED_CLASS}>12, Past St.</span>
                <span className={TEXT_MUTED_CLASS}>09/07/21 17:35</span>

                <h2 className={TEXT_CLASS}>Payment</h2>
                <span className={TEXT_MUTED_CLASS}>₹ 2,240.00</span>
            </div>

            <CheckoutSuccessModal 
                isVisible={isModalVisible} 
                onClose={handleCloseModal} 
                orderId={datas?.orderId}
                expectedDelivery={datas?.expectedDelivery}

            />
        </div>
    );
};

export default PaymentForm;
