import app from "./app.js";
import connectDB from "./config/db.js";
import { config } from "./config/env.js";

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(config.PORT, () => {
      console.log(`🚀 Server running on port ${config.PORT}`);
    });

    // Unhandled promise rejection
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err.message);
      server.close(() => process.exit(1));
    });

  } catch (error) {
    console.error("Server start error:", error);
    process.exit(1);
  }
};

startServer();
