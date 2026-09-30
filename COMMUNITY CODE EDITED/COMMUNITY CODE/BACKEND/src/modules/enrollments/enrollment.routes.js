import { Router } from "express";

import {
  enroll,
  getEnrollments,
  completeCourseLesson,
  getSingleEnrollment
} from "./enrollment.controller.js";

import { authentication } from "../../middleware/authentication.js";

const router = Router();

router.get(
  "/",
  authentication,
  getEnrollments
);

router.get(
  "/:courseId",
  authentication,
  getSingleEnrollment
);

router.post(
  "/",
  authentication,
  enroll
);

router.post(
  "/:courseId/lessons/:lessonId/complete",
  authentication,
  completeCourseLesson
);

export default router;