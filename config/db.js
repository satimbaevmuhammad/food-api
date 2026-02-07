import mongoose from "mongoose";
import { config } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
