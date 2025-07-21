import axios from 'axios';

import { Customer } from '../models/customer';

class CustomerService {

    getCustomerId = async (customer) => {
        const response = await axios.post('http://localhost:3030/customer', customer);
        const data = new Customer(response.data);

        return data;
    }
}

export const customerService = new CustomerService();


