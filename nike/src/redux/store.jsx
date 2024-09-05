import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices'; // Adjust the path if necessary


// Create the store
const store = configureStore({
  reducer: {
    auth: authReducer,
   
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to handle non-serializable data like errors
    }),
});

export default store;
