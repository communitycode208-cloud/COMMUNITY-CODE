import { Router } from "express";

import {
  createNewFile,
  getFiles,
  deleteSingleFile
} from "./file.controller.js";
import upload from "../../middleware/upload.js";
import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";

const router = Router();

router.get(
  "/courses/:courseId/files",
  authentication,
  getFiles
);

router.post(
  "/courses/:courseId/files",
  authentication,
  authorization(["admin"]),
  upload.single("file"),
  createNewFile
);

router.delete(
  "/courses/:courseId/files/:fileId",
  authentication,
  authorization(["admin"]),
  deleteSingleFile
);

export default router;
