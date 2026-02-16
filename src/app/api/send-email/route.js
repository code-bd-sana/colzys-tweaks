// app/api/send-email/route.js
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email,
      name,
      packName,
      amount,
      paymentIntentId,
      token, //  token frontend
    } = body;

    if (!email || !packName || !amount || !token) {
      return Response.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // 🔐 Secure download link
    const downloadLink = `https://colzys-tweaks.vercel.app/file/all/${token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "bannah76769@gmail.com",
        pass: "noqq kzxv olzf clzz",
      },
    });

    const mailOptions = {
      from: `"Gaming Service" <bannah76769@gmail.com>`,
      to: email,
      subject: `🔐 Secure Download Access – ${packName}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width:600px; margin:auto;">
          <div style="background:#0b1116; padding:30px; border-radius:12px;">
            <h2 style="color:#00F9A1; margin-bottom:10px;">Access Granted</h2>
            <p style="color:#a4c7d6;">
              Your payment has been verified successfully.
            </p>

            <div style="background:#0F1B24; padding:20px; border-radius:10px; margin-top:20px;">
              <p style="color:white;"><strong>Package:</strong> ${packName}</p>
              <p style="color:white;"><strong>Amount:</strong> $${amount}</p>
              <p style="color:white;"><strong>Order ID:</strong> ${paymentIntentId}</p>
            </div>

            <div style="margin-top:30px; text-align:center;">
              <a href="${downloadLink}"
                 style="
                   display:inline-block;
                   background:linear-gradient(90deg,#00E9E7,#00F9A1);
                   color:black;
                   padding:14px 28px;
                   border-radius:16px;
                   font-weight:600;
                   text-decoration:none;
                 ">
                Download Secure File
              </a>
            </div>

            <p style="color:#6faabf; font-size:13px; margin-top:25px; text-align:center;">
              This link is token‑protected and monitored.<br/>
              Do not share with anyone.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: "Secure download link sent via email",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: "Email sending failed" },
      { status: 500 },
    );
  }
}
