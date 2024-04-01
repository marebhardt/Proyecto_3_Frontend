import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/material";
import "./contact.scss";

import {
    MESSAGE_REQUIRED,
    MESSAGE_TELEPHONE_INVALID,
    MESSAGE_EMAIL_INVALID,
    REGEX_TELEPHONE,
    REGEX_EMAIL,
} from "../../constants/regexPattern.js";

import InputField from "../../components/form/inputField/InputField";
import Button from "../../components/button/Button";

import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Alert from "../../components/alert/Alert.jsx";

import useContact from "../../hooks/useContact.js";

const Contact = () => {
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ severity, setSeverity ] = useState("success");
    const [ msg, setMsg ] = useState("");
    const { createContact } = useContact();

    const validationSchema = yup.object({
        fullname: yup
            .string("Ingresa tu nombre y apellido")
            .min(7, "Ingresa un nombre y apellido que tenga mas de 7 carateres")
            .required(MESSAGE_REQUIRED),
        phone: yup
            .string("Ingresa tu teléfono")
            .matches(REGEX_TELEPHONE, MESSAGE_TELEPHONE_INVALID)
            .required(MESSAGE_REQUIRED),
        email: yup
            .string("Ingresa tu email")
            .matches(REGEX_EMAIL, MESSAGE_EMAIL_INVALID)
            .required(MESSAGE_REQUIRED),
        query: yup
            .string("Ingresa tu consulta")
            .min(11, "Ingresa una consulta que tenga entre 15 y 150 carateres")
            .required(MESSAGE_REQUIRED),
    });

    const formik = useFormik({
        initialValues: {
            fullname: "",
            phone: "",
            email: "",
            query: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            setOpenAlert(true);
            
            createContact(values).catch((error) => {
                console.log(error);
                setSeverity("error");
                setMsg("Error al enviar la consulta. Intenta nuevamente mas tarde.");
            }).then((response) => {
                if (response?.success) {
                    setOpenAlert(true);
                    setMsg("Consulta enviada con éxito. El id de la solicitud es " + response.data.id);
                }
                console.log(response);
                resetForm();
            });
        },
    });

    return (
        <Box className="contact">
            <Box
                component="section"
                className="contact__section">
                    <Alert
                        openAlert={openAlert}
                        setOpenAlert={setOpenAlert}
                        severity={severity}
                        message={msg}/>
                <h3>Escribi  tu consulta</h3>

                <Box
                    component="form"
                    className="contact__section__form"
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}>
                    <InputField
                        label="Nombre y apellido"
                        name="fullname"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        errorMessage={formik.touched.fullname && formik.errors.fullname}
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
                        inputProps={{ maxLength: 15 }}>
                    </InputField>

                    <InputField
                        label="E-mail"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                        inputProps={{ maxLength: 50 }}>
                    </InputField>

                    <InputField
                        label="Consulta"
                        name="query"
                        multiline
                        rows={5}
                        value={formik.values.query}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.query && Boolean(formik.errors.query)}
                        errorMessage={formik.touched.query && formik.errors.query}
                        inputProps={{ maxLength: 150 }}>
                    </InputField>

                    <Button type="submit">Envianos tu consulta</Button>
                </Box>

            </Box>

            <Box
                component="section"
                className="contact__section">
                <h3>Datos de contacto</h3>
                <Box className="contact__section__data">
                    <Box>
                        <PlaceIcon/>
                        <span> Los Cerezos 2050, Santiago, Sgo de Chile.</span>
                    </Box>
                    <Box>
                        <PhoneIcon/>
                        <span>+5678982210</span>
                    </Box>
                    <Box>
                        <MailIcon/>
                        <span>info@stylechiccalzado.com</span>
                    </Box>
                </Box>
                <Box className="contact__section__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.5223962102427!2d-68.52767252438777!3d-31.537275074206214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x968140281b059031%3A0xbdafc7e302f74c9a!2sPlaza%2025%20de%20Mayo!5e0!3m2!1ses-419!2sar!4v1706052594529!5m2!1ses-419!2sar"
                        loading="lazy">
                    </iframe>
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;