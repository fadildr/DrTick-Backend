const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");

module.exports = {
  uploadEvent: (request, response, next) => {
    // JIKA INGIN MENYIMPAN KE CLOUNDINARY
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "fadildr-EO/event",
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 512000 },
      fileFilter: (request, file) => {
        // const allowedType = ["image/png", "image/jpg", "image/jpeg"];
        if (
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/jpg" &&
          file.mimetype !== "image/jpeg"
          // file.mimetype !== allowedType
        ) {
          return wrapper.response(
            response,
            401,
            "Only Upload Image Files",
            null
          );
        }
        callback(null, true);
      },
    }).single("image");

    upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }
      if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }

      // Everything went fine.
      next();
    });
  },
  uploadUser: (request, response, next) => {
    // JIKA INGIN MENYIMPAN KE CLOUNDINARY
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "fadildr-EO/user",
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 512000 },
      fileFilter: (request, file, callback) => {
        // let allowedType = ["image/png", "image/jpg", "image/jpeg"];
        if (
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/jpg" &&
          file.mimetype !== "image/jpeg"
        ) {
          return callback(new error("Only Images Are Allowed"));
        }
        callback(null, true);
      },
    }).single("image");

    upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }
      if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }

      // Everything went fine.
      next();
    });
  },
};
