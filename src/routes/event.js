const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadfile");

Router.get("/", eventController.getAllData);
Router.get("/:id", eventController.getDataById);
Router.post(
  "/",
  authMiddleware.authentication,
  authMiddleware.authorization,
  uploadMiddleware.uploadEvent,
  eventController.createData
);
Router.patch("/:id", uploadMiddleware.uploadEvent, eventController.updateData);
Router.delete("/:id", eventController.deleteData);
module.exports = Router;
