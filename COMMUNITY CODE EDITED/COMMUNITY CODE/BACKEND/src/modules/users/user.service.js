import bcrypt from "bcrypt";

import { User } from "../../DB/models/user.model.js";

import { SALT_ROUND } from "../../config/config.service.js";

export const getMyProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateMyProfile = async (userId, inputs) => {
  const allowedFields = ["name", "language"];

  const updates = {};

  if (inputs.username !== undefined) {
    const normalizedUsername = inputs.username
      .trim()
      .toLowerCase();

    const existingUser = await User.findOne({
      username: normalizedUsername,
      _id: { $ne: userId }
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    updates.username = normalizedUsername;
  }

  for (const field of allowedFields) {
    if (inputs[field] !== undefined) {
      updates[field] = inputs[field];
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    updates,
    {
      new: true,
      runValidators: true
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  if (!currentPassword || !newPassword) {
    throw new Error(
      "Current password and new password are required"
    );
  }

  if (newPassword.length < 6) {
    throw new Error(
      "New password must be at least 6 characters"
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Current password is incorrect");
  }

  user.password = await bcrypt.hash(
    newPassword,
    SALT_ROUND
  );

  await user.save();

  return true;
};

export const getAllUsers = async () => {
  return await User.find()
    .select("-password")
    .sort({ createdAt: -1 });
};

export const updateUserRole = async (
  currentUserId,
  userId,
  role
) => {
  if (!["student", "admin"].includes(role)) {
    throw new Error("Invalid user role");
  }

  if (currentUserId.toString() === userId.toString()) {
    throw new Error("You cannot change your own role");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};