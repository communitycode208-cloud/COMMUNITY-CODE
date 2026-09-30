import {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse
} from "./course.service.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await getCourses();

    res.status(200).json({
      courses
    });
  } catch (error) {
    next(error);
  }
};

export const createNewCourse = async (req, res, next) => {
  try {
    const course = await createCourse(req.body);

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleCourse = async (req, res, next) => {
  try {
    const course = await getCourseById(req.params.id);

    res.status(200).json({
      course
    });
  } catch (error) {
    next(error);
  }
};

export const updateSingleCourse = async (req, res, next) => {
  try {
    const course = await updateCourse(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Course updated successfully",
      course
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleCourse = async (req, res, next) => {
  try {
    await deleteCourse(req.params.id);

    res.status(200).json({
      message: "Course deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};