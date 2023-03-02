import { RequestHandler } from "express";
import ProductModel from "../../models/Products/Product.model";
import ResponseService from "../../utils/ResponseService";

const getAllProductsController: RequestHandler = async (req, res) => {
  try {
    const name = req?.query?.name as string;
    const category = req?.query?.category as string;

    const searchParams: {
      name?: string;
      category?: string;
    } = {};

    if (name) {
      searchParams.name = name;
    }
    if (category) {
      searchParams.category = category;
    }

    const products = await ProductModel.paginate(searchParams, {
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 30),
      select: ["-__v", "-hashedPassword"],
    });

    ResponseService.success(res, products);
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};
export default getAllProductsController;
