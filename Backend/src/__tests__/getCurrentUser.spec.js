import UserModel from "../models/Users/User.model";
import ResponseService from "../utils/ResponseService";
import getCurrentUser from "../controllers/users/getCurrentUser.controller";

jest.mock("../models/Users/User.model");
jest.mock("../utils/ResponseService");

describe("getCurrentUser controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      user: {
        _id: "test-id",
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

  it("should get the current user successfully", async () => {
    const user = {
      _id: "test-id",
      email: "test@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: jest.fn(() => ({
        _id: "test-id",
        email: "test@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    };
    ResponseService.success.mockImplementationOnce((res, data) => {
      expect(data._id).toEqual(user._id);
      expect(data.email).toEqual(user.email);
      expect(data.createdAt).toEqual(user.createdAt);
      expect(data.updatedAt).toEqual(user.updatedAt);
      return res.json(data);
    });
    UserModel.findById.mockResolvedValueOnce(user);

    await getCurrentUser(req, res);

    expect(UserModel.findById).toHaveBeenCalledWith(req.user._id);
    expect(ResponseService.success).toHaveBeenCalledWith(res, {
      _id: user._id,
      email: user.email,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should return an error when user is not found", async () => {
    UserModel.findById.mockResolvedValueOnce(null);

    await getCurrentUser(req, res);

    expect(UserModel.findById).toHaveBeenCalledWith(req.user._id);
    expect(ResponseService.error).toHaveBeenCalledWith(
      res,
      400,
      expect.any(String)
    );
  });

  it("should return an error when there is an exception", async () => {
    const error = new Error("Test error");
    UserModel.findById.mockRejectedValueOnce(error);

    await getCurrentUser(req, res);

    expect(UserModel.findById).toHaveBeenCalledWith(req.user._id);
    expect(ResponseService.error).toHaveBeenCalledWith(res, 400, error.message);
  });
});
