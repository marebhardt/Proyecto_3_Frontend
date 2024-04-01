const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PRODUCTS_URL = `${BACKEND_URL}/api/products`;
const CARTS_URL = `${BACKEND_URL}/api/carts`;
const CONTACT_URL = `${BACKEND_URL}/api/contact`;
const IMAGES_URL = `${BACKEND_URL}/public/images`;

const IMAGE_DEFAULT_NAME = "default.jpg";

export {
    BACKEND_URL,
    PRODUCTS_URL,
    CARTS_URL,
    CONTACT_URL,
    IMAGES_URL,
    IMAGE_DEFAULT_NAME,
};