import nodemailer from "nodemailer";

import {
  env,
} from "../config/env.js";

const transporter =
  env.mailUser &&
  env.mailPassword
    ? nodemailer.createTransport({
        service:
          env.mailService,

        auth: {
          user:
            env.mailUser,

          pass:
            env.mailPassword,
        },
      })
    : null;

export async function sendPasswordResetEmail({
  to,
  name,
  token,
}) {
  const resetUrl =
    `${env.resetPasswordUrl}?token=${encodeURIComponent(
      token,
    )}`;

  if (!transporter) {
    if (
      env.nodeEnv !==
      "production"
    ) {
      console.warn(
        "\n[BugLens DEV] Password reset URL:",
        resetUrl,
        "\n",
      );

      return;
    }

    throw new Error(
      "Password reset email service is not configured.",
    );
  }

  await transporter.sendMail({
    from:
      env.mailFrom,

    to,

    subject:
      "Reset your BugLens password",

    text: `
Hi ${name || "there"},

Someone requested a password reset for your BugLens account.

Open this link to create a new password:

${resetUrl}

This link expires in 15 minutes.

If you didn't request this, you can safely ignore this email.
    `.trim(),

    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>Reset your BugLens password</h2>

        <p>
          Hi ${name || "there"},
        </p>

        <p>
          We received a request to reset your BugLens password.
        </p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              border-radius:8px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              font-weight:600;
            "
          >
            Reset password
          </a>
        </p>

        <p>
          This link expires in 15 minutes.
        </p>

        <p>
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `.trim(),
  });
}