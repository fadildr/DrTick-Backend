const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");
const encryptPassword = require("encrypt-password");
const client = require("../config/redis");
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
      console.log(email);
      const checkEmail = await authModel.getUserByEmail(email);
      console.log(checkEmail);
      if (checkEmail.data.length >= 1) {
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

      const token = jwt.sign(payload, process.env.ACCESS_KEYS, {
        expiresIn: "24h",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_KEYS, {
        expiresIn: "36h",
      });
      // 4. PROSES REPON KE USER
      const newResult = {
        userId: payload.userId,
        token,
        refreshToken,
      };
      return wrapper.response(response, 200, "Success Login", newResult);
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
      client.setEx(`refreshToken:${refreshtoken}`, 3600 * 48, refreshtoken);
      return wrapper.response(response, 200, "Success Logout", []);
    } catch (error) {
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  refresh: async (request, response) => {
    try {
      const { refreshtoken } = request.headers;
      if (!refreshtoken) {
        return wrapper.response(response, 400, "Refresh Token Is Empty");
      }

      const checkTokenBlacklist = await client.get(
        `refreshToken:${refreshtoken}`
      );

      if (checkTokenBlacklist) {
        return wrapper.response(
          response,
          403,
          "Your token is destroyed please login again",
          null
        );
      }

      let payload, token, newRefreshToken;

      jwt.verify(refreshtoken, process.env.REFRESH_KEYS, (error, result) => {
        if (error) {
          return wrapper.response(response, 403, error.message, null);
        }
        payload = {
          userId: result.userId,
          role: result.role,
        };
        token = jwt.sign(payload, process.env.ACCESS_KEYS, {
          expiresIn: "1h",
        });
        newRefreshToken = jwt.sign(payload, process.env.REFRESH_KEYS, {
          expiresIn: "36h",
        });
        client.setEx(`refreshToken:${refreshtoken}`, 3600 * 36, refreshtoken);
      });
      const newResult = {
        userId: payload.userId,
        token,
        refreshToken: newRefreshToken,
      };
      return wrapper.response(response, 200, "Success Refresh Token", {
        newResult,
      });
    } catch (error) {
      console.log(error);
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
