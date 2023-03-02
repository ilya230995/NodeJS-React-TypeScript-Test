import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IProduct } from "./types";
import { ModelWithPagination } from "../types";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongoosePaginate);

const ProductsSchemaWithPagination: ModelWithPagination<IProduct> =
  mongoose.model<IProduct>(
    "Products",
    ProductSchema
  ) as ModelWithPagination<IProduct>;

export default ProductsSchemaWithPagination;
