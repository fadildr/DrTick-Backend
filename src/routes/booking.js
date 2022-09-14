const express = require("express");

const Router = express.Router();

const bookingController = require("../controllers/booking");

Router.post("/:userId", bookingController.createBooking);
Router.get("/:id", bookingController.getBookingByUserId);
Router.get("/event/:id", bookingController.getBookingSectionByEventId);
// Router.get("/section", bookingController.getBookingSection);
module.exports = Router;
