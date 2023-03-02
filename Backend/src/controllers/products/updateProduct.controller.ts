import { RequestHandler } from "express";
import ProductModel from "../../models/Products/Product.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";

const updateProductController: RequestHandler = async (req, res) => {
  const productId = req.params.id;
  const { body } = req;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return ResponseService.error(res, 400, TEXT.ERRORS.productDoesntExists);
    }

    const { _id, name, category, price, description, createdAt, updatedAt } =
      updatedProduct.toObject();

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

export default updateProductController;

