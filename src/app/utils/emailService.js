// app/utils/emailService.js
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bannah76769@gmail.com",
    pass: "noqq kzxv olzf clzz",
  },
});

// Function to send email with attachment
export const sendPaymentSuccessEmail = async (
  userEmail,
  userName,
  packName,
  transactionId,
  amount,
) => {
  try {
    // Determine which zip file to send based on pack
    let attachmentFilename = "";
    let attachmentPath = "";

    if (packName.includes("Extreme")) {
      attachmentFilename = "extreme.zip";
      attachmentPath = path.join(process.cwd(), "public", "extreme.zip");
    } else if (packName.includes("Pro")) {
      attachmentFilename = "full.zip";
      attachmentPath = path.join(process.cwd(), "public", "full.zip");
    } else {
      attachmentFilename = "basic.zip";
      attachmentPath = path.join(process.cwd(), "public", "full.zip"); // Default to full.zip for basic
    }

    // Check if file exists
    if (!fs.existsSync(attachmentPath)) {
      console.error(`File not found: ${attachmentPath}`);
      throw new Error("Package file not found");
    }

    // Read the file
    const fileContent = fs.readFileSync(attachmentPath);

    // Email content
    const mailOptions = {
      from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `🎉 Your ${packName} Purchase is Ready!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Thank You for Your Purchase!</h1>
            <p style="font-size: 18px; margin-top: 10px;">Your ${packName} is ready to download</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Order Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666;">Customer Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">${userName || "Customer"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666;">Package:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">${packName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666;">Amount Paid:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">$${amount}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; color: #666;">Transaction ID:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-family: monospace; color: #666;">${transactionId}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 8px;">
              <h3 style="color: #1a73e8; margin-top: 0;">📦 Your Package is Attached</h3>
              <p>The ${attachmentFilename} file is attached to this email. Download and extract it to get started.</p>
              
              <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #4CAF50;">
                <h4 style="margin-top: 0; color: #333;">Installation Instructions:</h4>
                <ol style="color: #555;">
                  <li>Download the attached ${attachmentFilename} file</li>
                  <li>Extract the zip file to a folder</li>
                  <li>Follow the README.txt instructions</li>
                  <li>If you need help, contact support at Himc798@gmail.com</li>
                </ol>
              </div>
            </div>
            
            <div style="margin-top: 30px; text-align: center; color: #666; font-size: 14px;">
              <p>If you have any questions, feel free to reply to this email or contact us at Himc798@gmail.com</p>
              <p style="margin-top: 20px;">Best regards,<br>Your Company Team</p>
            </div>
          </div>
          
          <div style="background: #333; color: white; text-align: center; padding: 20px; margin-top: 20px; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: attachmentFilename,
          content: fileContent,
          contentType: "application/zip",
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
