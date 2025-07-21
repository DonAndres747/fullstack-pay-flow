import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../services/productService';

export const getItems = createAsyncThunk(
    'products/getItems',
    async () => {
        const items = await productService.getItems();
        return items || [];
    }
); 

export const updateStock = createAsyncThunk(
    'products/updateStock',
    async (payload) => {
        const response = await productService.updateStock(payload);
        return response;
    }
);

export const ProductSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItems.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(updateStock.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                const index = state.findIndex(p => p.id === updatedProduct.id);
                if (index !== -1) {
                    state[index] = updatedProduct;
                }
            });
    },
});

export default ProductSlice.reducer;
