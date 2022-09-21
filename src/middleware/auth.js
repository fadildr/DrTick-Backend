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

      jwt.verify(token, process.env.ACCESS_KEYS, (error, result) => {
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
      result = request.decodeToken;
      if (result.role === "user") {
        return wrapper.response(
          response,
          403,
          "Only Admin Can Do This Action",
          null
        );
      }
      return next();
    } catch (error) {
      // console.log(error);
    }
  },
};
