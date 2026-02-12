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
 */
router.get("/:id", getProductById);


export default router;
