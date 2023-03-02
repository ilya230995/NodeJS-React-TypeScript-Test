import { Express } from "express";
import authRoute from "./auth.route";
import productsRoute from "./products.route";
import usersRoute from "./users.route";

export default (app: Express) => {
  app.use(authRoute());
  app.use(usersRoute());
  app.use(productsRoute());
};
