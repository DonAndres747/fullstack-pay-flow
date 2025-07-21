import valid from 'card-validator';

export function validateCardForm(form) {
    const errors = {};

    // Cardholder Name
    if (!form.name.trim()) {
        errors.name = 'Name is required';
    } else if (form.name.length < 5) {
        errors.name = 'Name must be atleast 5 digits long';
    }

    // Cardholder Name
    if (!form.cc.trim()) {
        errors.cc = 'CC is required';
    }  

    // Card Number
    const numberValidation = valid.number(form.cardNumber);
    if (!numberValidation.isValid) {
        errors.cardNumber = 'Invalid card number';
    }

    // Expiration Date
    const expDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const expValidation = valid.expirationDate(form.expDate);

    if (!form.expDate.trim()) {
        errors.expDate = 'Expiration date is required';
    } else if (!expDatePattern.test(form.expDate)) {
        errors.expDate = 'Format must be MM/YY';
    } else if (!expValidation.isValid) {
        errors.expDate = 'Invalid expiration date';
    }

    // CVV
    const cvvValidation = valid.cvv(form.cvv, [3, 4]);
    if (!cvvValidation.isValid) {
        errors.cvv = 'Invalid CVV';
    }

    // Delivery Name
    if (!form.deliveryName.trim()) {
        errors.deliveryName = 'Required';
    }

    // Delivery Email Address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.deliveryEmailAddress.trim()) {
        errors.deliveryEmailAddress = 'Required';
    } else if (!emailPattern.test(form.deliveryEmailAddress)) {
        errors.deliveryEmailAddress = 'Invalid email format';
    }

    // Delivery Address
    if (!form.deliveryAddress.trim()) {
        errors.deliveryAddress = 'Required';
    }

    // Delivery Phone (10 digits)
    if (!/^\d{10}$/.test(form.deliveryPhone)) {
        errors.deliveryPhone = 'Must be 10 digits';
    }

    return errors;
}

export function getCardType(number) {
    const result = valid.number(number);
    return result.card ? result.card.type : 'unknown';
}
