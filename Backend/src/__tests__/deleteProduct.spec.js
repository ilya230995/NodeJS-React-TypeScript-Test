import ProductModel from "../models/Products/Product.model";
import deleteProductController from "../controllers/products/deleteProduct.controller";
import { TEXT } from "../utils/JoiErrors";

jest.mock("../models/Products/Product.model", () => ({
  findOne: jest.fn(),
  findOneAndDelete: jest.fn(),
}));

describe("deleteProductController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { params: { id: "validproductid" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should delete a product and return the deleted product data", async () => {
    const product = {
      _id: "validproductid",
      name: "Test Product",
      category: "Test Category",
      price: 10,
      description: "Test Description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    ProductModel.findOne.mockResolvedValueOnce(product);

    ProductModel.findOneAndDelete.mockResolvedValueOnce(product);

    await deleteProductController(req, res);

    expect(res.json).toHaveBeenCalledWith(product);
  });

  it("should return an error if the product does not exist", async () => {
    ProductModel.findOne.mockResolvedValueOnce(null);

    await deleteProductController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: TEXT.ERRORS.productDoesntExists,
    });
  });
});
