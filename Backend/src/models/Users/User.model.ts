import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate-v2";
import { TOKEN_DATA } from "../../config/token";
import CONFIG from "../../config";
import * as bcrypt from "bcrypt";
import { IUser } from "./types";
import { ModelWithPagination } from "../types";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("password")
  .get(function (this: any) {
    return this.hashedPassword;
  })
  .set(function (this: any, password: string) {
    this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  });

UserSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.methods.setPassword = function (password: string) {
  this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      type: TOKEN_DATA.ACCESS.type,
    },
    CONFIG.JWT_SECRET,
    { expiresIn: TOKEN_DATA.ACCESS.expiresIn }
  );
};

UserSchema.plugin(mongoosePaginate);

const UsersSchemaWithPagination: ModelWithPagination<IUser> =
  mongoose.model<IUser>("Users", UserSchema) as ModelWithPagination<IUser>;

export default UsersSchemaWithPagination;
