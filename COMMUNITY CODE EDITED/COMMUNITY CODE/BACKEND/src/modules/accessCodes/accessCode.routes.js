import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import {
  redeemCode,
  createCode,
  getAllAccessCodes,
  deleteCode
} from "./accessCode.controller.js";
import { authorization } from "../../middleware/authorization.js";


const router = Router();


router.post(
  "/",
  authentication,
  authorization(["admin"]),
  createCode
);

router.get(
  "/",
  authentication,
  authorization(["admin"]),
  getAllAccessCodes
);

router.delete(
  "/:id",
  authentication,
  authorization(["admin"]),
  deleteCode
);

router.post(
  "/redeem",
  authentication,
  redeemCode
);

export default router;