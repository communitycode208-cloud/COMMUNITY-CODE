import cloudinary from "../../config/cloudinary.config.js";

export const uploadFileToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",

        // Make the uploaded asset publicly deliverable
        type: "upload",

        // Allow public delivery
        access_control: [
          {
            access_type: "anonymous",
          },
        ],

        folder: "community-code/resources",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          type: result.resource_type,
          size: file.size,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};