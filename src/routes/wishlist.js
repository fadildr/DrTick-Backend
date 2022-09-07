const express = require("express");

const Router = express.Router();

const wishlistController = require("../controllers/wishlist");

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
Router.get("/", wishlistController.getAllData);
Router.get("/:id", wishlistController.getDataById);
Router.post("/", wishlistController.createData);
Router.patch("/:id", wishlistController.updateData);
Router.delete("/:id", wishlistController.deleteData);
module.exports = Router;
