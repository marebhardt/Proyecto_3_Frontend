import "./cart.scss";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";

import { useContext, useState } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableFooter } from "@mui/material";

import { numericFormatter } from "react-number-format";

import Button from "../../components/button/Button";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "../../components/alert/Alert";

const Cart = () => {
    const {shoppingCart, countProducts, calculateTotal, addCartProduct, subtractCartProduct, removeAllCartProducts, removeCartProduct} = useContext(ShoppingCartContext);
    const [ openAlert, setOpenAlert ] = useState(false);
    const navigate = useNavigate();

    const formatNumber = (number) => {
        return numericFormatter(number + "", {decimalScale: 0, prefix: '$ ', thousandSeparator: '.'})
    }

    const gotoCheckout = () => {
        if ( countProducts() > 0) {
            navigate("/checkout");
        } else {
            setOpenAlert(true);
        }
    }

    return (
        <Box className="cart">
            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                severity="error"
                message="No hay productos en el carrito, por favor agrega alguno"/>
            <h3>Resumen de tu compra</h3>
            <Table
                className="cart__table__items">
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {shoppingCart?.filter((product) => product.amount > 0).map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="price">{formatNumber(product.price)}</TableCell>
                            <TableCell className="number">{product.amount}</TableCell>
                            <TableCell className="price">{formatNumber(product.amount * product.price)}</TableCell>
                            <TableCell>
                                <Button color="danger" onClick={() => subtractCartProduct(product) } disabled={product.amount <= 1}><RemoveIcon/></Button>
                                <Button onClick={() => addCartProduct(product)}><AddIcon/></Button>
                                <Button color="secondary" onClick={() => removeCartProduct(product.id)}><DeleteIcon/></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={1}></TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>{countProducts()}</TableCell>
                        <TableCell className="price">{formatNumber(calculateTotal())}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Box className="cart__actions">
                <Button color="danger" component={NavLink} to="/">Volver</Button>
                <Button color="secondary" onClick={removeAllCartProducts}>Vaciar Carrito</Button>
                <Button onClick={gotoCheckout}>Pagar</Button>
            </Box>
        </Box>
    )
}

export default Cart;