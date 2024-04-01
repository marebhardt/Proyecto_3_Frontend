import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ShoppingCartContext from "../contexts/ShoppingCartContext.jsx";
import { CONTACT_URL } from "../constants/api.js";

const useContact = () => {
    const [ response, setResponse ] = useState({});
    const [ contact, setContact ] = useState([]);

    const searchContact = async (params) => {
        const queryParams = new URLSearchParams(params);
        const url = queryParams.size > 0 ? `${CONTACT_URL}?${queryParams.toString()}` : CONTACT_URL;

        return await axios.get(url)
            .then((res) => {
                setResponse(res);
                setContact(res.data?.data);
                return res.data;
            });
    };

    useEffect(() => {
        searchContact({});
    }, []);

    const createContact = async (values) => {
        return await axios.post(CONTACT_URL, values)
            .then((res) => {
                setResponse(res);
                return res.data;
            });
    };

    return {
        response,
        contact,
        createContact,
    };
};

export default useContact;