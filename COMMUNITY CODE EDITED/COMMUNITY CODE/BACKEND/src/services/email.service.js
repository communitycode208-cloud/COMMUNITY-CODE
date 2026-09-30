import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendResetPasswordEmail = async (
  email,
  resetToken
) => {
  const resetUrl =
    `http://localhost:5173/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"Community Code" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Reset Your Password</h2>

        <p>
          You requested to reset your Community Code password.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in 15 minutes.
        </p>

        <p>
          If you did not request this, you can safely ignore this email.
        </p>
      </div>
    `
  });
};