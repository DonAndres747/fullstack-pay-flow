import axios from 'axios';

import { Customer } from '../models/customer';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class CustomerService {
    getCustomerId = async (customer) => {
        const response = await axios.post(`${BASE_URL}/customer`, customer);
        const data = new Customer(response.data);
        return data;
    }
}

export const customerService = new CustomerService()