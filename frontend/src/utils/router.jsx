import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import ProductView from '../views/productView';
import SummaryView from '../views/summaryView';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.PRODUCT_VIEW} element={<ProductView />} />
                <Route path={ROUTES.PAYMENT_VIEW} element={<SummaryView />} />
            </Routes>
        </BrowserRouter>
    )
}