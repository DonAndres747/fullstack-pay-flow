import { createSlice } from '@reduxjs/toolkit';

import { productService } from '../services/productService';


const initialState = await productService.getItems() || [];

export const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        buyProduct: (state, action) => {
            const { id, qty } = action.payload;
            const product = state.find((prod) => prod.id === id);

            if (product && product.stock >= qty) {
                product.stock -= qty;
            }
        }
    }
})

export const { buyProduct } = ProductSlice.actions;
export default ProductSlice.reducer;