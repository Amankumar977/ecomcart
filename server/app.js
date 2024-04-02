import express from "express";
import "dotenv/config";
import cors from "cors";
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
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cors done",
  });
});
export default app;
