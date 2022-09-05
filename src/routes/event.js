const express = require("express");

const Router = express.Router();

const eventController = require("../controllers/event");

// Router.get("/greetings", async (request, response) => {
// try {
//     response.status(200).send("Hello World!");
// } catch (error) {
//     console.log(error)
// }
// });

// Router.get("/greetings", eventController.showGreetings);
// Path Create
// Path Read
// Path Update
// Path Delete
Router.get("/", eventController.getAllData);
Router.get("/:id", eventController.getDataById);
Router.post("/", eventController.createData);
module.exports = Router;
