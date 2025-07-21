import { useEffect, useState } from 'react'
import { Button, Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import getCardIcon from '../../utils/creditCardLogo'
import styles from './summaryMain.module.css'
import { useNavigate } from 'react-router-dom';
import { registerTransaction } from '../../features/transactionSlice'
import { setTransactionId, getCustomerId } from '../../features/checkoutSlice'

const SummaryMain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const checkout = useSelector((state) => state.checkout);

    const delivery = checkout.deliveryInfo;
    const product = checkout.product;
    const reqQty = checkout.reqQty;
    const cardDigits = checkout.cardLast4Digits;
    const cardType = checkout.cardType;

    useEffect(() => {
        if (!checkout.product || !checkout.deliveryInfo || !checkout.cardLast4Digits) {
            navigate('/');
        }
    }, []);

    async function confirmTransaction() {
        try {
            const customer = await dispatch(getCustomerId(delivery)).unwrap();
            const result = await dispatch(registerTransaction({
                quantity: 1,
                status: 'PENDING',
                product,
                customer
            })).unwrap();

            dispatch(setTransactionId(result.transactionId));

            alert("Your purchase was successful!")
        } catch (error) {
            console.log("error", error);
            alert("Something went wrong :(")
        }
    }

    return (
        (checkout.product || checkout.delivery || checkout.cardDigits) ? <div className={styles.summary}>
            <div className={styles.summarTittle}>
                <h1>Order Summary</h1>
            </div>
            <img alt='summary' className={styles.progressImg} src='/summary.png' />
            <hr />
            <div className={styles.summaryBody}>
                <div className={styles.summaryBodyDetails}>
                    <h3>Shipping to</h3>
                    <p><span>Customer Name:</span> <span>{delivery.name}</span></p>
                    <p><span>Address:</span> <span>{delivery.address}</span></p>
                    <p><span>Teléfono:</span> <span>{delivery.phone}</span></p>
                </div>
                <div className={styles.summaryBodyDetails}>
                    <h3>Product details</h3>
                    <p><span>Product Name:</span> <span>{product.name}</span></p>
                    <p><span>Description:</span> <span>{product.description}</span></p>
                    <p><span>price:</span> <span>{product.price}</span></p>
                    <p><span>Quantity:</span> <span>{reqQty}</span></p>
                </div>
                <div className={styles.summaryBodyDetails}>
                    <h3>Billing summary</h3>
                    <p><span>Card number:</span>
                        <span >
                            <span className={styles.hiddenNumbers}>**** **** ****</span>
                            {cardDigits}
                        </span>
                        <span>{getCardIcon(cardType)}</span></p>
                    <p><span>total:</span> <span>{product.price * reqQty}</span></p>
                </div>
            </div>
            <hr />
            <div className={styles.summaryFootter}>
                <Button
                    size='small'
                    variant='outlined'
                    sx={{
                        borderColor: '#117707',
                        color: '#117707',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        '&:disabled': {
                            backgroundColor: '#aaa',
                            color: 'white',
                        }
                    }}
                    onClick={() => navigate('/')}
                >
                    Cancel
                </Button>
                <Button
                    size='small'
                    variant='contained'
                    sx={{
                        backgroundColor: '#2c2a29',
                        color: '#cbe85d',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        '&:disabled': {
                            backgroundColor: '#aaa',
                            color: 'white',
                        }
                    }}
                    onClick={() => confirmTransaction()}
                >
                    Complete purchase
                </Button>
            </div>
        </div > :
            <div>No information retrieve</div>
    )
}

export default SummaryMain;