import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, name: 'Product 1', description: 'This is product number 1', stock: 15 },
  { id: 2, name: 'Product 2', description: 'This is product number 2', stock: 21 },
  { id: 3, name: 'Product 3', description: 'This is product number 3', stock: 10 },
  { id: 4, name: 'Product 4', description: 'This is product number 4', stock: 0 },
  { id: 5, name: 'Product 5', description: 'This is product number 5', stock: 12 },
  { id: 6, name: 'Product 6', description: 'This is product number 6', stock: 7 },
  { id: 7, name: 'Product 7', description: 'This is product number 7', stock: 18 },
  { id: 8, name: 'Product 8', description: 'This is product number 8', stock: 4 },
  { id: 9, name: 'Product 9', description: 'This is product number 9', stock: 16 },
  { id: 10, name: 'Product 10', description: 'This is product number 10', stock: 10 },
  { id: 11, name: 'Product 11', description: 'This is product number 11', stock: 5 },
  { id: 12, name: 'Product 12', description: 'This is product number 12', stock: 9 },
  { id: 13, name: 'Product 13', description: 'This is product number 13', stock: 11 },
  { id: 14, name: 'Product 14', description: 'This is product number 14', stock: 14 },
  { id: 15, name: 'Product 15', description: 'This is product number 15', stock: 3 },
  { id: 16, name: 'Product 16', description: 'This is product number 16', stock: 17 },
  { id: 17, name: 'Product 17', description: 'This is product number 17', stock: 6 },
  { id: 18, name: 'Product 18', description: 'This is product number 18', stock: 2 },
  { id: 19, name: 'Product 19', description: 'This is product number 19', stock: 13 },
  { id: 20, name: 'Product 20', description: 'This is product number 20', stock: 8 },
  { id: 21, name: 'Product 21', description: 'This is product number 21', stock: 1 },
  { id: 22, name: 'Product 22', description: 'This is product number 22', stock: 19 },
  { id: 23, name: 'Product 23', description: 'This is product number 23', stock: 6 },
  { id: 24, name: 'Product 24', description: 'This is product number 24', stock: 10 },
  { id: 25, name: 'Product 25', description: 'This is product number 25', stock: 7 },
  { id: 26, name: 'Product 26', description: 'This is product number 26', stock: 3 },
  { id: 27, name: 'Product 27', description: 'This is product number 27', stock: 11 },
  { id: 28, name: 'Product 28', description: 'This is product number 28', stock: 20 },
  { id: 29, name: 'Product 29', description: 'This is product number 29', stock: 5 },
  { id: 30, name: 'Product 30', description: 'This is product number 30', stock: 9 },
  { id: 31, name: 'Product 31', description: 'This is product number 31', stock: 13 },
  { id: 32, name: 'Product 32', description: 'This is product number 32', stock: 2 },
  { id: 33, name: 'Product 33', description: 'This is product number 33', stock: 8 },
  { id: 34, name: 'Product 34', description: 'This is product number 34', stock: 0 },
  { id: 35, name: 'Product 35', description: 'This is product number 35', stock: 17 },
  { id: 36, name: 'Product 36', description: 'This is product number 36', stock: 12 }
];


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