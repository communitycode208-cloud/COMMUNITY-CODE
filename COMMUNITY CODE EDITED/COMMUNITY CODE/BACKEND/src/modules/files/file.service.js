import { File } from "./file.model.js";
import { Course } from "../../DB/models/course.model.js";
import { Enrollment } from "../../DB/models/enrollment.model.js";
import { uploadFileToCloudinary } from "./cloudinary.service.js";
import cloudinary from "../../config/cloudinary.config.js";


export const createFile = async (courseId, file) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const uploadedFile = await uploadFileToCloudinary(file);

  const newFile = await File.create({
    courseId,
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
    url: uploadedFile.url,
    publicId: uploadedFile.publicId,
  });

  return newFile;
};

export const getCourseFiles = async (userId, courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  const enrollment = await Enrollment.findOne({
    userId,
    courseId,
  });

  if (!enrollment) {
  const error = new Error("You are not enrolled in this course");
  error.statusCode = 403;
  throw error;
}

  return await File.find({ courseId }).sort({ createdAt: -1 });
};

export const deleteFile = async (fileId) => {
  const file = await File.findById(fileId);

  if (!file) {
    throw new Error("File not found");
  }

  if (file.publicId) {
    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: "auto",
    });
  }

  await File.findByIdAndDelete(fileId);

  return file;
};