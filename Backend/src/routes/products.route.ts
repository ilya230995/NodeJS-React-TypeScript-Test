import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import {
  addProductController,
  deleteProductController,
  getProductByIdController,
  getAllProductsController,
  updateProductController,
} from "../controllers/products";

export default () => {
  const route = Router();

  route.post(API_ROUTES.PRODUCTS.ADD, addProductController);
  route.delete(API_ROUTES.PRODUCTS.DELETE, deleteProductController);
  route.get(API_ROUTES.PRODUCTS.PRODUCT_BY_ID, getProductByIdController);
  route.get(API_ROUTES.PRODUCTS.ALL_PRODUCTS, getAllProductsController);
  route.put(API_ROUTES.PRODUCTS.UPDATE_PRODUCT, updateProductController);

  return route;
};
