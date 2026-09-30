import { Course } from "../../DB/models/course.model.js";

export const getCourses = async () => {
  return await Course.find().sort({ createdAt: -1 });
};

export const createCourse = async (inputs) => {
  const allowedFields = [
    "title",
    "slug",
    "description",
    "longDescription",
    "category",
    "language",
    "level",
    "duration",
    "price",
    "thumbnail",
    "instructor",
    "learningPoints"
  ];

  const courseData = {};

  for (const field of allowedFields) {
    if (inputs[field] !== undefined) {
      courseData[field] = inputs[field];
    }
  }

  const course = await Course.create(courseData);

  return course;
};

export const getCourseById = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

export const updateCourse = async (courseId, inputs) => {
  const allowedFields = [
    "title",
    "slug",
    "description",
    "longDescription",
    "category",
    "language",
    "level",
    "duration",
    "price",
    "thumbnail",
    "instructor",
    "learningPoints"
  ];

  const updates = {};

  for (const field of allowedFields) {
    if (inputs[field] !== undefined) {
      updates[field] = inputs[field];
    }
  }

  const course = await Course.findByIdAndUpdate(
    courseId,
    updates,
    {
      new: true,
      runValidators: true
    }
  );

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};

export const deleteCourse = async (courseId) => {
  const course = await Course.findByIdAndDelete(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
};