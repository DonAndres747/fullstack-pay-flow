import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';

import creditCardFormModel from './creditCardFormModel';
import getCardIcon from '../../utils/creditCardLogo';
import styles from './creditCardModal.module.css'
import { validateCardForm, getCardType } from '../../utils/creditCardValidator';
import { handleTokenize, setCardToken } from '../../features/checkoutSlice';


const CreditCardModal = ({ open, onClose, onComplete }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState(creditCardFormModel);
    const [errors, setErrors] = useState({});
    const [cardType, setCardType] = useState('unknown');

    function handleChange(e) {
        const { name, value } = e.target;
        let newForm = { ...form, [name]: value }

        if (name === 'cardNumber') {
            const type = getCardType(value);
            setCardType(type);

            const formattedValue = value
                .replace(/\D/g, '')
                .replace(/(.{4})(?=.)/g, '$1 ')
                .slice(0, 19);

            newForm = {
                ...form, [name]: formattedValue.trim()
            }
        } else if (name === 'expDate') {
            const formattedValue = value
                .replace(/\D/g, '')
                .slice(0, 4)
                .replace(/(.{2})(?=.)/g, '$1/');

            newForm = {
                ...form, [name]: formattedValue
            }
        } else if (name === 'cvv') {
            newForm[name] = value.slice(0, 3);
        }

        setForm(newForm);
    }

    function lastFourData() {
        return form.cardNumber.slice(form.cardNumber.length - 5, form.cardNumber.length);
    }

    function handleSubmit() {
        const validationErrors = validateCardForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            dispatch(handleTokenize({
                name: form.name,
                cardNumber: form.cardNumber.replaceAll(' ', ''),
                cvv: form.cvv,
                expDate: form.expDate
            }))

            const lastFour = lastFourData()
            onComplete(
                {
                    name: form.deliveryName,
                    email: form.deliveryEmailAddress,
                    cc: form.cc,
                    address: form.deliveryAddress,
                    phone: form.deliveryPhone
                }, lastFour, cardType);
        }
    }

    return (
        <Dialog open={open}
            onClose={onClose}
            maxWidth='sm'
            fullWidth>
            <DialogTitle
                sx={{
                    backgroundColor: '#2c2a29',
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
                    name="cc"
                    label="CC"
                    fullWidth
                    margin="normal"
                    value={form.cc}
                    onChange={handleChange}
                    error={!!errors.cc}
                    helperText={errors.cc}
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
                        endAdornment: getCardIcon(cardType),
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
                    name="deliveryEmailAddress"
                    label="Delivery Email Address"
                    fullWidth
                    margin="normal"
                    value={form.deliveryEmailAddress}
                    onChange={handleChange}
                    error={!!errors.deliveryEmailAddress}
                    helperText={errors.deliveryEmailAddress}
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