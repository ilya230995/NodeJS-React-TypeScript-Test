import { Response } from "jest-express/lib/response";
import ProductModel from "../models/Products/Product.model";
import getAllProductsController from "../controllers/products/getAllProducts.controller";

jest.mock("../models/Products/Product.model");

describe("getAllProductsController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { query: {} };
    res = new Response();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockProduct = {
    _id: "validproductid",
    name: "Valid Product",
    price: 9.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockProducts = {
    docs: [mockProduct],
    totalDocs: 1,
    limit: 30,
    page: 1,
    totalPages: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };

  it("should return a success response with products", async () => {
    ProductModel.paginate.mockResolvedValueOnce(mockProducts);

    await getAllProductsController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      ...mockProducts,
    });
  });

  it("should return an error response if an error occurs", async () => {
    const error = new Error("Sample Error");

    ProductModel.paginate.mockRejectedValueOnce(error);

    await getAllProductsController(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.json).toHaveBeenCalledWith({
      error: error.message,
    });
  });
});
