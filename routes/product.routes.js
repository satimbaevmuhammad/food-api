import express from "express";
import {
  getProducts,
  getProductById,
  createProduct
} from "../controllers/product.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get products
 *     tags: [Products]
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - price
 *               - restaurant
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cheeseburger
 *               image:
 *                 type: string
 *                 example: https://example.com/burger.jpg
 *               price:
 *                 type: number
 *                 example: 25000
 *               restaurant:
 *                 type: string
 *                 example: 65f8d7b12abc123456789012
 */
router.post("/", createProduct);

export default router;
