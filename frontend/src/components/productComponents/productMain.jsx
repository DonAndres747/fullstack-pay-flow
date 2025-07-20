import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductCard from './productCard/productCard';
import styles from './productMain.module.css'
import { resetCheckout } from '../../features/checkoutSlice'

const ProductMain = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        //we delete the information from the customer, order and billing everytime we charge main view
        //this to avoid the customer entering with the rows or by the url 
        dispatch(resetCheckout());
    }, [])

    return (
        <div className={styles.productBody}>
            <h1 className={styles.productsHeaders}> Available Products</h1>
            {
                products ? <div className={styles.productList}>
                    {
                        products.map((product) =>
                            < ProductCard key={product.id} product={product} />
                        )
                    }
                </div> :
                    <div className={styles.noDataFound}>
                        <SentimentDissatisfiedIcon fontSize="large" color="disabled" />
                        No products were found
                    </div>
            }
        </div>
    );
};

export default ProductMain;
