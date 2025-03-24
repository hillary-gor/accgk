"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_PASS!,
  },
});

export async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    await transporter.sendMail({
      from: `"Association of Certified Care Givers Kenya" <${process.env.GMAIL_USER!}>`, // ✅ Ensures a valid sender
      to,
      subject,
      html: htmlContent,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: (error as Error).message };
  }
}
