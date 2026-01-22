import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com", // e.g., 'smtp.gmail.com'
      port: 465, // e.g., 587 for TLS
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    // User confirmation email template (inline HTML with Tailwind CSS)
    const userEmailHtml = `
      <div style="background-color: #f1f5f9; font-family: sans-serif; padding: 20px;">
        <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #059669; border-radius: 8px;">
          <div style="background-color: #059669; color: #ffffff; text-align: center; padding: 24px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <h1 style="font-size: 24px; font-weight: bold;">SufiPulse</h1>
            <p style="color: #d1fae5;">Connecting Souls Through Sacred Words</p>
          </div>
          <div style="padding: 24px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #065f46; margin-bottom: 16px;">
              Thank You for Reaching Out, ${name}!
            </h2>
            <p style="color: #4b5563; margin-bottom: 16px;">
              We've received your message and our team is eager to connect with you. 
              Your inquiry about "${subject}" is important to us, and we'll get back to you soon.
            </p>
            <div style="background-color: #ecfdf5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 500; color: #047857; margin-bottom: 8px;">Your Message:</h3>
              <p style="color: #4b5563;">${message}</p>
            </div>
            <p style="color: #4b5563; margin-bottom: 16px;">
              While you wait, explore our soulful Kalams and spiritual poetry on our platform. 
              We're honored to have you as part of our sacred community.
            </p>
            <a
              href="https://sufipulse.com"
              style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; transition: background-color 0.2s;"
              onmouseover="this.style.backgroundColor='#047857'"
              onmouseout="this.style.backgroundColor='#059669'"
            >
              Visit SufiPulse
            </a>
          </div>
          <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="color: #4b5563; font-size: 14px;">
              With Divine Blessings,<br />
              The SufiPulse Team<br />
              <a href="mailto:connect@sufipulse.com" style="color: #059669; text-decoration: none;">connect@sufipulse.com</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Admin notification email template (inline HTML with Tailwind CSS)
    const adminEmailHtml = `
      <div style="background-color: #f1f5f9; font-family: sans-serif; padding: 20px;">
        <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #059669; border-radius: 8px;">
          <div style="background-color: #059669; color: #ffffff; text-align: center; padding: 24px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <h1 style="font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
            <p style="color: #d1fae5;">SufiPulse Contact Notification</p>
          </div>
          <div style="padding: 24px;">
            <h2 style="font-size: 20px; font-weight: 600; color: #065f46; margin-bottom: 16px;">
              New Message Received
            </h2>
            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 500; color: #047857;">From:</h3>
              <p style="color: #4b5563;">${name} &lt;${email}&gt;</p>
            </div>
            <div style="margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 500; color: #047857;">Subject:</h3>
              <p style="color: #4b5563;">${subject}</p>
            </div>
            <div style="background-color: #ecfdf5; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="font-size: 16px; font-weight: 500; color: #047857; margin-bottom: 8px;">Message:</h3>
              <p style="color: #4b5563;">${message}</p>
            </div>
            <p style="color: #4b5563;">
              Please review this inquiry and respond promptly to maintain our sacred connection with the community.
            </p>
          </div>
          <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <p style="color: #4b5563; font-size: 14px;">
              SufiPulse Team<br />
              <a href="mailto:connect@sufipulse.com" style="color: #059669; text-decoration: none;">connect@sufipulse.com</a>
            </p>
          </div>
        </div>
      </div>
    `;

    
    const userEmail = await transporter.sendMail({

      from: '"SufiPulse" <contact@mail.sufipulse.com>',
      to: email,
      subject: "Thank You for Contacting SufiPulse",
      html: userEmailHtml,
    });
    // Send notification email to admin
    const adminEmail = await transporter.sendMail({
      from: '"SufiPulse" <contact@mail.sufipulse.com>',
      to: "contact@sufipulse.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: adminEmailHtml,
    });

    // Check if both emails were sent successfully
    if (adminEmail.accepted.length > 0 && userEmail.accepted.length > 0) {
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 },
      );
    } else {
      throw new Error("Failed to send one or more emails");
    }
  } catch (error: any) {
    console.error("Error sending email:");
    console.log(error);

    console.error({
      message: error?.message,
      code: error?.code,
      response: error?.response,
      responseCode: error?.responseCode,
      stack: error?.stack,
    });

    return NextResponse.json(
      { error: error?.message || "Failed to send message" },
      { status: 500 },
    );
  }
}
