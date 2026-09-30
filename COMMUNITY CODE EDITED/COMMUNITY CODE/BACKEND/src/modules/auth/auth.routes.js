import { Router } from "express";
import {
  register,
  loginUser,
  getCurrentUser,
  forgotPasswordRequest,
  resetPasswordRequest
} from "./auth.controller.js";
import { authentication } from "../../middleware/authentication.js";

const router = Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/me", authentication, getCurrentUser);
router.post("/forgot-password", forgotPasswordRequest);
router.post("/reset-password", resetPasswordRequest);

export default router;