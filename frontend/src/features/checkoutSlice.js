import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { customerService } from '../services/customerService';

const oldData = JSON.parse(localStorage.getItem('jsonData'));
const initialState = {
    deliveryInfo: {
        id: '',
        name: '',
        address: '',
        phone: '',
    },
    product: null,
    reqQty: 0,
    cardLast4Digits: '',
    cardType: '',
    transactionId: null,
};

export const getCustomerId = createAsyncThunk(
    'checkuot/customerId',
    async (payload) => {
        const response = await customerService.getCustomerId(payload);
        return response;
    }
);

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: oldData || initialState,
    reducers: {
        setDeliveryInfo(state, action) {
            state.deliveryInfo = action.payload;
            saveData(state);
        },
        setProduct(state, action) {
            state.product = action.payload;
            saveData(state);
        },
        setReqQty(state, action) {
            state.reqQty = action.payload;
            saveData(state);
        },
        setCardLast4Digits(state, action) {
            state.cardLast4Digits = action.payload;
            saveData(state);
        },
        setCardType(state, action) {
            state.cardType = action.payload;
            saveData(state);
        },
        setTransactionId(state, action) {
            state.transactionId = action.payload;
            saveData(state);
        },
        resetCheckout(state) {
            localStorage.removeItem('jsonData');
            localStorage.clear();
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerId.fulfilled, (state, action) => {
                state.deliveryInfo.id = action.payload.id;

                saveData(state);
            })
    },
});

const saveData = (state) => {
    const jsonData = JSON.stringify(state);
    localStorage.setItem('jsonData', jsonData);
}

export const {
    setDeliveryInfo,
    setProduct,
    setReqQty,
    setCardLast4Digits,
    setCardType,
    setTransactionId,
    resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
