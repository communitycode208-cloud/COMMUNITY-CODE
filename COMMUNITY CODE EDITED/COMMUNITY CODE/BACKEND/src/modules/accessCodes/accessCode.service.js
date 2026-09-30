import mongoose from "mongoose";

import { AccessCode } from "../../DB/models/accessCode.model.js";

import { Enrollment } from "../../DB/models/enrollment.model.js";

import { Course } from "../../DB/models/course.model.js";

export const redeemAccessCode = async (userId, code) => {
  if (!code || typeof code !== "string") {
    throw new Error("Access code is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user");
  }

  const normalizedCode = code.trim().toUpperCase();

  const accessCode = await AccessCode.findOne({
    code: normalizedCode
  });

  if (!accessCode) {
    throw new Error("Invalid access code");
  }

  if (accessCode.used) {
    throw new Error("Access code has already been used");
  }

  if (
    accessCode.expiresAt &&
    accessCode.expiresAt <= new Date()
  ) {
    throw new Error("Access code has expired");
  }

  const course = await Course.findById(
    accessCode.courseId
  );

  if (!course) {
    throw new Error("Course not found");
  }

  const existingEnrollment = await Enrollment.findOne({
    userId,
    courseId: accessCode.courseId
  });

  if (existingEnrollment) {
    throw new Error("Already enrolled in this course");
  }

  /*
   * Atomically reserve the access code.
   *
   * This prevents two requests from redeeming
   * the same code at the same time.
   */
  const claimedAccessCode =
    await AccessCode.findOneAndUpdate(
      {
        _id: accessCode._id,
        used: false,
        $or: [
          { expiresAt: null },
          { expiresAt: { $gt: new Date() } }
        ]
      },
      {
        $set: {
          used: true,
          usedBy: userId,
          usedAt: new Date()
        }
      },
      {
        new: true
      }
    );

  if (!claimedAccessCode) {
    throw new Error(
      "Access code has already been used or has expired"
    );
  }

  try {
    const enrollment = await Enrollment.create({
      userId,
      courseId: accessCode.courseId
    });

    return enrollment;
  } catch (error) {
    /*
     * If enrollment creation fails, release the code
     * so it can be used again.
     */
    await AccessCode.findOneAndUpdate(
      {
        _id: claimedAccessCode._id,
        used: true,
        usedBy: userId
      },
      {
        $set: {
          used: false,
          usedBy: null,
          usedAt: null
        }
      }
    );

    if (error.code === 11000) {
      throw new Error("Already enrolled in this course");
    }

    throw error;
  }
};

export const createAccessCode = async (inputs) => {
  const {
    code,
    courseId,
    expiresAt
  } = inputs;

  if (!code || typeof code !== "string") {
    throw new Error("Access code is required");
  }

  if (
    !courseId ||
    !mongoose.Types.ObjectId.isValid(courseId)
  ) {
    throw new Error("Invalid course ID");
  }

  const normalizedCode = code.trim().toUpperCase();

  if (
    normalizedCode.length < 3 ||
    normalizedCode.length > 50
  ) {
    throw new Error(
      "Access code must be between 3 and 50 characters"
    );
  }

  if (!/^[A-Z0-9-]+$/.test(normalizedCode)) {
    throw new Error(
      "Access code can only contain letters, numbers and hyphens"
    );
  }

  if (expiresAt !== undefined && expiresAt !== null) {
    const expirationDate = new Date(expiresAt);

    if (Number.isNaN(expirationDate.getTime())) {
      throw new Error("Invalid expiration date");
    }

    if (expirationDate <= new Date()) {
      throw new Error(
        "Expiration date must be in the future"
      );
    }
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const existingCode = await AccessCode.findOne({
    code: normalizedCode
  });

  if (existingCode) {
    throw new Error("Access code already exists");
  }

  try {
    const accessCode = await AccessCode.create({
      code: normalizedCode,
      courseId,
      expiresAt: expiresAt || null
    });

    return accessCode;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Access code already exists");
    }

    throw error;
  }
};

export const getAccessCodes = async () => {
  return await AccessCode.find()
    .populate("courseId", "title")
    .populate("usedBy", "name email")
    .sort({ createdAt: -1 });
};

export const deleteAccessCode = async (codeId) => {
  if (!mongoose.Types.ObjectId.isValid(codeId)) {
    throw new Error("Invalid access code ID");
  }

  const accessCode =
    await AccessCode.findByIdAndDelete(codeId);

  if (!accessCode) {
    throw new Error("Access code not found");
  }

  return accessCode;
};