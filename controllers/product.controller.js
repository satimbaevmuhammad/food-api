import Product from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
  const { restaurant } = req.query;

  let filter = {};
  if (restaurant) filter.restaurant = restaurant;

  const products = await Product.find(filter).populate("restaurant");

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("restaurant");
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, price, restaurant } = req.body;

  const product = await Product.create({
    name,
    image,
    price,
    restaurant
  });

  res.status(201).json(product);
});
