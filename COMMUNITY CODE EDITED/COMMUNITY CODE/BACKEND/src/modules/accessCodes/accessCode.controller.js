import {
  redeemAccessCode,
  createAccessCode,
  getAccessCodes,
  deleteAccessCode
} from "./accessCode.service.js";


export const redeemCode = async (req, res, next) => {
  try {
    const enrollment = await redeemAccessCode(
      req.user.id,
      req.body.code
    );

    res.status(201).json({
      message: "Access code redeemed successfully",
      enrollment
    });
  } catch (error) {
    next(error);
  }
};

export const createCode = async (req, res, next) => {
  try {
    const accessCode = await createAccessCode(req.body);

    res.status(201).json({
      message: "Access code created successfully",
      accessCode
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAccessCodes = async (req, res, next) => {
  try {
    const accessCodes = await getAccessCodes();

    res.status(200).json({
      accessCodes
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCode = async (req, res, next) => {
  try {
    await deleteAccessCode(req.params.id);

    res.status(200).json({
      message: "Access code deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};