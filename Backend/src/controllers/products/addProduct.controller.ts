import { RequestHandler } from "express";
import ProductModel from "../../models/Products/Product.model";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const validationSchema = JOI.object({
  name: Joi.string().strict().required(),
  category: Joi.string().strict().required(),
  price: Joi.number().strict().required(),
  description: Joi.string().strict().required(),
  imageUrl: Joi.string().strict(),
});

export const addProductController: RequestHandler = async (req, res) => {
  try {
    if (await validateFields(validationSchema, req, res)) return;

    const existingProduct = await ProductModel.findOne({
      name: req.body.name,
    });
    if (existingProduct) {
      return ResponseService.error(res, 400, TEXT.ERRORS.productExists);
    }
    const newUser = await ProductModel.create({
      ...req.body,
    });

    const { _id, name, category, price, description, createdAt, updatedAt } =
      newUser.toObject();

    ResponseService.success(res, {
      _id,
      name,
      category,
      price,
      description,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default addProductController;

