import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductCard from './productCard/productCard';
import styles from './productMain.module.css'
import { getItems } from '../../features/productSlice';
import { resetCheckout } from '../../features/checkoutSlice'

const ProductMain = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(resetCheckout());
        dispatch(getItems());
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
