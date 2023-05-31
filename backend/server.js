import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";
import connectDB from "./config/db.js";


connectDB();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    msg: "Welcome to proShop app",
  });
});

app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    data: products,
  });
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  // console.log(req.pars.id);
  res.json({
    success: true,
    data: product,
  });
});

app.listen(port, () => console.log("app is running..."));
