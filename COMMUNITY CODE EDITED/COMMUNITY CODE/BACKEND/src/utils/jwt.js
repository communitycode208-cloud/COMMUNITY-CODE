import jwt from "jsonwebtoken";

import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_RESET_SECRET,
  JWT_RESET_EXPIRES_IN
} from "../config/config.service.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const generateResetToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      purpose: "reset-password"
    },
    JWT_RESET_SECRET,
    {
      expiresIn: JWT_RESET_EXPIRES_IN
    }
  );
};

export const verifyResetToken = (token) => {
  return jwt.verify(token, JWT_RESET_SECRET);
};