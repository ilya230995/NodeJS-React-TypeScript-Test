import ProductModel from "../../models/Products/Product.model";
import { RequestHandler } from "express";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const getProductByIdController: RequestHandler = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return ResponseService.error(res, 400, TEXT.ERRORS.productDoesntExists);
    }

    const { _id, name, category, price, description, createdAt, updatedAt } =
      product.toObject();

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

export default getProductByIdController;
