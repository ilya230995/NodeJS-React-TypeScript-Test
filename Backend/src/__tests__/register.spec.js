import UserModel from "../models/Users/User.model";
import registerController from "../controllers/auth/register.controller";

jest.mock("../models/Users/User.model", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("registerController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return an error response if validation fails", async () => {
    req = { body: { email: "invalidemail", password: "123" } };

    await registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Wrong email format",
    });
  });

  it("should return an error response if user already exists", async () => {
    req = {
      body: { email: "existinguser@example.com", password: "passwordAS23D!" },
    };

    const existingUser = {
      _id: "existinguserid",
      email: "existinguser@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    UserModel.findOne.mockResolvedValueOnce(existingUser);

    await registerController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User already exist",
    });
  });

  it("should return a success response with user data and access token", async () => {
    let req = {
      body: { email: "validuser@example.com", password: "passwordAS23D!" },
    };
    const newUser = {
      _id: "validuserid",
      email: "validuser@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      generateAccessToken: jest.fn(),
      toObject: jest.fn(),
    };

    UserModel.findOne.mockResolvedValueOnce(null);

    UserModel.create.mockResolvedValueOnce(newUser);

    newUser.generateAccessToken.mockReturnValueOnce("sample_token");

    newUser.toObject.mockReturnValueOnce({
      _id: "validuserid",
      email: "validuser@example.com",
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });

    await registerController(req, res);

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
