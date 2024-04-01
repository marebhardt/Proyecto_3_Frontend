import "./main.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Box } from "@mui/material";

import Home from "../../../pages/home/Home";
import About from "../../../pages/about/About";
import Contact from "../../../pages/contact/Contact";
import Product from "../../../pages/product/Product";
import Cart from "../../../pages/cart/Cart";
import Checkout from "../../../pages/checkout/Checkout";

import ShoppingCartContext from "../../../contexts/ShoppingCartContext";

const Main = () => {
    return (
        <Box
            component="main"
            className="main">
            <Routes>
                <Route
                    path="/"
                    element={<Home/>}/>
                <Route
                    path="/about"
                    element={<About/>}/>
                <Route
                    path="/contact"
                    element={<Contact/>}/>
                <Route
                    path="/product"
                    element={<Product/>}/>
                <Route
                    path="/product/:id"
                    element={<Product/>}/>
                <Route
                    path="/cart"
                    element={<Cart/>}/>
                <Route
                    path="/checkout"
                    element={<Checkout/>}>
                </Route>
                    
            </Routes>
        </Box>
    );
};

export default Main;