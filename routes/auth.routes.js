import express from "express";
import {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & Authorization APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: User registered, verification code sent to email
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify email with code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               code:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.post("/verify", verifyEmail);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: JWT token returned
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/forgot:
 *   post:
 *     summary: Send password reset code to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *     responses:
 *       200:
 *         description: Reset code sent to email
 */
router.post("/forgot", forgotPassword);

/**
 * @swagger
 * /api/auth/reset:
 *   post:
 *     summary: Reset password using email code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               code:
 *                 type: string
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: newpass123
 *     responses:
 *       200:
 *         description: Password successfully updated
 */
router.post("/reset", resetPassword);

export default router;
