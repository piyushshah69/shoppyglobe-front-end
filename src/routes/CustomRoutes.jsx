import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from 'react';

import App from "../App";
import Cart from "../components/Cart/Cart";
const Home = lazy(() => import("../components/Home/Home"));
const Products = lazy(() => import("../components/Products/Products"));
const ProductDetails = lazy(() => import("../components/Products/ProductDetails"));
const NotFound = lazy(() => import("../components/NotFound/NotFound"));

const CustomRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default CustomRoutes;