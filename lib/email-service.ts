import nodemailer from "nodemailer"
import { Resend } from "resend"

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Configure Resend (alternative email service)
const resend = new Resend(process.env.RESEND_API_KEY)

export type EmailOptions = {
  to: string
  subject: string
  html: string
  text?: string
  from?: string
}

export async function sendEmail(options: EmailOptions) {
  const { to, subject, html, text, from = process.env.EMAIL_FROM } = options

  try {
    // Try sending with nodemailer first
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || "",
      html,
    })

    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Nodemailer error:", error)

    // Fallback to Resend if nodemailer fails
    try {
      const data = await resend.emails.send({
        from: from || "onboarding@resend.dev",
        to,
        subject,
        html,
        text: text || "",
      })

      return { success: true, messageId: data.id }
    } catch (resendError) {
      console.error("Resend error:", resendError)
      throw new Error("Failed to send email through both providers")
    }
  }
}

export async function sendLicenseApprovalEmail(to: string, name: string, licenseNumber: string) {
  return sendEmail({
    to,
    subject: "Your License Application Has Been Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4CAF50;">License Approved</h1>
        <p>Dear ${name},</p>
        <p>We are pleased to inform you that your license application has been approved.</p>
        <p>Your license number is: <strong>${licenseNumber}</strong></p>
        <p>You can now log in to your account to view and download your license certificate.</p>
        <p>Thank you for your patience during the application process.</p>
        <p>Best regards,<br>Association of Certified Caregivers Kenya</p>
      </div>
    `,
  })
}

export async function sendCertificationApprovalEmail(to: string, name: string, certificationType: string) {
  return sendEmail({
    to,
    subject: "Your Certification Has Been Approved",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4CAF50;">Certification Approved</h1>
        <p>Dear ${name},</p>
        <p>We are pleased to inform you that your ${certificationType} certification has been approved.</p>
        <p>You can now log in to your account to view and download your certification.</p>
        <p>Thank you for your dedication to professional development.</p>
        <p>Best regards,<br>Association of Certified Caregivers Kenya</p>
      </div>
    `,
  })
}

export async function sendRenewalReminderEmail(to: string, name: string, documentType: string, expiryDate: string) {
  return sendEmail({
    to,
    subject: `Your ${documentType} is About to Expire`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF9800;">Renewal Reminder</h1>
        <p>Dear ${name},</p>
        <p>This is a friendly reminder that your ${documentType} will expire on ${expiryDate}.</p>
        <p>Please log in to your account to initiate the renewal process.</p>
        <p>Best regards,<br>Association of Certified Caregivers Kenya</p>
      </div>
    `,
  })
}
