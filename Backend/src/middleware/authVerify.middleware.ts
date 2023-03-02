import { NextFunction, Request, Response } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import ResponseService from "../utils/ResponseService";
import jwt from "jsonwebtoken";
import CONFIG from "../config";

const whiteList = [API_ROUTES.AUTH.LOGIN, API_ROUTES.AUTH.REGISTER];

export default (req: Request, res: Response, next: NextFunction) => {
  if (whiteList.includes(req.originalUrl)) return next();

  const parsedToken = req.headers.authorization?.split(" ")[1] ?? "";
  if (!parsedToken) return ResponseService.error(res, 401);

  jwt.verify(parsedToken, CONFIG.JWT_SECRET, async (err, user) => {
    (<any>req).user = user;
    
    if (err) return ResponseService.error(res, 401);
    next();
  });
};
