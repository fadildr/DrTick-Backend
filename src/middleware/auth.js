const jwt = require("jsonwebtoken");
const wrapper = require("../utils/wrapper");

module.exports = {
  authentication: async (request, response, next) => {
    try {
      let token = request.headers.authorization;

      if (!token) {
        return wrapper.response(response, 403, "Please Login First", null);
      }

      token = token.split(" ")[1];

      jwt.verify(token, "RAHASIA", (error, result) => {
        if (error) {
          return wrapper.response(response, 403, error.message, null);
        }
        request.decodeToken = result;
        next();
      });
    } catch (error) {
      console.log(error);
    }
  },
  authorization: async (request, response, next) => {
    try {
      let token = request.headers.authorization;
      token = token.split(" ")[1];
      // PROSES UNTUK PENGECEKAN ROLE
      if (request.user.role !== "Admin") {
        return wrapper.response(
          response,
          401,
          "only admin allowed to do this action",
          null
        );
      }
      // console.log(request.decodeToken);
      next();
    } catch (error) {
      console.log(error);
    }
  },
  authorization: async (request, response, next) => {
    try {
      let token = request.headers.authorization;
      token = token.split(" ")[1];
      jwt.verify(token, "RAHASIA", (error, result) => {
        if (result.role === "user") {
          return wrapper.response(response, 403, "You Not Admin", null);
        }
        return next();
      });
      // console.log(request.decodeToken);
      request.decodeToken = result;
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
