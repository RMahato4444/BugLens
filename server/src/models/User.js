import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 80,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },

      passwordHash: {
        type: String,
        required: true,
        select: false,
      },

      agreedToTermsAt: {
        type: Date,
        required: true,
      },

      sessionVersion: {
        type: Number,
        default: 0,
      },

      resetPasswordTokenHash: {
        type: String,
        default: null,
        select: false,
      },

      resetPasswordExpiresAt: {
        type: Date,
        default: null,
        select: false,
      },
    },

    {
      timestamps: true,
    },
  );

export const User =
  mongoose.model(
    "User",
    userSchema,
  );