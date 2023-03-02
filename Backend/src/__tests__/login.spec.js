import UserModel from "../models/Users/User.model";
import ResponseService from "../utils/ResponseService";
import validateFields, { JOI } from "../utils/validation";
import loginController from "../controllers/auth/login.controller";

jest.mock("../utils/validation", () => ({
  __esModule: true,
  default: jest.fn(),
  JOI: jest.requireActual("joi"),
}));

jest.mock("../models/Users/User.model", () => ({
  findOne: jest.fn(),
}));

describe("loginController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an error response if validation fails", async () => {
    req = { body: {} };

    validateFields.mockImplementationOnce(async (schema, req, res) => {
      const error = [{ message: "Validation error" }];
      ResponseService.error(res, 400, error);
    });

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return an error response if user does not exist", async () => {
    req = {
      body: { email: "nonexistentuser@example.com", password: "password" },
    };

    UserModel.findOne.mockResolvedValueOnce(null);

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  it("should return a success response with user data and access token", async () => {
    req = {
      body: { email: "validuser@example.com", password: "passwordAS23D!" },
    };
    const user = {
      _id: "validuserid",
      email: "validuser@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      validatePassword: jest.fn(),
      generateAccessToken: jest.fn(),
      toObject: jest.fn(),
    };

    UserModel.findOne.mockResolvedValueOnce(user);

    user.validatePassword.mockReturnValueOnce(true);

    user.generateAccessToken.mockReturnValueOnce("sample_token");

    user.toObject.mockReturnValueOnce({
      _id: "validuserid",
      email: "validuser@example.com",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    await loginController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      user: {
        _id: "validuserid",
        email: "validuser@example.com",
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
      accessToken: "sample_token",
    });
  });
});
