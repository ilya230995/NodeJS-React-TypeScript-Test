import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import { getCurrentUser } from "../controllers/users";

export default () => {
  const route = Router();

  route.get(API_ROUTES.USERS.PRODUCT_BY_ID, getCurrentUser);

  return route;
};
