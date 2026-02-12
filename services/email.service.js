import { Resend } from "resend";
import { config } from "../config/env.js";

const resend = new Resend(config.RESEND_API_KEY);

export const sendEmail = async (to, subject, text) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text,
  });
};
