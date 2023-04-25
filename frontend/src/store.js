import { configureStore } from "@reduxjs/toolkit";

import userDataReducer from "./Slices/usersSlice";
import productsReducer from './Slices/productsSlice';
import cartReducer from "./Slices/cartSlice";

const store = configureStore({
    reducer:{
        users: userDataReducer,
        products: productsReducer,
        cart: cartReducer
    }
}) 

export default store