import Restaurant from "../models/restaurant.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find().populate("category");
  res.json(restaurants);
});

export const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate("category");
  res.json(restaurant);
});

export const createRestaurant = asyncHandler(async (req, res) => {
  const { name, image, description, category } = req.body;

  const restaurant = await Restaurant.create({
    name,
    image,
    description,
    category
  });

  res.status(201).json(restaurant);
});
