import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 120
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500
    },

    longDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 5000
    },

    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    language: {
      type: String,
      enum: ["en", "ar"],
      default: "en"
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true
    },

    duration: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50
    },

    lessons: {
      type: Number,
      default: 0,
      min: 0
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    thumbnail: {
      type: String,
      default: "",
      trim: true
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    learningPoints: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

export const Course = mongoose.model("Course", courseSchema);