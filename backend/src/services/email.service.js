import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log("VERIFY ERROR:", err);
  } else {
    console.log("SMTP Server Ready");
  }
});

export const sendOTPEmail = async (email, otp) => {

  try {
    const info = await transporter.sendMail({
      from: `"Tech Monster" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Tech Monster",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>Email Verification</h2>

          <p>Your verification code is:</p>

          <h1 style="color:#2563eb">${otp}</h1>

          <p>This OTP will expire in <b>10 minutes</b>.</p>

          <p>If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

  } catch (error) {

    console.log("❌ Email Error:", error.message);

    throw error;

  }
};

export const sendResetPasswordOTP = async (email, otp) => {

  try {

    await transporter.sendMail({

      from: `"Tech Monster" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Reset Your Password - Tech Monster",

      html: `

                <div style="font-family:Arial,sans-serif;padding:20px">

                    <h2>Password Reset Request</h2>

                    <p>Your password reset OTP is:</p>

                    <h1 style="color:#2563eb;letter-spacing:5px">

                        ${otp}

                    </h1>

                    <p>This OTP will expire in <strong>10 minutes</strong>.</p>

                    <p>If you did not request a password reset, please ignore this email.</p>

                    <br>

                    <p><strong>Tech Monster Pvt. Ltd.</strong></p>

                </div>

            `

    });

  } catch (error) {

    console.log("❌ Reset Password Email Error:", error.message);

    throw error;

  }

};


export const sendApplicationStatusEmail = async (email, status) => {

  try {

    await transporter.sendMail({

      from: `"Tech Monster" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "Application Status Updated",

      html: `
                <h2>Application Status</h2>

                <p>Your application status has been updated.</p>

                <h3>Status: ${status}</h3>

                <p>Thank you for using Tech Monster.</p>
            `

    });

  } catch (error) {

    console.log(error);

  }

};


export const sendCertificateEmail = async (

  email,

  pdfPath

) => {

  try {

    await transporter.sendMail({

      from: `"Tech Monster" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "🎉 Internship Completion Certificate",

      html: `

                <div style="font-family:Arial,sans-serif">

                    <h2>Congratulations 🎉</h2>

                    <p>

                        Your internship has been successfully completed.

                    </p>

                    <p>

                        Your Internship Completion Certificate is attached with this email.

                    </p>

                    <br>

                    <p>

                        Best Wishes,

                    </p>

                    <strong>

                        Tech Monster Pvt. Ltd.

                    </strong>

                </div>

            `,

      attachments: [

        {

          filename: "Internship-Certificate.pdf",

          path: pdfPath

        }

      ]

    });

  } catch (error) {

    console.log(

      "❌ Certificate Email Error:",

      error.message

    );

    throw error;

  }

};

