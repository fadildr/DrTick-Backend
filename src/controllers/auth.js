const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");
const encryptPassword = require("encrypt-password");

module.exports = {
  showGreetings: async (request, response) => {
    try {
      return wrapper.response(
        response,
        200,
        "Success Get Greetings",
        "Hello World !"
      );
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  register: async (request, response) => {
    try {
      const { username, email, password } = request.body;
      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length > 0) {
        return wrapper.response(response, 404, "Email Already Use", null);
      }

      // pass validation
      if (password.length < 8) {
        return wrapper.response(
          response,
          404,
          "password minimun 8 character",
          null
        );
      }
      //encrypt process
      const encryptedPassword = encryptPassword(password, {
        min: 8,
        max: 24,
        pattern: /^\w{8,24}$/,
        signature: "signature",
      });

      const setData = {
        username,
        email,
        password: encryptedPassword,
      };

      const result = await authModel.register(setData);
      return wrapper.response(response, 200, "Success Register", result.body);
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      // 1. PROSES PENGECEKAN EMAIL
      const checkEmail = await authModel.getUserByEmail(email);
      if (checkEmail.data.length < 1) {
        return wrapper.response(response, 404, "Email Not Registed", null);
      }
      const encryptedPassword = encryptPassword(password, {
        min: 8,
        max: 24,
        pattern: /^\w{8,24}$/,
        signature: "signature",
      });
      // 2. PROSES PENCOCOKAN PASSWORD
      if (encryptedPassword !== checkEmail.data[0].password) {
        return wrapper.response(response, 400, "Wrong Password", null);
      }

      const payload = {
        userId: checkEmail.data[0].userId,
        role: !checkEmail.data[0].role ? "user" : checkEmail.data[0].role,
      };

      const token = jwt.sign(payload, "RAHASIA", { expiresIn: "24h" });
      // 4. PROSES REPON KE USER
      return wrapper.response(response, 200, "Success Login", {
        userId: payload.userId,
        token,
      });
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  logout: async (request, response) => {
    try {
      let token = request.headers.authorization;
      token = token.split(" ")[1];
      client.setEx(`accessToken:${token}`, 3600 * 48, token);
      return wrapper.response(response, 200, "Success Logout", null);
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
