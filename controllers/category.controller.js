import Category from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const category = await Category.create({ name, image });

  res.status(201).json(category);
});
