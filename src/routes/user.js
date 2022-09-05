const express = require("express");

const Router = express.Router();

const userController = require("../controllers/user");

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
Router.get("/", userController.getAllData);
Router.get("/:id", userController.getDataById);
Router.post("/", userController.createData);
module.exports = Router;
