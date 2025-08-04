// store/cart.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://crudcrud.com/api/ab015522d8c0447bac3114150791a023/cart';

const initialState = {
  isVisible: false,
  items: [],
  status: null,
};

export const fetchCartFromAPI = createAsyncThunk(
  'cart/fetchCartFromAPI',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addItemToAPI = createAsyncThunk(
  'cart/addItemToAPI',
  async (item, { getState, dispatch }) => {
    const { cart } = getState();
    
    const existing = cart.items.find(i => i.name === item.name);

    if (existing) {
      const updatedItem = {
        name: existing.name,
        quantity: existing.quantity + item.quantity,
        price: existing.price + item.price,
      };
      await dispatch(updateItemQuantityAPI({ _id: existing._id, updatedItem }));
      return null;
    } else {
      const response = await axios.post(API_URL, item);
      return response.data;
    }
  }
);

export const updateItemQuantityAPI = createAsyncThunk(
  'cart/updateItemQuantityAPI',
  async ({ _id, updatedItem }) => {
    await axios.put(`${API_URL}/${_id}`, updatedItem);
    return { _id, updatedItem };
  }
);

export const deleteItemFromAPI = createAsyncThunk(
  'cart/deleteItemFromAPI',
  async (_id) => {
    await axios.delete(`${API_URL}/${_id}`);
    return _id;
  }
);

export const increaseCartItem = createAsyncThunk(
  'cart/increaseCartItem',
  async (item, { dispatch }) => {
    const unitPrice = Math.floor(item.price / item.quantity) || 0;
    const updatedItem = {
      name: item.name,
      quantity: item.quantity + 1,
      price: parseFloat((item.price + unitPrice).toFixed(2)),
    };
    await dispatch(updateItemQuantityAPI({ _id: item._id, updatedItem }));
  }
);

export const decreaseCartItem = createAsyncThunk(
  'cart/decreaseCartItem',
  async (item, { dispatch }) => {
    if (item.quantity === 1) {
      await dispatch(deleteItemFromAPI(item._id));
    } else {
      const unitPrice = Math.floor(item.price / item.quantity) || 0;
      const updatedItem = {
        name: item.name,
        quantity: item.quantity - 1,
        price: parseFloat((item.price - unitPrice).toFixed(2)),
      };
      await dispatch(updateItemQuantityAPI({ _id: item._id, updatedItem }));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromAPI.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCartFromAPI.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchCartFromAPI.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(addItemToAPI.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addItemToAPI.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existing = state.items.find(i => i.name === newItem.name);
        if (existing) {
          existing.quantity += newItem.quantity;
          existing.price += newItem.price;
        } else {
          state.items.push(newItem);
        }
        state.status = 'success';
      })
      .addCase(addItemToAPI.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(updateItemQuantityAPI.fulfilled, (state, action) => {
        const { _id, updatedItem } = action.payload;
        const index = state.items.findIndex(item => item._id === _id);
        if (index !== -1) {
          state.items[index] = { _id, ...updatedItem };
        }
      })

      .addCase(deleteItemFromAPI.fulfilled, (state, action) => {
        const _id = action.payload;
        state.items = state.items.filter(item => item._id !== _id);
      });
  }
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
