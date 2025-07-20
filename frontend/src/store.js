import { configureStore } from '@reduxjs/toolkit';

import productReducer from './features/productSlice'
import checkoutReducer from './features/checkoutSlice'


const store = configureStore({
    reducer: {
        products: productReducer,
        checkout: checkoutReducer,
    }
});

export default store;