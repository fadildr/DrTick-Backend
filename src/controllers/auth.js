const jwt = require("jsonwebtoken");
const authModel = require("../models/auth");
const wrapper = require("../utils/wrapper");

module.exports = {
  showGreetings: async (request, response) => {
    try {
      // return response.status(200).send("Hello World!");
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
      const { email, password } = request.body;

      const setData = {
        email,
        password, // UNTUK PASSWORD BISA DI ENKRIPSI
      };

      // PROSES PENGECEKAN APAKAH EMAIL YANG MAU DI DAFTARKAN SUDAH ADA ATAU BELUM ?

      // PROSES MENYIMPAN DATA KE DATABASE LEWAT MODEL
      const result = await authModel.register(setData);
      console.log(request.body);
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

      // 2. PROSES PENCOCOKAN PASSWORD
      if (password !== checkEmail.data[0].password) {
        return wrapper.response(response, 400, "Wrong Password", null);
      }

      // 3. PROSES PEMBUATAN TOKEN JWT
      // PAYLOAD = DATA YANG MAU DISIMPAN/DIJADIKAN TOKEN
      // KEY = KATA KUNCI BISA DI GENERATE ATAU DIBUAT LANGSUNG
      // const payload = checkEmail.data[0];
      // delete payload.password;

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
};
