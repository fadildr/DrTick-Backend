const express = require("express");

const Router = express.Router();

const productController = require("../controllers/product");

// Router.get("/greetings", async (request, response) => {
// try {
//     response.status(200).send("Hello World!");
// } catch (error) {
//     console.log(error)
// }
// });

Router.get("/greetings", productController.showGreetings);
// Path Create
// Path Read
// Path Update
// Path Delete
Router.get("/", productController.getAllProduct);
Router.get("/:id", productController.getProductById);
Router.post("/", productController.createProduct);
Router.patch("/:id", productController.updateProduct);
Router.delete("/:id", productController.deleteProduct);

module.exports = Router;
