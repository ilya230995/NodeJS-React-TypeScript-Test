import mongoose from "mongoose";
import ProductModel from "../models/Products/Product.model";
import getProductByIdController from "../controllers/products/getProductById.controller";
import { TEXT } from "../utils/JoiErrors";


jest.mock("../models/Products/Product.model", () => ({
  findById: jest.fn(),
}));

const productId = new mongoose.Types.ObjectId().toHexString();

describe("getProductByIdController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: { id: productId } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a product with status code 200", async () => {
    const product = {
      _id: productId,
      name: "test product",
      category: "test category",
      price: 10,
      description: "test description",
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: jest.fn().mockReturnValue({
        _id: productId,
        name: "test product",
        category: "test category",
        price: 10,
        description: "test description",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    ProductModel.findById.mockResolvedValueOnce(product);

    await getProductByIdController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      _id: productId,
      name: "test product",
      category: "test category",
      price: 10,
      description: "test description",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should return an error response with status code 400 if product does not exist", async () => {
    ProductModel.findById.mockResolvedValueOnce(null);

    await getProductByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: TEXT.ERRORS.productDoesntExists,
    });
  });

  it("should return an error response with status code 400 if an error occurs", async () => {
    ProductModel.findById.mockRejectedValueOnce(new Error("Database error"));

    await getProductByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Database error",
    });
  });
});
