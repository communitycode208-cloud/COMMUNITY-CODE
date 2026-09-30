import {
  createEnrollment,
  getMyEnrollments,
  completeLesson,
  getEnrollmentByCourse
} from "./enrollment.service.js";

export const enroll = async (req, res, next) => {
  try {
    const enrollment = await createEnrollment(
      req.user.id,
      req.body.courseId
    );

    res.status(201).json({
      message: "Enrollment created successfully",
      enrollment
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollments = async (req, res, next) => {
  try {
    const enrollments = await getMyEnrollments(req.user.id);

    res.status(200).json({
      enrollments
    });
  } catch (error) {
    next(error);
  }
};

export const completeCourseLesson = async (
  req,
  res,
  next
) => {
  try {
    const enrollment = await completeLesson(
      req.user.id,
      req.params.courseId,
      req.params.lessonId
    );

    res.status(200).json({
      message: "Lesson completed successfully",
      enrollment
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleEnrollment = async (
  req,
  res,
  next
) => {
  try {
    const enrollment = await getEnrollmentByCourse(
      req.user.id,
      req.params.courseId
    );

    res.status(200).json({
      enrollment
    });
  } catch (error) {
    next(error);
  }
};