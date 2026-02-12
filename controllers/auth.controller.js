import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { generateCode } from "../utils/generateCode.js";
import { sendEmail } from "../services/email.service.js";
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



// VERIFY EMAIL
export const verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.verificationCode !== code)
    throw new Error("Invalid code");

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.json({ message: "Email verified" });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Wrong password");

  res.json({ token: generateToken(user._id) });
});

// FORGOT PASSWORD
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const code = generateCode();
  user.resetPasswordCode = code;
  await user.save();

  await sendEmail(email, "Reset password", `Code: ${code}`);

  res.json({ message: "Reset code sent" });
});

// RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (user.resetPasswordCode !== code)
    throw new Error("Wrong code");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordCode = null;
  await user.save();

  res.json({ message: "Password updated" });
});
