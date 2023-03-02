import express, { Express } from "express";
import routes from "../routes";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware";
import corsMiddleware from "../middleware/cors.middleware";
import authVerifyMiddleware from "../middleware/authVerify.middleware";

export default (app: Express) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(authVerifyMiddleware);

  routes(app);

  app.use(errorHandlerMiddleware);
};
