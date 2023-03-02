import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const CONFIG = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGODB_CLUSTER_URL: process.env.MONGODB_CLUSTER_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
};

export default CONFIG;
