import React from 'react';
import { useSelector } from 'react-redux';

import ProductCard from './productCard/productCard';
import styles from './productMain.module.css'

const ProductMain = () => {
    const products = useSelector((state) => state.products);

    return (
        <div className={styles.productBody}>
            <h1>Available Products</h1>
            <div className={styles.productList}>
                {
                    products.map((product) =>
                        < ProductCard key={product.id} product={product} />
                    )
                }
            </div>
        </div>
    );
};

export default ProductMain;
