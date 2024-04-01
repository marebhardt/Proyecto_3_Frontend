import "./checkout.scss";
import { Box } from "@mui/material";
import { useFormik } from "formik";

import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";

import useProducts from "../../hooks/useProducts.js";
import InputField from "../../components/form/inputField/InputField";
import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert.jsx";

import { NumericFormat, numericFormatter } from "react-number-format";

import ShoppingCartContext from "../../contexts/ShoppingCartContext";

import useCart from "../../hooks/useCarts";

const Checkout = () => {
    const {shoppingCart, countProducts, calculateTotal, clearProductCart, buyCartProducts} = useContext(ShoppingCartContext);
    const { products, updateProduct } = useProducts();
    const { createCart } = useCart();
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ msg, setMsg ] = useState("");
    const [ showForm, setShowForm ] = useState(true);
    const [ severity, setSeverity ] = useState("success");
    const [ summary, setSummary ] = useState("");
    const [ title, setTitle ] = useState("Pagar");
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            address: "",
        },
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = "El nombre es requerido";
            }

            if (!values.phone) {
                errors.phone = "El teléfono es requerido";
            } else if (!/^\d{9,12}$/.test(values.phone)) {
                errors.phone = "El teléfono debe tener entre 9 y 12 dígitos";
            }

            if (!values.address) {
                errors.address = "La dirección es requerida";
            }

            if (countProducts() === 0) {
                setSeverity("error");
                setMsg("No hay productos en el carrito, por favor agrega alguno");
                setOpenAlert(true);
            }

            return errors;
        },
        onSubmit: (values) => {
            setSummary("Estamos procesando tu pedido...");
            setShowForm(false);
            let products = [];
            shoppingCart.forEach((product) => {
                const tmpProd = products.find((prod) => prod.id === product.id);
                products.push({ id: product.id, name: product.name, amount: product.amount, price: product.price});
                //tmpProd.stock -= product.amount;
                //updateProduct(tmpProd);
                //clearProductCart(product);
            });
            createCart({ ...values, products: products, total: calculateTotal() }).then((resp) => {
                const { data } = resp;;
                setSeverity("success");
                setMsg("Tu pedido se registró correctamente. Lo enviaremos a la brevedad");
                setTitle("Pedido # " + data.id);
                setSummary(" "+ 
                        "\n Total: " + numericFormatter(data.total + "", {decimalScale: 0, prefix: '$ ', thousandSeparator: '.'}) +
                        "\n Fecha: " + data.date +
                        "\n Será entregado en " + data.address
                    );
                setOpenAlert(true);
                buyCartProducts();
            }).catch((error) => {
                console.log(error.response.data);
                setSeverity("error");
                setMsg("Ocurrió un error al registrar tu pedido. Por favor intenta nuevamente");
                setTitle("Error al procesar tu pedido");
                if (error.response?.data?.error) {
                    setSummary(error.response.data.error);
                }
                setOpenAlert(true);
            });
        },
    });

    return (
        <Box className="checkout">
            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                message={msg}
                severity={severity}
                timeout={10000}
                redirectUrl={severity !== 'error' ? '/' : '/cart'}/>
            <h2>{title}</h2>
            <Box
                component="form"
                className="form-product"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                sx={{ display: showForm ? "flex" : "none" }}
                >

                <InputField
                    label="Nombre"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    errorMessage={formik.touched.name && formik.errors.name}
                    inputProps={{ maxLength: 25 }}>
                </InputField>
                <InputField
                    label="Teléfono"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    errorMessage={formik.touched.phone && formik.errors.phone}
                    inputProps={{ maxLength: 12 }}>
                </InputField>
                <InputField
                    label="Dirección"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    errorMessage={formik.touched.address && formik.errors.address}
                    inputProps={{ maxLength: 45 }}>
                </InputField>
                <label>Total:</label>
                <NumericFormat
                    value={calculateTotal()}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="$ "
                    className="checkout__total"
                />
                
                <Box className="checkout__actions">
                    <Button color="danger" component={NavLink} to="/cart">Volver</Button>
                    <Button type="submit">Comprar</Button>
                </Box>
            </Box>
            <Box sx={{ display: !showForm ? "block" : "none" }}>
                <pre>{summary}</pre>
            </Box>
        </Box>
    );
}

export default Checkout;