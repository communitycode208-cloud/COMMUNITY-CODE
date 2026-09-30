import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true,
      trim: true
    },

    size: {
      type: Number,
      default: 0
    },

    url: {
      type: String,
      required: true,
      trim: true
    },

    publicId: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export const File = mongoose.model("File", fileSchema);