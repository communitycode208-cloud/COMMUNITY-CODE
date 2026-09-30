import {
  createFile,
  getCourseFiles,
  deleteFile
} from "./file.service.js";

export const createNewFile = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("File is required");
      error.statusCode = 400;
      throw error;
    }

    const file = await createFile(
      req.params.courseId,
      req.file
    );

    res.status(201).json({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    next(error);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const files = await getCourseFiles(
      req.user.id,
      req.params.courseId
    );

    res.status(200).json({ files });
  } catch (error) {
    next(error);
  }
};

export const deleteSingleFile = async (req, res, next) => {
  try {
    await deleteFile(req.params.fileId);

    res.status(200).json({
      message: "File deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};