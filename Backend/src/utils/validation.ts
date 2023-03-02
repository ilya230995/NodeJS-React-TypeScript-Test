import Joi from "joi";
import { Request, Response } from "express";
import ResponseService from "./ResponseService";
import { JOI_ERRORS } from "./JoiErrors";

export const JOI = Joi.defaults((schema) => schema.messages(JOI_ERRORS));

const validateFields = async (
  schema: Joi.ObjectSchema<any>,
  req: Request,
  res: Response
) => {
  try {
    await schema.validateAsync(req.body);
    return false;
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
    return true;
  }
};

export default validateFields;
