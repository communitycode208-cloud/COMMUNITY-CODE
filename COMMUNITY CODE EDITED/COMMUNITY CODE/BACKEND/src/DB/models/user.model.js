import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9_]+$/,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+?[0-9]{10,15}$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    language: {
      type: String,
      enum: ["en", "ar"],
      default: "en",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);