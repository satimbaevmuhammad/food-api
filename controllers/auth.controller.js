import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// REGISTER
export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed
  });

  res.status(201).json({
    token: generateToken(user._id)
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Wrong password");

  res.json({
    token: generateToken(user._id)
  });
});


// GET ME (profile)
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    id: user._id,
    email: user.email,
    createdAt: user.createdAt
  });
});
