import { Lesson } from "../../DB/models/lesson.model.js";

import { Course } from "../../DB/models/course.model.js";

export const createLesson = async (courseId, inputs) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const allowedFields = [
    "title",
    "description",
    "duration",
    "youtubeId",
    "order"
  ];

  const lessonData = {};

  for (const field of allowedFields) {
    if (inputs[field] !== undefined) {
      lessonData[field] = inputs[field];
    }
  }

  const lesson = await Lesson.create({
    ...lessonData,
    courseId
  });

  return lesson;
};

export const getCourseLessons = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  return await Lesson.find({ courseId }).sort({ order: 1 });
};

export const updateLesson = async (lessonId, inputs) => {
  const allowedFields = [
    "title",
    "description",
    "duration",
    "youtubeId",
    "order"
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (inputs[field] !== undefined) {
      updates[field] = inputs[field];
    }
  }

  const lesson = await Lesson.findByIdAndUpdate(
    lessonId,
    updates,
    {
      new: true,
      runValidators: true
    }
  );

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return lesson;
};

export const deleteLesson = async (lessonId) => {
  const lesson = await Lesson.findByIdAndDelete(lessonId);

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return lesson;
};