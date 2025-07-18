import valid from 'card-validator';

export function validateCardForm(form) {
    const errors = {};

    // Cardholder Name (solo texto y obligatorio)
    if (!form.name.trim()) {
        errors.name = 'Name is required';
    }

    // Card Number
    const numberValidation = valid.number(form.cardNumber);
    if (!numberValidation.isValid) {
        errors.cardNumber = 'Invalid card number';
    }

    // Expiration Date
    const expValidation = valid.expirationDate(form.expDate);
    if (!expValidation.isValid) {
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

    // Delivery Address
    if (!form.deliveryAddress.trim()) {
        errors.deliveryAddress = 'Required';
    }

    // Delivery Phone (solo 10 dígitos)
    if (!/^\d{10}$/.test(form.deliveryPhone)) {
        errors.deliveryPhone = 'Must be 10 digits';
    }

    return errors;
}

export function getCardType(number) {
    const result = valid.number(number);
    return result.card ? result.card.type : 'unknown';
}
