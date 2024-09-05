import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous action to handle the checkout API request
export const initiateCheckout = (cartId, shippingAddress) => async (dispatch) => {
    try {
        const response = await axios.post('http://106.51.242.196:50102/checkout', {
            cartId,
            shippingAddress,
        }, {
            headers: {
                accesstoken: 'your-token', // Replace with your actual token
                'Content-Type': 'application/json',
            },
        });

        const { orderId, expectedDelivery } = response.data;
        // Dispatching success action to save orderId and expectedDelivery
        dispatch(setCheckoutSuccess({ orderId, expectedDelivery }));
    } catch (error) {
        console.error('Checkout failed:', error);
    }
};

// Checkout slice definition
export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        shippingAddress: {},
        orderId: null,
        expectedDelivery: null,
    },
    reducers: {
        // Action to save shipping address in the state
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        // Action to set order ID and expected delivery after successful checkout
        setCheckoutSuccess: (state, action) => {
            state.orderId = action.payload.orderId;
            state.expectedDelivery = action.payload.expectedDelivery;
        },
    },
});

// Exporting the actions and the reducer
export const { saveShippingAddress, setCheckoutSuccess } = checkoutSlice.actions;
export default checkoutSlice.reducer;
