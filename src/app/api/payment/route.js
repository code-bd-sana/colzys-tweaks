// app/api/payment/route.js
import nodemailer from "nodemailer";
import Stripe from "stripe";

// Stripe secret key environment variable থেকে নিন
const stripe = new Stripe(
  "sk_test_51PKiIJP0aOrzI3fiewuaLvNTmTlCNqCCRWks27OS88VsRJj8b4Eklts5g7igzcUChBeaxpFCfWJBDgFwshhmwUMb00KlvIhKu0",
);

// POST request: PaymentIntent create করতে
export async function POST(request) {
  try {
    const body = await request.json();
    const { pack, user, total } = body;

    // Validation
    if (!pack || !user || !total) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const amount = Math.round(total * 100);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: `Payment for ${pack.name}`,
      metadata: {
        customer_email: user.email,
        customer_name: user.fullName || "Anonymous",
        pack_name: pack.name,
        pack_price: `$${pack.price}`,
        user_discord: user.discord || "",
        user_notes: user.notes || "",
        discount: body.discount || "",
        coupon: body.coupon || "",
      },
      payment_method_types: ["card"],
    });

    console.log("PaymentIntent created:", paymentIntent.id);

    return Response.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe API Error:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// PUT request: Payment confirm হলে email send করতে
export async function PUT(request) {
  try {
    const body = await request.json();
    const { paymentIntentId, email, name, packName, amount } = body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
      return Response.json(
        {
          success: false,
          error: "Payment not completed or failed",
        },
        { status: 400 },
      );
    }

    // Check if email already sent (optional)
    if (paymentIntent.metadata.email_sent === "true") {
      return Response.json({
        success: true,
        message: "Email already sent previously",
      });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "bannah76769@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "noqq kzxv olzf clzz",
      },
    });

    // Determine download link based on pack name
    let downloadLink;

    // Pack name check with case-insensitive matching
    const packNameLower = packName.toLowerCase();

    if (packNameLower.includes("extreme") || packNameLower.includes("pro")) {
      // Extreme Pack এবং Pro Pack - "all" link
      downloadLink = `https://colzys-tweaks.vercel.app/file/extreme/JA4KuAc6475SMWzjojzHgrzypka4ASzKESI8JBKhf10jkvO7365TeEHqLFa5eWQK`;
    } else if (packNameLower.includes("basic")) {
      // Basic Pack - "basic" link
      downloadLink = `https://colzys-tweaks.vercel.app/all/fYt6jNkMpqR3LxZvBw9Ct2SdE7gH4uQrXaP1oVbNcM8kLpJhGfD3sRwE5tYqA`;
    } else {
      // Default fallback - all link
      downloadLink = `https://colzys-tweaks.vercel.app/all/JA4KuAc6475SMWzjojzHgrzypka4ASzKESI8JBKhf10jkvO7365TeEHqLFa5eWQK`;
    }

    // Add query parameters for tracking
    const finalDownloadLink = `${downloadLink}`;

    // Email template
    const mailOptions = {
      from: `"Gaming Service" <${process.env.EMAIL_USER || "bannah76769@gmail.com"}>`,
      to: email,
      subject: `🔐 Secure Download Access – ${packName}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width:600px; margin:auto;">
          <div style="background:#0b1116; padding:30px; border-radius:12px;">
            <h2 style="color:#00F9A1; margin-bottom:10px;">🎮 Access Granted - ${packName}</h2>
            <p style="color:#a4c7d6; line-height:1.6;">
              Thank you for your purchase! Your payment has been verified successfully.
              You can now download your purchased content using the secure link below.
            </p>

            <div style="background:#0F1B24; padding:20px; border-radius:10px; margin-top:20px;">
              <h3 style="color:#00F9A1; margin-top:0;">Order Details</h3>
              <p style="color:white; margin:8px 0;"><strong>Package:</strong> ${packName}</p>
              <p style="color:white; margin:8px 0;"><strong>Amount Paid:</strong> $${amount}</p>
              <p style="color:white; margin:8px 0;"><strong>Order ID:</strong> ${paymentIntentId}</p>
              <p style="color:white; margin:8px 0;"><strong>Customer:</strong> ${name}</p>
              <p style="color:white; margin:8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="color:white; margin:8px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p style="color:white; margin:8px 0;"><strong>Access Type:</strong> 
                ${packNameLower.includes("extreme") || packNameLower.includes("pro") ? "Full Access (All Files)" : "Basic Access"}
              </p>
            </div>

            <div style="margin-top:30px; text-align:center;">
              <a href="${finalDownloadLink}"
                 style="
                   display:inline-block;
                   background:linear-gradient(90deg,#00E9E7,#00F9A1);
                   color:black;
                   padding:14px 32px;
                   border-radius:16px;
                   font-weight:600;
                   text-decoration:none;
                   font-size:16px;
                   margin:10px;
                 ">
                🔗 Download ${packName}
              </a>
            </div>

            <div style="margin-top:25px; padding:15px; background:#1a2a3a; border-radius:8px;">
              <h4 style="color:#00F9A1; margin-top:0;">Package Information:</h4>
              <ul style="color:#a4c7d6; padding-left:20px;">
                ${
                  packNameLower.includes("extreme") ||
                  packNameLower.includes("pro")
                    ? `<li>✅ Complete package with all features</li>
                     <li>✅ Access to premium content</li>
                     <li>✅ Full download access</li>`
                    : `<li>✅ Basic package access</li>
                     <li>✅ Standard features only</li>
                     <li>✅ Limited content access</li>`
                }
              </ul>
            </div>

            <div style="margin-top:25px; padding:15px; background:#1a2a3a; border-radius:8px;">
              <h4 style="color:#00F9A1; margin-top:0;">Important Instructions:</h4>
              <ul style="color:#a4c7d6; padding-left:20px;">
                <li>This download link will expire in 24 hours</li>
                <li>Do not share this link with anyone</li>
                <li>If you face any issues, reply to this email</li>
                <li>Keep this email for future reference</li>
                <li>Link is specific to your purchased package</li>
              </ul>
            </div>

            <p style="color:#6faabf; font-size:13px; margin-top:25px; text-align:center; border-top:1px solid #2a3a4a; padding-top:15px;">
              This link is token‑protected and monitored.<br/>
              © 2024 Gaming Service. All rights reserved.
            </p>
          </div>
        </div>
      `,
      // Text version for email clients that don't support HTML
      text: `
        Access Granted - ${packName}
        
        Thank you for your purchase! Your payment has been verified successfully.
        
        Order Details:
        - Package: ${packName}
        - Amount: $${amount}
        - Order ID: ${paymentIntentId}
        - Customer: ${name}
        - Email: ${email}
        - Access Type: ${packNameLower.includes("extreme") || packNameLower.includes("pro") ? "Full Access (All Files)" : "Basic Access"}
        
        Download Link: ${finalDownloadLink}
        
        Package Information:
        ${
          packNameLower.includes("extreme") || packNameLower.includes("pro")
            ? "- Complete package with all features\n- Access to premium content\n- Full download access"
            : "- Basic package access\n- Standard features only\n- Limited content access"
        }
        
        Important Instructions:
        - This download link will expire in 24 hours
        - Do not share this link with anyone
        - If you face any issues, reply to this email
        - Keep this email for future reference
        - Link is specific to your purchased package
        
        This link is token-protected and monitored.
        © 2024 Gaming Service. All rights reserved.
      `,
    };

    // Send email
    const sendMail = await transporter.sendMail(mailOptions);
    console.log(`Email sent for ${packName} to: ${email}`, sendMail.messageId);

    // Update metadata to mark email as sent
    await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        ...paymentIntent.metadata,
        email_sent: "true",
        email_sent_at: new Date().toISOString(),
        download_link_sent: finalDownloadLink,
        pack_type:
          packNameLower.includes("extreme") || packNameLower.includes("pro")
            ? "premium"
            : "basic",
        pack_name: packName,
      },
    });

    return Response.json({
      success: true,
      message: "Email sent successfully",
      emailId: sendMail.messageId,
      packType:
        packNameLower.includes("extreme") || packNameLower.includes("pro")
          ? "premium"
          : "basic",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to send email",
      },
      { status: 500 },
    );
  }
}
