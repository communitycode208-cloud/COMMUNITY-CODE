import {
  getMyProfile,
  updateMyProfile,
  changePassword,
  getAllUsers,
  updateUserRole,
} from "./user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getMyProfile(req.user.id);

    res.status(200).json({
      user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateMyProfile(
      req.user.id,
      req.body
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    await changePassword(
      req.user.id,
      req.body.currentPassword,
      req.body.newPassword
    );

    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const user = await updateUserRole(
      req.user.id,
      req.params.id,
      req.body.role
    );

    res.status(200).json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};