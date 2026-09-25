import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    encryptedPayload: {
      type: String,
      default: "",
    },

    // Legacy fields are retained only so previously stored records can still be read.
    // New records are written only to encryptedPayload.
    inputText: {
      type: String,
      default: "",
      maxlength: 50000,
    },

    result: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    file: {
      name: { type: String, default: "" },
      mimeType: { type: String, default: "" },
      size: { type: Number, default: 0 },
    },
  },
  { timestamps: true },
);

export const Analysis = mongoose.model("Analysis", analysisSchema);
