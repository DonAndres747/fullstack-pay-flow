import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

export default function getCardIcon(cardType) {
    if (cardType === 'visa') return <img src="/visa.png" alt="Visa" height={"24px"} />;
    if (cardType === 'mastercard') return <img src="/mastercard.png" alt="MasterCard" height={"24px"} />;
    return <CreditCardOutlinedIcon />;
}