import { addProductController } from "../controllers/products/addProduct.controller";
import ProductModel from "../models/Products/Product.model";
import { TEXT } from "../utils/JoiErrors";

jest.mock("../models/Products/Product.model", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("addProductController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        name: "Product A",
        category: "Category A",
        price: 10,
        description: "This is a product",
        imageUrl: "https://example.com/product-a.jpg",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should add a product", async () => {
    const product = {
      name: "Product A",
      category: "Category A",
      price: 10,
      description: "This is a product",
      imageUrl: "https://example.com/product-a.jpg",
      toObject: jest.fn(),
    };

    ProductModel.findOne.mockResolvedValueOnce(null);

    ProductModel.create.mockResolvedValueOnce(product);

    product.toObject.mockReturnValueOnce({
      _id: "validProductId",
      name: "Product A",
      category: "Category A",
      price: 10,
      description: "This is a product",
      imageUrl: "https://example.com/product-a.jpg",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    await addProductController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      _id: "validProductId",
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should return an error if product already exists", async () => {
    const product = {
      name: "Product Name",
      category: "Category",
      price: 10,
      description: "Product Description",
      imageUrl: "https://example.com/product.jpg",
      toObject: jest.fn(),
    };

    ProductModel.findOne.mockResolvedValueOnce(product);

    await addProductController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: TEXT.ERRORS.productExists,
    });
  });
});
