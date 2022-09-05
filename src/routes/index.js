const express = require("express");

const Router = express.Router();

const productRoutes = require("./product");
const eventRoutes = require("./event");
const userRoutes = require("./user");
// Router.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

Router.use("/product", productRoutes);
Router.use("/event", eventRoutes);
Router.use("/user", userRoutes);
module.exports = Router;
