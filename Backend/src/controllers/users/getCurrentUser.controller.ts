import { Request, Response } from "express";
import UserModel from "../../models/Users/User.model";
import ResponseService from "../../utils/ResponseService";

interface IAuthUser {
  _id: string;
  email: string;
}

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user: any = await UserModel.findById((<any>req).user._id);
    const { _id, email, createdAt, updatedAt } = user.toObject();
    ResponseService.success(res, { _id, email, createdAt, updatedAt });
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default getCurrentUser;


