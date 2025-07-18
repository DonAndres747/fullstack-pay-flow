import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';

import ProductView from '../views/productView.jsx';
import PaymentView from '../views/paymentView.jsx';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.PRODUCT_VIEW} element={<ProductView />} />
                <Route path={ROUTES.PAYMENT_VIEW} element={<PaymentView />} />
            </Routes>
        </BrowserRouter>
    )
}