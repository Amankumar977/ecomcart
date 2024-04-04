import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/products.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(
  cors({
    origin: [process.env.FRONT_END_URL],
    httpOnly: true,
    secure: true,
  })
);
app.use(morgan("tiny"));
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working",
  });
});
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoute);
export default app;
