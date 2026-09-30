import { Enrollment } from "../../DB/models/enrollment.model.js";

import { Course } from "../../DB/models/course.model.js";

import { Lesson } from "../../DB/models/lesson.model.js";

export const createEnrollment = async (userId, courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingEnrollment = await Enrollment.findOne({
    userId,
    courseId
  });

  if (existingEnrollment) {
    throw new Error("Already enrolled in this course");
  }

  const enrollment = await Enrollment.create({
    userId,
    courseId
  });

  return enrollment;
};

export const getMyEnrollments = async (userId) => {
  return await Enrollment.find({ userId })
    .populate("courseId")
    .populate("currentLessonId")
    .populate("completedLessons")
    .sort({ enrolledAt: -1 });
};

export const completeLesson = async (
  userId,
  courseId,
  lessonId
) => {
  const enrollment = await Enrollment.findOne({
    userId,
    courseId
  });

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  const lesson = await Lesson.findOne({
    _id: lessonId,
    courseId
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const alreadyCompleted =
    enrollment.completedLessons.some(
      (id) => id.toString() === lessonId.toString()
    );

  if (!alreadyCompleted) {
    enrollment.completedLessons.push(lessonId);
  }

  const totalLessons = await Lesson.countDocuments({
    courseId
  });

  const validLessonIds = await Lesson.find({
    courseId
  }).distinct("_id");

  const validLessonIdSet = new Set(
    validLessonIds.map((id) => id.toString())
  );

  const completedLessonIds =
    enrollment.completedLessons.filter((id) =>
      validLessonIdSet.has(id.toString())
    );

  enrollment.completedLessons = completedLessonIds;

  const completedCount =
    completedLessonIds.length;

  enrollment.progress =
    totalLessons === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (completedCount / totalLessons) * 100
          )
        );

  enrollment.currentLessonId = lessonId;

  if (enrollment.progress === 100) {
    enrollment.completedAt = new Date();
  } else {
    enrollment.completedAt = null;
  }

  await enrollment.save();

  return enrollment;
};

export const getEnrollmentByCourse = async (
  userId,
  courseId
) => {
  const enrollment = await Enrollment.findOne({
    userId,
    courseId
  })
    .populate("courseId")
    .populate("currentLessonId")
    .populate("completedLessons");

  if (!enrollment) {
    throw new Error("Enrollment not found");
  }

  return enrollment;
};