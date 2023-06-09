import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 *  @description Fetch all products
 *  @route GET/api/products
 *  @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/**
 *  @description Fetch a product
 *  @route GET/api/products/:id
 *  @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Resource not found");
  }
  res.json(product);
});

/**
 *  @description create products
 *  @route POST/api/products
 *  @access Private  / Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numOfReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 *  @description update products
 *  @route PUT/api/products/:id
 *  @access Private / Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
/**
 *  @description delete a product
 *  @route DELETE/api/products/:id
 *  @access Private / Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// export { getProducts, getProductById };
export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
