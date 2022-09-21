const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadfile");
const redisMiddleware = require("../middleware/redis");

Router.get("/", redisMiddleware.getAllEvent, eventController.getAllEvent);
Router.get(
  "/:id",
  authMiddleware.authentication,
  redisMiddleware.getEventById,
  eventController.getEventById
);
Router.post(
  "/",
  authMiddleware.authentication,
  authMiddleware.authorization,
  uploadMiddleware.uploadEvent,
  redisMiddleware.clearEvent,
  eventController.createEvent
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.authorization,
  uploadMiddleware.uploadEvent,
  redisMiddleware.clearEvent,
  eventController.updateEvent
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.authorization,
  redisMiddleware.clearEvent,
  eventController.deleteEvent
);
module.exports = Router;
