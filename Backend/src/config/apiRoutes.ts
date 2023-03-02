const BASE_URL = "/api/v1/";

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}auth/login/`,
    REGISTER: `${BASE_URL}auth/register/`,
  },
  PRODUCTS: {
    ADD: `${BASE_URL}products/add/`,
    DELETE: `${BASE_URL}products/delete/:id/`,
    PRODUCT_BY_ID: `${BASE_URL}products/:id/`,
    ALL_PRODUCTS: `${BASE_URL}products/`,
    UPDATE_PRODUCT: `${BASE_URL}products/:id/`,
  },
  USERS: {
    PRODUCT_BY_ID: `${BASE_URL}users/me/`,
  }
};
