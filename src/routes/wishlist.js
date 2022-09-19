const express = require("express");

const Router = express.Router();

const wishlistController = require("../controllers/wishlist");
const authMiddleware = require("../middleware/auth");
const redisMiddleware = require("../middleware/redis");

Router.get(
  "/",
  authMiddleware.authentication,
  wishlistController.getAllWishlist
);
Router.get(
  "/:id",
  authMiddleware.authentication,
  wishlistController.getWishlistById
);
Router.post(
  "/",
  authMiddleware.authentication,
  wishlistController.createWishlist
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  wishlistController.updateWishlist
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  wishlistController.deleteDataWishlist
);
module.exports = Router;
