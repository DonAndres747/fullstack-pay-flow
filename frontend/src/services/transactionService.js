import axios from 'axios';

import { Transaction } from '../models/transaction';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class TransactionService {
    registerNewTransaction = async (transaction) => {
        const response = await axios.post(`${BASE_URL}/transaction`, transaction);
        const data = new Transaction(response.data);
        return data;
    }

    udpateTransactionStatus = async ({ transactionId, status }) => {
        const response = await axios.patch(`${BASE_URL}/transaction/${transactionId}/status`, { status });
        return response;
    }
}

export const transactionService = new TransactionService();