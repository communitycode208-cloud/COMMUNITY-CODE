import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    currentLessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      default: null
    },

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
      }
    ],

    enrolledAt: {
      type: Date,
      default: Date.now
    },

    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

enrollmentSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

export const Enrollment = mongoose.model(
  "Enrollment",
  enrollmentSchema
);