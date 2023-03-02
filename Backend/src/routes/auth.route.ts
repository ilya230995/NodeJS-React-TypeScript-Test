import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import { registerController, loginController } from "../controllers/auth";

export default () => {
  const route = Router();

  route.post(API_ROUTES.AUTH.REGISTER, registerController);

  route.post(API_ROUTES.AUTH.LOGIN, loginController);

  return route;
};
