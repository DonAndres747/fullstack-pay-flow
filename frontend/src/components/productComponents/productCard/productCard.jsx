import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import CreditCardModal from '../../modals/creditCardModal';
import styles from './productCard.module.css';
import { setDeliveryInfo, setCardLast4Digits, setProduct, setCardType, setReqQty } from '../../../features/checkoutSlice'

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [reqQty, setReqQtity] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);

    function handleReqQty() {
        const newQty = reqQty <= product.stock ? reqQty : product.stock;
        setReqQtity(newQty);
    }

    function handleBuy() {
        if (reqQty < 1 || reqQty > product.stock) {
            alert('Invalid quantity')
            return;
        }

        setModalOpen(true);
    }

    function handlePay(deliveryDat, lastFour, cardType) {
        dispatch(setDeliveryInfo({
            ...deliveryDat
        }));
        dispatch(setCardLast4Digits(lastFour));
        dispatch(setCardType(cardType));
        dispatch(setProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        }));
        dispatch(setReqQty(reqQty));

        setModalOpen(false);
        navigate(`/pay/${product.id}`);
    }

    return (
        <Card className={styles.card}
            sx={{
                backgroundColor: '#f2fdf1',
                borderRadius: '16px'
            }}>
            <CardContent className={styles.cardContent}>
                <div className={styles.iconPlaceholder}>
                    <Inventory2OutlinedIcon fontSize='large' />
                </div>

                <div className={styles.info}>
                    <div className={styles.name}>{product.name}</div>
                    <div className={styles.informationText}>{product.description}</div>
                    <div className={styles.informationText}>{product.price}</div>
                    <div className={styles.stock}>
                        Cantidad:
                        <div className={product.stock <= 0 ? styles.noStock : null}> {product.stock}</div>
                    </div>
                </div>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <input type='number' min={1} max={product.stock}
                    value={reqQty}
                    onChange={(e) => setReqQtity(e.target.value)}
                    onBlur={() => handleReqQty()}
                    className={styles.reqQty}
                    disabled={product.stock === 0}
                />

                <Button
                    size='small'
                    variant='contained'
                    disabled={product.stock === 0}
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
                    onClick={() => handleBuy()}
                >
                    {product.stock === 0 ? 'out of stock' : 'Pay with credit card'}
                </Button>
            </CardActions>

            {/* MODAL */}
            <CreditCardModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onComplete={(deliveryDat, lastFour, cardType) => handlePay(deliveryDat, lastFour, cardType)}
            />
        </Card >
    );
};

export default ProductCard;
