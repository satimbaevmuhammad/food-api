import express from "express";
import cors from "cors";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";

const app = express(); // 🔥 AVVAL SHU

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// swagger (app DAN KEYIN!)
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/api/auth", authRoutes);

// not found
app.use(notFound);

// error handler
app.use(errorMiddleware);

export default app;
