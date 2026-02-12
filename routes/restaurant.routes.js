import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant
} from "../controllers/restaurant.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 */
router.get("/", getRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:id", getRestaurantById);


export default router;
