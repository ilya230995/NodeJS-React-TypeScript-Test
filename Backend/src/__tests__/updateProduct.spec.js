import ProductModel from "../models/Products/Product.model";
import updateProductController from "../controllers/products/updateProduct.controller";
import ResponseService from "../utils/ResponseService";
import { TEXT } from "../utils/JoiErrors";

jest.mock("../models/Products/Product.model");
jest.mock("../utils/ResponseService");

describe("updateProductController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: "product-id" },
      body: { name: "updated-product", category: "new-category" },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update the product and return the updated product data", async () => {
    const updatedProduct = {
      _id: "product-id",
      name: "updated-product",
      category: "new-category",
      price: 10,
      description: "New product description",
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: jest.fn().mockReturnValue({
        _id: "product-id",
        name: "updated-product",
        category: "new-category",
        price: 10,
        description: "New product description",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };
    ProductModel.findByIdAndUpdate.mockResolvedValueOnce(updatedProduct);

    await updateProductController(req, res);

    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "product-id",
      { name: "updated-product", category: "new-category" },
      { new: true }
    );
    expect(ResponseService.success).toHaveBeenCalledWith(res, {
      _id: "product-id",
      name: "updated-product",
      category: "new-category",
      price: 10,
      description: "New product description",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should return an error if the product is not found", async () => {
    ProductModel.findByIdAndUpdate.mockResolvedValueOnce(null);

    await updateProductController(req, res);

    expect(ResponseService.error).toHaveBeenCalledWith(
      res,
      400,
      TEXT.ERRORS.productDoesntExists
    );
  });

  it("should return an error if an exception is thrown", async () => {
    const errorMessage = "Something went wrong";
    ProductModel.findByIdAndUpdate.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await updateProductController(req, res);

    expect(ResponseService.error).toHaveBeenCalledWith(res, 400, errorMessage);
  });
});
