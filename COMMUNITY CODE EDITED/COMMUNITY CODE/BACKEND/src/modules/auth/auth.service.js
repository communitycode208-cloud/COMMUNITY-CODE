import bcrypt from "bcrypt";

import crypto from "crypto";

import { User } from "../../DB/models/user.model.js";

import { sendResetPasswordEmail } from "../../services/email.service.js";

import { SALT_ROUND } from "../../config/config.service.js";

import {
  generateToken,
  verifyToken,
  generateResetToken,
  verifyResetToken
} from "../../utils/jwt.js";

export const signup = async (inputs) => {
  const {
    name,
    email,
    username,
    phone,
    password,
    language
  } = inputs;

  if (
    !name ||
    !email ||
    !username ||
    !phone ||
    !password
  ) {
    throw new Error(
      "Name, email, username, phone and password are required"
    );
  }

  if (password.length < 6) {
    throw new Error(
      "Password must be at least 6 characters"
    );
  }

  const normalizedEmail =
    email.trim().toLowerCase();

  const normalizedUsername =
    username.trim().toLowerCase();

  const normalizedPhone =
    phone.trim();

  const existingUser = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { username: normalizedUsername },
      { phone: normalizedPhone }
    ]
  });

  if (existingUser) {
    throw new Error(
      "Email, username or phone already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    SALT_ROUND
  );

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    username: normalizedUsername,
    phone: normalizedPhone,
    password: hashedPassword,
    language
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    phone: user.phone,
    language: user.language,
    role: user.role
  };
};

export const login = async (inputs) => {
  const {
    identifier,
    password
  } = inputs;

  if (!identifier || !password) {
    throw new Error(
      "Email/username and password are required"
    );
  }

  const normalizedIdentifier =
    identifier.trim().toLowerCase();

  const user = await User.findOne({
    $or: [
      { email: normalizedIdentifier },
      { username: normalizedIdentifier }
    ]
  });

  if (!user) {
    throw new Error(
      "Invalid email/username or password"
    );
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error(
      "Invalid email/username or password"
    );
  }

  const token = generateToken({
    id: user._id,
    role: user.role
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
      language: user.language,
      role: user.role
    }
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    phone: user.phone,
    language: user.language,
    role: user.role
  };
};

export const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const normalizedEmail =
    email.trim().toLowerCase();

  const user = await User.findOne({
    email: normalizedEmail
  });

  if (!user) {
    return null;
  }

  const resetToken =
    generateResetToken(user._id);

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken =
    hashedResetToken;

  user.resetPasswordExpires = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await user.save();

  await sendResetPasswordEmail(
    user.email,
    resetToken
  );

  return true;
};

export const resetPassword = async (
  resetToken,
  newPassword
) => {
  if (!resetToken || !newPassword) {
    throw new Error(
      "Reset token and new password are required"
    );
  }

  if (newPassword.length < 6) {
    throw new Error(
      "New password must be at least 6 characters"
    );
  }

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedResetToken,
    resetPasswordExpires: {
      $gt: new Date()
    }
  });

  if (!user) {
    throw new Error(
      "Invalid or expired reset token"
    );
  }

  const decoded =
    verifyResetToken(resetToken);

  if (
    decoded.id.toString() !==
      user._id.toString() ||
    decoded.purpose !== "reset-password"
  ) {
    throw new Error("Invalid reset token");
  }

  user.password = await bcrypt.hash(
    newPassword,
    SALT_ROUND
  );

  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return true;
};