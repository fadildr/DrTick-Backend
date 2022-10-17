const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");
const uploadMiddleware = require("../middleware/uploadfile");
const redisMiddleware = require("../middleware/redis");
const authMiddleware = require("../middleware/auth");

Router.get("/", authMiddleware.authentication, userController.getAllUser);
Router.get("/:id", authMiddleware.authentication, userController.getUserById);
Router.post("/", authMiddleware.authentication, userController.createUser);
Router.patch("/:id", authMiddleware.authentication, userController.updateUser);
Router.delete("/:id", authMiddleware.authentication, userController.deleteUser);
Router.patch(
  "/updateImage/:id",
  authMiddleware.authentication,
  uploadMiddleware.uploadUser,
  userController.updateImage
);
Router.patch(
  "/updatePassword/:id",
  authMiddleware.authentication,
  userController.updatePassword
);
module.exports = Router;
