import { configureStore } from '@reduxjs/toolkit';

import productReducer from './features/productSlice'
import checkoutReducer from './features/checkoutSlice'
import transactionReducer from './features/transactionSlice'


const store = configureStore({
    reducer: {
        products: productReducer,
        checkout: checkoutReducer,
        transaction: transactionReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ 
            serializableCheck: false,
        }),
});

export default store;