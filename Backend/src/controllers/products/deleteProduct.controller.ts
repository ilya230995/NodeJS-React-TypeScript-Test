import { RequestHandler } from "express";
import ProductModel from "../../models/Products/Product.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const deleteProductController: RequestHandler = async (req, res) => {
  const productId = req.params.id;
  try {
    const prevProduct = await ProductModel.findOne({ _id: productId });

    if (!prevProduct) {
      return ResponseService.error(res, 400, TEXT.ERRORS.productDoesntExists);
    }
    await ProductModel.findOneAndDelete({ _id: productId });

    ResponseService.success(res, prevProduct);
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default deleteProductController;

