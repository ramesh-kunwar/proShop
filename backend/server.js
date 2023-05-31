import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

// Routes
import productRoutes from './routes/productRoutes.js'

connectDB();

const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    msg: "Welcome to proShop app",
  });
});


app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log("app is running..."));
