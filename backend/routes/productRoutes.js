import express from "express";

// import { getProducts ,getProductById} from "../controller/productController.js";

import {
  getProducts,
  getProductById,
  // createProduct,
  // updateProduct,
  // deleteProduct,
  // createProductReview,
  // getTopProducts,
} from  "../controller/productController.js"

// const {getProducts}  = require("../controller/productController")
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
