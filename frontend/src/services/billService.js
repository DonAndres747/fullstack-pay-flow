import axios from 'axios';

const BASE_URL = 'https://api-sandbox.co.uat.wompi.dev/v1';
const PUBLIC_KEY = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';

class BillingService {

    handlePayment = async (payload) => {
        try {  
            const token = await this.getAcceptanceToken();

            const response = await this.registerPayment({
                acceptance_token: token.data.presigned_acceptance.acceptance_token,
                accept_personal_auth: token.data.presigned_personal_data_auth.acceptance_token,
                ...payload
            })
 
            return response;
        } catch (error) {

        }
    }

    getAcceptanceToken = async () => {
        try {
            const url = `${BASE_URL}/merchants/${PUBLIC_KEY}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log("error:", error);
        }
    }

    registerPayment = async ({
        acceptance_token,
        accept_personal_auth,
        amountInCents,
        cc,
        customerData,
        customerEmail,
        reference,
        cardToken
    }) => {
        try {  
            const payload = {
                acceptance_token,
                accept_personal_auth,
                amount_in_cents: amountInCents,
                currency: 'COP',
                customer_email: customerEmail,
                customer_data: {
                    ...customerData,
                    device_id: "dummy-device-id"
                },
                customer_number_prefix: '+57',
                is_three_ds: true,
                merchant_user_id: `"dummy-session-id"_${customerEmail}`,
                reference,
                session_id: 'dummy-session-id',
                payment_method_type: 'CARD',
                payment_method: {
                    type: 'CARD',
                    token: cardToken,
                    installments: 1
                },
                billing_data: {
                    legal_id_type: "CC",
                    legal_id: cc
                },
                redirect_url: null,
                payment_link_id: "stagtest_VPOS_JNl6aX"
            };

            const headers = {
                Authorization: `Bearer ${PUBLIC_KEY}`
            }; 

            const response = await axios.post(`${BASE_URL}/transactions`, payload, { headers });
            return response.data;
        } catch (error) {
            console.log("error:", error);
        }
    };

    handleTokenize = async (cardInfo) => {
        try {  
            const response = await axios.post(
                'https://api-sandbox.co.uat.wompi.dev/v1/tokens/cards',
                {
                    number: cardInfo.cardNumber,
                    cvc: cardInfo.cvv,
                    exp_month: cardInfo.expDate.split('/')[0],
                    exp_year: cardInfo.expDate.split('/')[1],
                    card_holder: cardInfo.name
                },
                {
                    headers: {
                        Authorization: `Bearer ${PUBLIC_KEY}`
                    }
                }
            );

            const data = response.data.data;
            return data;
        } catch (error) {
            alert('Credit card information could not be processed');
            return error
        }
    }
};

export const billingService = new BillingService();