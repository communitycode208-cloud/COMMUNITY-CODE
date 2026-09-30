import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";
import {
  createNewLesson,
  getLessons,
  updateSingleLesson,
  deleteSingleLesson
} from "./lesson.controller.js";


const router = Router();

router.get(
  "/courses/:courseId/lessons",
  getLessons
);

router.post(
  "/courses/:courseId/lessons",
  authentication,
  authorization(["admin"]),
  createNewLesson
);

router.patch(
  "/courses/:courseId/lessons/:lessonId",
  authentication,
  authorization(["admin"]),
  updateSingleLesson
);

router.delete(
  "/courses/:courseId/lessons/:lessonId",
  authentication,
  authorization(["admin"]),
  deleteSingleLesson
);

export default router;