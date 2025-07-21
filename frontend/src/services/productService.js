import axios from 'axios';

import { Product } from '../models/product';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class ProductService {
    getItems = async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data.map(item => new Product(item));
    }

    updateStock = async ({ id, reqQty }) => {
        const response = await axios.patch(`${BASE_URL}/products/${id}/qty`, { reqQty });
        return response;
    }
}

export const productService = new ProductService();