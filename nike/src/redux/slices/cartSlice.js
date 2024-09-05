import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const api = process.env.REACT_APP_BASE_URL;

// Thunk to fetch cart data
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.get(`${api}/cart`, {
      headers: { accesstoken: token },
    });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

// Thunk to update cart item quantity
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ lineId, quantity }, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.put(`${api}/cart`, {
      lineId,
      quantity,
    }, {
      headers: { accesstoken: token, 'Content-Type': 'application/json' },
    });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

// Thunk to delete cart item
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (lineId, { rejectWithValue, getState }) => {
  const token = getState().auth.token;
  try {
    const response = await axios.delete(`${api}/cart?lineId=${lineId}`, {
      headers: { accesstoken: token },
    });
    return response.data.cart;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Cart updated successfully!');
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
        toast.success('Item removed successfully!');
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        toast.error(`Failed to update cart: ${action.payload}`);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        toast.error(`Failed to remove item: ${action.payload}`);
      });
  },
});

export default cartSlice.reducer;
