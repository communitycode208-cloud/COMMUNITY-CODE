import {
  signup,
  login,
  getMe,
  forgotPassword,
  resetPassword
} from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await signup(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await login(req.body);

    res.status(200).json({
      message: "Login successful",
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await getMe(req.user.id);

    res.status(200).json({
      user
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordRequest = async (req, res, next) => {
  try {
    await forgotPassword(req.body.email);

    res.status(200).json({
      message: "If the email exists, a reset link has been sent"
    });
  } catch (error) {
    next(error);
  }
};
export const resetPasswordRequest = async (req, res, next) => {
  try {
    await resetPassword(
      req.body.resetToken,
      req.body.newPassword
    );

    res.status(200).json({
      message: "Password reset successfully"
    });
  } catch (error) {
    next(error);
  }
};