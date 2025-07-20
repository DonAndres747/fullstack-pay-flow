import axios from 'axios';

import { Product } from '../models/product';

class ProductService {

    getItems = async () => {
        const response = await axios.get('http://localhost:3030/products');
        return response.data.map(item => new Product(item));
    }
}

export const productService = new ProductService();


