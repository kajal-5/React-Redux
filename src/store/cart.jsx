// // store/cart.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'https://crudcrud.com/api/ab015522d8c0447bac3114150791a023/cart';

// const initialState = {
//   isVisible: false,
//   items: [],
//   status: null,
// };

// export const fetchCartFromAPI = createAsyncThunk(
//   'cart/fetchCartFromAPI',
//   async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
//   }
// );

// export const addItemToAPI = createAsyncThunk(
//   'cart/addItemToAPI',
//   async (item, { getState, dispatch }) => {
//     const { cart } = getState();
    
//     const existing = cart.items.find(i => i.name === item.name);

//     if (existing) {
//       const updatedItem = {
//         name: existing.name,
//         quantity: existing.quantity + item.quantity,
//         price: existing.price + item.price,
//       };
//       await dispatch(updateItemQuantityAPI({ _id: existing._id, updatedItem }));
//       return null;
//     } else {
//       const response = await axios.post(API_URL, item);
//       return response.data;
//     }
//   }
// );

// export const updateItemQuantityAPI = createAsyncThunk(
//   'cart/updateItemQuantityAPI',
//   async ({ _id, updatedItem }) => {
//     await axios.put(`${API_URL}/${_id}`, updatedItem);
//     return { _id, updatedItem };
//   }
// );

// export const deleteItemFromAPI = createAsyncThunk(
//   'cart/deleteItemFromAPI',
//   async (_id) => {
//     await axios.delete(`${API_URL}/${_id}`);
//     return _id;
//   }
// );

// export const increaseCartItem = createAsyncThunk(
//   'cart/increaseCartItem',
//   async (item, { dispatch }) => {
//     const unitPrice = Math.floor(item.price / item.quantity) || 0;
//     const updatedItem = {
//       name: item.name,
//       quantity: item.quantity + 1,
//       price: parseFloat((item.price + unitPrice).toFixed(2)),
//     };
//     await dispatch(updateItemQuantityAPI({ _id: item._id, updatedItem }));
//   }
// );

// export const decreaseCartItem = createAsyncThunk(
//   'cart/decreaseCartItem',
//   async (item, { dispatch }) => {
//     if (item.quantity === 1) {
//       await dispatch(deleteItemFromAPI(item._id));
//     } else {
//       const unitPrice = Math.floor(item.price / item.quantity) || 0;
//       const updatedItem = {
//         name: item.name,
//         quantity: item.quantity - 1,
//         price: parseFloat((item.price - unitPrice).toFixed(2)),
//       };
//       await dispatch(updateItemQuantityAPI({ _id: item._id, updatedItem }));
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     toggleCart(state) {
//       state.isVisible = !state.isVisible;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartFromAPI.pending, (state) => {
//         state.status = 'pending';
//       })
//       .addCase(fetchCartFromAPI.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.status = 'success';
//       })
//       .addCase(fetchCartFromAPI.rejected, (state) => {
//         state.status = 'error';
//       })

//       .addCase(addItemToAPI.pending, (state) => {
//         state.status = 'pending';
//       })
//       .addCase(addItemToAPI.fulfilled, (state, action) => {
//         const newItem = action.payload;
//         const existing = state.items.find(i => i.name === newItem.name);
//         if (existing) {
//           existing.quantity += newItem.quantity;
//           existing.price += newItem.price;
//         } else {
//           state.items.push(newItem);
//         }
//         state.status = 'success';
//       })
//       .addCase(addItemToAPI.rejected, (state) => {
//         state.status = 'error';
//       })

//       .addCase(updateItemQuantityAPI.fulfilled, (state, action) => {
//         const { _id, updatedItem } = action.payload;
//         const index = state.items.findIndex(item => item._id === _id);
//         if (index !== -1) {
//           state.items[index] = { _id, ...updatedItem };
//         }
//       })

//       .addCase(deleteItemFromAPI.fulfilled, (state, action) => {
//         const _id = action.payload;
//         state.items = state.items.filter(item => item._id !== _id);
//       });
//   }
// });

// export const { toggleCart } = cartSlice.actions;

// export default cartSlice.reducer;

// store/cart.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const FIREBASE_URL = 'https://daily-expenses-app-53b16-default-rtdb.firebaseio.com';

const initialState = {
  isVisible: false,
  items: [],
  status: null,
};

export const fetchCartFromAPI = createAsyncThunk(
  'cart/fetchCartFromAPI',
  async (_, { getState }) => {
    const email = getState().auth.email?.replace(/\./g, '_');
    if (!email) return [];
    const response = await axios.get(`${FIREBASE_URL}/carts/${email}.json`);
    return response.data ? Object.entries(response.data).map(([id, item]) => ({ id, ...item })) : [];
  }
);

export const addItemToAPI = createAsyncThunk(
  'cart/addItemToAPI',
  async (item, { getState, dispatch }) => {
    const email = getState().auth.email?.replace(/\./g, '_');
    if (!email) return;

    const { cart } = getState();
    const existing = cart.items.find(i => i.name === item.name);

    if (existing) {
      const updatedItem = {
        name: existing.name,
        quantity: existing.quantity + item.quantity,
        price: existing.price + item.price,
      };
      await dispatch(updateItemQuantityAPI({ id: existing.id, updatedItem }));
    } else {
      await axios.post(`${FIREBASE_URL}/carts/${email}.json`, item);
    }

    // Refresh cart after adding
    dispatch(fetchCartFromAPI());
  }
);

export const updateItemQuantityAPI = createAsyncThunk(
  'cart/updateItemQuantityAPI',
  async ({ id, updatedItem }, { getState }) => {
    const email = getState().auth.email?.replace(/\./g, '_');
    if (!email) return;
    await axios.put(`${FIREBASE_URL}/carts/${email}/${id}.json`, updatedItem);
    return { id, updatedItem };
  }
);

export const deleteItemFromAPI = createAsyncThunk(
  'cart/deleteItemFromAPI',
  async (id, { getState }) => {
    const email = getState().auth.email?.replace(/\./g, '_');
    if (!email) return;
    await axios.delete(`${FIREBASE_URL}/carts/${email}/${id}.json`);
    return id;
  }
);

export const increaseCartItem = createAsyncThunk(
  'cart/increaseCartItem',
  async (item, { dispatch }) => {
    const unitPrice = Math.floor(item.price / item.quantity) || 0;
    const updatedItem = {
      name: item.name,
      quantity: item.quantity + 1,
      price: parseFloat((item.price).toFixed(2)),
      // price: parseFloat((item.price + unitPrice).toFixed(2)),
    };
    await dispatch(updateItemQuantityAPI({ id: item.id, updatedItem }));
    dispatch(fetchCartFromAPI());
  }
);

export const decreaseCartItem = createAsyncThunk(
  'cart/decreaseCartItem',
  async (item, { dispatch }) => {
    if (item.quantity === 1) {
      await dispatch(deleteItemFromAPI(item.id));
    } else {
      const unitPrice = Math.floor(item.price / item.quantity) || 0;
      const updatedItem = {
        name: item.name,
        quantity: item.quantity - 1,
        price: parseFloat((item.price - unitPrice).toFixed(2)),
      };
      await dispatch(updateItemQuantityAPI({ id: item.id, updatedItem }));
    }
    dispatch(fetchCartFromAPI());
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
        state.items = action.payload || [];
        state.status = 'success';
      })
      .addCase(fetchCartFromAPI.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateItemQuantityAPI.fulfilled, (state, action) => {
        const { id, updatedItem } = action.payload;
        const index = state.items.findIndex(item => item.id === id);
        if (index !== -1) {
          state.items[index] = { id, ...updatedItem };
        }
      })
      .addCase(deleteItemFromAPI.fulfilled, (state, action) => {
        const id = action.payload;
        state.items = state.items.filter(item => item.id !== id);
      });
  }
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;

