
import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counter";
import authSlice from "./auth";
import cartSlice from "./cart";

const store = configureStore({
    reducer:{
        counter:counterSlice,
        auth:authSlice , 
        cart:cartSlice
    }
});



export default store;