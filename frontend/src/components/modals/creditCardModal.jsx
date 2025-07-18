import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

import styles from './creditCardModal.module.css'

import creditCardFormModel from './creditCardFormModel';
import { validateCardForm, getCardType } from '../../utils/creditCardValidator';

const CreditCardModal = ({ open, onClose, onComplete }) => {
    const [form, setForm] = useState(creditCardFormModel);
    const [errors, setErrors] = useState({});
    const [cardType, setCardType] = useState('unknown');

    function handleChange(e) {
        const { name, value } = e.target;
        const newForm = { ...form, [name]: value }

        if (name === 'cardNumber') {
            const type = getCardType(value);
            setCardType(type);
        }

        setForm(newForm);
    }

    function handleSubmit() {
        const validationErrors = validateCardForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onComplete();
        }
    }

    function getCardIcon() {
        if (cardType === 'visa') return <img src="/visa.png" alt="Visa" height={24} />;
        if (cardType === 'mastercard') return <img src="/mastercard.png" alt="MasterCard" height={24} />;
        return <CreditCardOutlinedIcon />;
    }

    return (
        <Dialog open={open}
            onClose={onClose}
            maxWidth='sm'
            fullWidth>
            <DialogTitle
                sx={{
                    backgroundColor: '#f2fdf1',
                    color: '#117707'
                }}
            >Credit Card Payment</DialogTitle>
            <DialogContent
                sx={{ backgroundColor: '#f2fdf1' }}
                dividers >
                <TextField
                    name="name"
                    label="Cardholder Name"
                    fullWidth
                    margin="normal"
                    value={form.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    className={styles.input}
                />
                <TextField
                    name="cardNumber"
                    label="Card Number"
                    fullWidth
                    margin="normal"
                    value={form.cardNumber}
                    onChange={handleChange}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    className={styles.input}
                    InputProps={{
                        endAdornment: getCardIcon(),
                    }}
                />
                <TextField
                    name="expDate"
                    label="Expiration Date (MM/YY)"
                    fullWidth
                    margin="normal"
                    value={form.expDate}
                    onChange={handleChange}
                    error={!!errors.expDate}
                    helperText={errors.expDate}
                    className={styles.input}
                />
                <TextField
                    name="cvv"
                    label="CVV"
                    fullWidth
                    margin="normal"
                    value={form.cvv}
                    onChange={handleChange}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    className={styles.input}
                />
                <hr />
                <TextField
                    name="deliveryName"
                    label="Delivery Name"
                    fullWidth
                    margin="normal"
                    value={form.deliveryName}
                    onChange={handleChange}
                    error={!!errors.deliveryName}
                    helperText={errors.deliveryName}
                    className={styles.input}
                />
                <TextField
                    name="deliveryAddress"
                    label="Delivery Address"
                    fullWidth
                    margin="normal"
                    value={form.deliveryAddress}
                    onChange={handleChange}
                    error={!!errors.deliveryAddress}
                    helperText={errors.deliveryAddress}
                    className={styles.input}
                />
                <TextField
                    name="deliveryPhone"
                    label="Delivery Phone"
                    fullWidth
                    margin="normal"
                    value={form.deliveryPhone}
                    onChange={handleChange}
                    error={!!errors.deliveryPhone}
                    helperText={errors.deliveryPhone}
                    className={styles.input}
                />
            </DialogContent>
            <DialogActions
                sx={{ backgroundColor: '#f2fdf1' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Pay
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default CreditCardModal;