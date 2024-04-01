import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartContext from "../contexts/ShoppingCartContext.jsx";
import { CARTS_URL } from "../constants/api.js";

const useCarts = () => {
    const [ response, setResponse ] = useState({});
    const [ carts, setCarts ] = useState([]);

    const searchCarts = async (params) => {
        const queryParams = new URLSearchParams(params);
        const url = queryParams.size > 0 ? `${CARTS_URL}?${queryParams.toString()}` : CARTS_URL;

        return await axios.get(url)
            .then((res) => {
                setResponse(res);
                setCarts(res.data?.data);
                return res.data;
            });
    };

    useEffect(() => {
        searchCarts({});
    }, []);

    const createCart = async (values) => {
        return await axios.post(CARTS_URL, values)
            .then((res) => {
                setResponse(res);
                return res.data;
            });
    };

    return {
        response,
        carts,
        createCart,
    };
};

export default useCarts;