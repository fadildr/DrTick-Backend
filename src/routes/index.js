const express = require("express");

const Router = express.Router();

const productRoutes = require("./product");

// Router.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

Router.use("/product", productRoutes);

module.exports = Router;
