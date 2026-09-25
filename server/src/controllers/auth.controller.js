import bcrypt from "bcryptjs";

import {
  createHash,
  randomBytes,
} from "node:crypto";

import {
  User,
} from "../models/User.js";

import {
  signAccessToken,
} from "../utils/jwt.js";

import {
  clearAuthCookie,
  setAuthCookie,
} from "../utils/cookies.js";

import {
  sendPasswordResetEmail,
} from "../services/email.service.js";

function sanitizeUser(
  user,
) {
  return {
    id: String(
      user._id,
    ),

    name: user.name,

    email: user.email,

    createdAt:
      user.createdAt,

    agreedToTermsAt:
      user.agreedToTermsAt,
  };
}

function hashResetToken(
  token,
) {
  return createHash(
    "sha256",
  )
    .update(token)
    .digest("hex");
}

/* =========================================================
   Register
   ========================================================= */

export async function register(
  request,
  response,
) {
  const {
    name,
    email,
    password,
    agreeToTerms,
  } =
    request.body;

  if (
    !name?.trim() ||
    !email?.trim() ||
    !password
  ) {
    return response
      .status(400)
      .json({
        message:
          "Name, email and password are required.",
      });
  }

  if (!agreeToTerms) {
    return response
      .status(400)
      .json({
        message:
          "You must accept the terms to create an account.",
      });
  }

  if (
    name.trim().length >
    80
  ) {
    return response
      .status(400)
      .json({
        message:
          "Name must be 80 characters or fewer.",
      });
  }

  if (
    password.length < 8 ||
    password.length > 72
  ) {
    return response
      .status(400)
      .json({
        message:
          "Password must be between 8 and 72 characters.",
      });
  }

  const normalizedEmail =
    email
      .trim()
      .toLowerCase();

  const existingUser =
    await User.findOne({
      email:
        normalizedEmail,
    })
      .select("_id")
      .lean();

  if (existingUser) {
    return response
      .status(409)
      .json({
        message:
          "An account with this email already exists.",
      });
  }

  const passwordHash =
    await bcrypt.hash(
      password,
      12,
    );

  const user =
    await User.create({
      name:
        name.trim(),

      email:
        normalizedEmail,

      passwordHash,

      agreedToTermsAt:
        new Date(),
    });

  const token =
    signAccessToken(
      user,
    );

  setAuthCookie(
    response,
    token,
    {
      rememberMe: true,
    },
  );

  return response
    .status(201)
    .json({
      user:
        sanitizeUser(
          user,
        ),
    });
}

/* =========================================================
   Login
   ========================================================= */

export async function login(
  request,
  response,
) {
  const {
    email,
    password,
    rememberMe = true,
  } =
    request.body;

  if (
    !email?.trim() ||
    !password
  ) {
    return response
      .status(400)
      .json({
        message:
          "Email and password are required.",
      });
  }

  const user =
    await User.findOne({
      email:
        email
          .trim()
          .toLowerCase(),
    }).select(
      "+passwordHash",
    );

  if (!user) {
    return response
      .status(401)
      .json({
        message:
          "Invalid email or password.",
      });
  }

  const validPassword =
    await bcrypt.compare(
      password,
      user.passwordHash,
    );

  if (!validPassword) {
    return response
      .status(401)
      .json({
        message:
          "Invalid email or password.",
      });
  }

  const expiresIn =
    rememberMe
      ? undefined
      : "2h";

  const token =
    signAccessToken(
      user,
      expiresIn,
    );

  setAuthCookie(
    response,
    token,
    {
      rememberMe:
        Boolean(
          rememberMe,
        ),
    },
  );

  return response
    .json({
      user:
        sanitizeUser(
          user,
        ),
    });
}

/* =========================================================
   Current user
   ========================================================= */

export async function me(
  request,
  response,
) {
  return response.json({
    user:
      sanitizeUser(
        request.user,
      ),
  });
}

/* =========================================================
   Logout
   ========================================================= */

export async function logout(
  request,
  response,
) {
  await User.findByIdAndUpdate(
    request.user._id,
    {
      $inc: {
        sessionVersion: 1,
      },
    },
  );

  clearAuthCookie(
    response,
  );

  return response
    .status(204)
    .send();
}

/* =========================================================
   Forgot password
   ========================================================= */

export async function forgotPassword(
  request,
  response,
) {
  const email =
    request.body?.email
      ?.trim()
      .toLowerCase();

  const genericResponse = {
    message:
      "If an account exists for this email, a password reset link has been sent.",
  };

  if (!email) {
    return response.json(
      genericResponse,
    );
  }

  const user =
    await User.findOne({
      email,
    }).select(
      "+resetPasswordTokenHash +resetPasswordExpiresAt",
    );

  if (!user) {
    return response.json(
      genericResponse,
    );
  }

  const rawToken =
    randomBytes(32)
      .toString("hex");

  user.resetPasswordTokenHash =
    hashResetToken(
      rawToken,
    );

  user.resetPasswordExpiresAt =
    new Date(
      Date.now() +
        15 * 60 * 1000,
    );

  await user.save();

  try {
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      token: rawToken,
    });
  } catch (error) {
    user.resetPasswordTokenHash =
      null;

    user.resetPasswordExpiresAt =
      null;

    await user.save();

    console.error(
      "Password reset email failed:",
      error,
    );

    return response
      .status(500)
      .json({
        message:
          "Unable to send the password reset email. Please try again later.",
      });
  }

  return response.json(
    genericResponse,
  );
}

/* =========================================================
   Reset password
   ========================================================= */

export async function resetPassword(
  request,
  response,
) {
  const {
    token,
    password,
  } =
    request.body;

  if (
    !token ||
    !password
  ) {
    return response
      .status(400)
      .json({
        message:
          "Reset token and password are required.",
      });
  }

  if (
    password.length < 8 ||
    password.length > 72
  ) {
    return response
      .status(400)
      .json({
        message:
          "Password must be between 8 and 72 characters.",
      });
  }

  const tokenHash =
    hashResetToken(
      token,
    );

  const user =
    await User.findOne({
      resetPasswordTokenHash:
        tokenHash,

      resetPasswordExpiresAt:
        {
          $gt:
            new Date(),
        },
    }).select(
      "+resetPasswordTokenHash +resetPasswordExpiresAt",
    );

  if (!user) {
    return response
      .status(400)
      .json({
        message:
          "This password reset link is invalid or has expired.",
      });
  }

  user.passwordHash =
    await bcrypt.hash(
      password,
      12,
    );

  user.resetPasswordTokenHash =
    null;

  user.resetPasswordExpiresAt =
    null;

  user.sessionVersion += 1;

  await user.save();

  clearAuthCookie(
    response,
  );

  return response.json({
    message:
      "Password updated successfully. Please log in again.",
  });
}