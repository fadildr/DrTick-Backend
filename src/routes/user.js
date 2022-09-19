const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");
const uploadMiddleware = require("../middleware/uploadfile");
const redisMiddleware = require("../middleware/redis");

Router.get("/", userController.getAllUser);
Router.get("/:id", userController.getUserById);
Router.post("/", userController.createUser);
Router.patch("/:id", userController.updateUser);
Router.delete("/:id", userController.deleteUser);
Router.patch(
  "/updateImage/:id",
  uploadMiddleware.uploadUser,
  userController.updateImage
);
Router.patch("/updatePassword/:id", userController.updatePassword);
module.exports = Router;
