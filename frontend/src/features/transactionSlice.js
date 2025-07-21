import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { transactionService } from '../services/transactionService';

const oldData = JSON.parse(localStorage.getItem('transactionData'));
const initialState = oldData || {
    transactionId: '',
    quantity: 0,
    status: 'PENDING',
    createdAt: null,
    updatedAt: null,
};

export const registerTransaction = createAsyncThunk(
    'transaction/registerTransaction',
    async (payload) => { 
        const response = await transactionService.registerNewTransaction(payload);
        saveData(response);
        return response;
    }
);

export const updateTransactionStatus = createAsyncThunk(
    'transaction/updateTransactionStatus',
    async (payload) => { 
        const response = await transactionService.udpateTransactionStatus(payload);
        saveData(response);
        return response;
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        removeTransactionData: () => {
            localStorage.removeItem('transactionData');
            localStorage.clear();
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerTransaction.fulfilled, (state, action) => {
                saveData({ ...state, ...action.payload });
                return { ...state, ...action.payload };
            })
            .addCase(updateTransactionStatus.fulfilled, (state, action) => {
                saveData({ ...state, ...action.payload });
                return { ...state, ...action.payload };
            });
    },
});

const saveData = (state) => {
    const jsonData = JSON.stringify(state);
    localStorage.setItem('transactionData', jsonData);
}

export const { removeTransactionData } = transactionSlice.actions;
export default transactionSlice.reducer;
