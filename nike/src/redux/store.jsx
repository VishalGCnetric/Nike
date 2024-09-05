import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices'; // Adjust the path if necessary
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice"
// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    // Add other slices here if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to handle non-serializable data like errors
    }),
});

export default store;
