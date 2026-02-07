import nodemailer from "nodemailer";
import { config } from "../config/env.js";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: config.EMAIL,
    to,
    subject,
    text
  });
};
