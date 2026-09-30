import {
  createLesson,
  getCourseLessons,
  updateLesson,
  deleteLesson
} from "./lesson.service.js";

export const createNewLesson = async (req, res, next) => {
  try {
    const lesson = await createLesson(
      req.params.courseId,
      req.body
    );

    res.status(201).json({
      message: "Lesson created successfully",
      lesson
    });
  } catch (error) {
    next(error);
  }
};

export const getLessons = async (req, res, next) => {
  try {
    const lessons = await getCourseLessons(
      req.params.courseId
    );

    res.status(200).json({
      lessons
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleLesson = async (
  req,
  res,
  next
) => {
  try {
    const lesson = await updateLesson(
      req.params.lessonId,
      req.body
    );

    res.status(200).json({
      message: "Lesson updated successfully",
      lesson
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleLesson = async (
  req,
  res,
  next
) => {
  try {
    await deleteLesson(req.params.lessonId);

    res.status(200).json({
      message: "Lesson deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};