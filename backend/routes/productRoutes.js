import express from "express";

// import { getProducts ,getProductById} from "../controller/productController.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // createProduct,
  // updateProduct,
  // deleteProduct,
  // createProductReview,
  // getTopProducts,
} from "../controller/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
// const {getProducts}  = require("../controller/productController")
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// admin route
router.route("/").post(protect, admin, createProduct);
router
  .route("/:id")
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
