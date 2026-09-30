import mongoose from "mongoose";

const accessCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    used: {
      type: Boolean,
      default: false
    },

    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    usedAt: {
      type: Date,
      default: null
    },

    expiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const AccessCode = mongoose.model(
  "AccessCode",
  accessCodeSchema
);