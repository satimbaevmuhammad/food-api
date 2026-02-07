import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "../config/env.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
