import { Router } from "express";
import {
  getAllCourses,
  createNewCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteSingleCourse
} from "./course.controller.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";

const router = Router();

router.get("/", getAllCourses);

router.get("/:id", getSingleCourse);

router.post(
  "/",
  authentication,
  authorization(["admin"]),
  createNewCourse
);

router.patch(
  "/:id",
  authentication,
  authorization(["admin"]),
  updateSingleCourse
);


router.delete(
  "/:id",
  authentication,
  authorization(["admin"]),
  deleteSingleCourse
);


export default router;