import express from "express";
import {
  handleCreateCategory,
  handleGetAllCategory,
} from "../controllers/categoryController.js";
const router = express.Router();
/**POST ROUTE */
router.route("/createCategory").post(handleCreateCategory);
/**GET ROUTE */
router.route("/getAllCategory").get(handleGetAllCategory);
export default router;
