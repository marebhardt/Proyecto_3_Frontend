import { useState } from "react";
import { Box } from "@mui/material";
import "./home.scss";

import { IT_IS_OFF } from "../../constants/general.js";

import ProductSearch from "../../components/productSearch/ProductSearch";
import ProductCard from "../../components/productCard/ProductCard";
import ProductCreateCard from "../../components/productCreateCard/ProductCreateCard.jsx";

import ProductGallery from "../../components/productGallery/ProductGallery";

const Home = () => {
    const [ products, setProducts ] = useState([]);

    return (
        <Box className="home">
            <Box
                component="section"
                className="home__section">

                <ProductGallery/>
            </Box>
        </Box>
    );
};

export default Home;