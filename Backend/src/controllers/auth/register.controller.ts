import { RequestHandler } from "express";
import { PASSWORD_REGEX } from "../../config/auth";
import UserModel from "../../models/Users/User.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const registerController: RequestHandler = async (req, res) => {
  if (await validateFields(validationSchema, req, res)) return;

  try {
    const existingUser = await UserModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (existingUser) {
      return ResponseService.error(res, 400, TEXT.ERRORS.userExists);
    }

    const newUser = await UserModel.create({
      ...req.body,
      email: req.body.email.toLowerCase(),
    });
    const accessToken = newUser.generateAccessToken();

    const { _id, email, createdAt, updatedAt } = newUser.toObject();

    ResponseService.success(res, {
      user: {
        _id,
        email,
        createdAt,
        updatedAt,
      },
      accessToken,
    });
  } catch (err: any) {
    ResponseService.error(res, 400, err.message);
  }
};

export default registerController;
