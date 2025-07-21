import axios from 'axios';


import { Transaction } from '../models/transaction';

class TransactionService {

    registerNewTransaction = async (transation) => { 
        const response = await axios.post('http://localhost:3030/transaction', transation);
        const data = new Transaction(response.data);
    
        return data;
    }
}

export const transactionService = new TransactionService();


