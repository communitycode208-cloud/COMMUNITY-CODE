import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    duration: {
      type: String,
      required: true
    },

    youtubeId: {
      type: String,
      default: ""
    },

    order: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

lessonSchema.index(
  { courseId: 1, order: 1 },
  { unique: true }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);