import express from "express";
import { dbConnect } from "./src/dbconfig/dbCongif.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(cors());
dbConnect();
import userRouter from "./src/routers/userRouter.js";
import authRouter from "./src/routers/auth.js";
import productRouter from "./src/routers/productRouter.js";
import cartRouter from "./src/routers/cartRouter.js";
import orderRouter from "./src/routers/orderRouter.js";
import stripeRouter from "./src/routers/stripeRouter.js";
import categoryRouter from "./src/routers/catRouter.js";

app.use("/api/v1/products", productRouter);
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/checkout", stripeRouter);
app.use("/api/v1/category", categoryRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});
app.listen(process.env.PORT || 8000, () => {
  console.log("backend server is running");
});
