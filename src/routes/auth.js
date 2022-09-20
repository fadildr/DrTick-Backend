const express = require("express");

const Router = express.Router();

const authController = require("../controllers/auth");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.post("/logout", authController.logout);
Router.post("/refresh", authController.refresh);

module.exports = Router;
