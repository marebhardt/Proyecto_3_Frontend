import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Alert as AlertUI, Collapse, IconButton } from "@mui/material";
import "./alert.scss";

import CloseIcon from "@mui/icons-material/Close";

const Alert = (props) => {
    const { openAlert, setOpenAlert, message, redirectUrl, timeout } = props;

    const navigate = useNavigate();

    // useNavigate es un hook proporcionado por React Router. Este hook permite
    // la navegación programática en la aplicación, lo que significa que puedes
    // cambiar de ruta (URL) de forma dinámica en respuesta a ciertos eventos
    // que sucedan en la aplicación.

    const handleOnClickClose = () => {
        setOpenAlert(false);

        if (redirectUrl) {
            navigate(redirectUrl);
        }
    };

    useEffect(() => {
        if (openAlert) {
            setTimeout(() => {
                handleOnClickClose();
            }, timeout);
        }
    }, [openAlert] );

    return (
        <Collapse
            className="alert"
            in={openAlert}>
            <AlertUI
                severity={props.severity}
                action={
                    <IconButton
                        size="small"
                        onClick={handleOnClickClose}>
                        <CloseIcon/>
                    </IconButton>
                }>
                <span className="alert__message">{message}</span>
            </AlertUI>
        </Collapse>
    );
};

Alert.propTypes = {
    openAlert: PropTypes.bool.isRequired,
    severity: PropTypes.string,
    setOpenAlert: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string,
    timeout: PropTypes.number,
};

Alert.defaultProps = {
    message: "El formulario se procesó correctamente",
    severity: "success",
    timeout: 5000,
};

export default Alert;