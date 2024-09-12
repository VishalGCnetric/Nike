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
        let shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')|| {}) ; // Get shipping address from localStorage
        const dealerData = JSON.parse(localStorage.getItem('dealerData')); // Get shipping address from localStorage

        const cartId = JSON.parse(localStorage.getItem('cartId')); // Get shipping address from localStorage
        // if (!cartId || !shippingAddress) {
        //     console.log('Cart ID or shipping address is missing');
        //     return;
        // }
        if(shippingAddress==null){
            shippingAddress={};
        }
        let data;
       if(dealerData){
         data = JSON.stringify({
            cartId,
            shippingAddress,
            dealer:dealerData.dealer
        });
       }else{
         data = JSON.stringify({
            cartId,
            shippingAddress,
        });
       }
       
console.log(data)
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

            <div className="mt-6 border-t border-zinc-300 dark:border-zinc-600 pt-4">
                <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200">Payment</h4>
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
