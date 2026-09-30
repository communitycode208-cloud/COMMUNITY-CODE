import express from "express";

import cors from "cors";

import helmet from "helmet";

import { NODE_ENV } from "./config/config.service.js";

import authRouter from "./modules/auth/auth.routes.js";

import { authentication } from "./middleware/authentication.js";

import courseRouter from "./modules/courses/course.routes.js";

import lessonRouter from "./modules/lessons/lesson.routes.js";

import enrollmentRouter from "./modules/enrollments/enrollment.routes.js";

import accessCodeRouter from "./modules/accessCodes/accessCode.routes.js";

import fileRouter from "./modules/files/file.routes.js";

import userRouter from "./modules/users/user.routes.js";


const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Community Code API is running"
  });
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/courses", courseRouter);

app.use("/api/v1", lessonRouter);

app.use("/api/v1/enrollments", enrollmentRouter);

app.use("/api/v1/access-codes", accessCodeRouter);

app.use("/api/v1", fileRouter);

app.use("/api/v1/users", userRouter);



app.get(
  "/api/v1/test-auth",
  authentication,
  (req, res) => {
    res.json({
      message: "Authentication successful",
      user: req.user
    });
  }
);

app.use((req, res) => {
  res.status(404).json({
    message: "Invalid application routing"
  });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message:
      error.message ||
      "Internal Server Error",

    stack:
      NODE_ENV === "development"
        ? error.stack
        : undefined
  });
});

export default app;