import express from "express";
import upload from "../config/multer.js";
import {
  handleCreateProduct,
  handleGetAllProducts,
} from "../controllers/products.js";
const router = express.Router();
/**POST Route */
router
  .route("/create-product")
  .post(upload.array("images", 5), handleCreateProduct);
/**GET Route */
router.route("/getAllProducts").get(handleGetAllProducts);
export default router;
