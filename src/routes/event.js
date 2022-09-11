const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");

Router.get("/", eventController.getAllData);
Router.get("/:id", eventController.getDataById);
Router.post("/", eventController.createData);
Router.patch("/:id", eventController.updateData);
Router.delete("/:id", eventController.deleteData);
module.exports = Router;
