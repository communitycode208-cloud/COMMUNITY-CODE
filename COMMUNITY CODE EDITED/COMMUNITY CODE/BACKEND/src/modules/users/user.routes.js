import { Router } from "express";

import {
  getProfile,
  updateProfile,
  updatePassword,
  getUsers,
  updateRole,
} from "./user.controller.js";

import { authentication } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authorization.js";

const router = Router();

router.get(
  "/",
  authentication,
  authorization(["admin"]),
  getUsers
);

router.patch(
  "/:id/role",
  authentication,
  authorization(["admin"]),
  updateRole
);

router.get(
  "/me",
  authentication,
  getProfile
);

router.patch(
  "/me",
  authentication,
  updateProfile
);

router.patch(
  "/me/password",
  authentication,
  updatePassword
);

export default router;