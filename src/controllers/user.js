const userModel = require("../models/user");
const wrapper = require("../utils/wrapper");
const encryptPassword = require("encrypt-password");
const cloudinary = require("../config/cloudinary");
module.exports = {
  // showGreetings: async (request, response) => {
  //   try {
  //     response.status(200).send("Hello World!");
  //   } catch (error) {
  //     console.log(error);
  //     const {
  //       status = 500,
  //       statusText = "Internal Server Error",
  //       error: errorData = null,
  //     } = error;
  //     return wrapper.response(response, status, statusText, errorData);
  //   }
  // },
  getAllData: async (request, response) => {
    try {
      console.log(request.query);
      const result = await userModel.getAllData();
      return wrapper.response(
        response,
        result.status,
        "Success Get Data user!",
        result.data
      );
    } catch (error) {
      const { status, statusText, error: errorData } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getDataById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await userModel.getDataById(id);
      console.log(id);
      return wrapper.response(
        response,
        200,
        "succes get data by id user",
        result.data
      );
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
  createData: async (request, response) => {
    try {
      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
      } = request.body;
      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        email,
        password,
      };
      const result = await userModel.createData(setData);
      console.log(request.body);
      return wrapper.response(
        response,
        200,
        "succes create data booking",
        result.body
      );
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
  updateData: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        role,
      } = request.body;

      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
        role,
        updateAt: "now()",
      };

      const result = await userModel.updateData(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
        result.data
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
  deleteData: async (request, response) => {
    try {
      const result = await userModel.deleteData(request.params);
      return wrapper.response(
        response,
        result.status,
        "Success delete Data",
        result.data
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
  updateImage: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await userModel.getDataById(id);
      console.log(checkId);
      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Update Failed Id ${id} Not Found`,
          []
        );
      }
      let image;
      if (request.file) {
        const { filename, mimetype } = request.file;
        image = filename ? `${filename}.${mimetype.split("/")[1]}` : "";
        // console.log(image);
        // DELETE FILE DI CLOUDINARY
        await cloudinary.uploader.destroy(image, (result) => {
          return result;
        });
      }

      const setData = {
        image,
        updateAt: "now()",
      };
      const result = await userModel.updateData(id, setData);
      const filterObj = ["userId", "createdAt", "updatedAt", "image"];
      if (!image) {
        return wrapper.response(res, 401, "you must upload image first", null);
      }
      const final = Object.keys(result.data[0])
        .filter((key) => filterObj.includes(key))
        .reduce(
          (obj, key) => ({
            ...obj,
            [key]: checkId.data[0][key],
          }),
          {}
        );
      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
        final
      );
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
  updatePassword: async (request, response) => {
    try {
      const { id } = request.params;
      const { password, newPassword, confirmPassword } = request.body;
      const checkId = await userModel.getDataById(id);
      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Update Failed Id ${id} Not Found`,
          []
        );
      }
      //encrypt password
      const encryptedPassword = encryptPassword(password, {
        min: 8,
        max: 24,
        pattern: /^\w{8,24}$/,
        signature: "signature",
      });
      if (encryptedPassword !== checkId.data[0].password) {
        return wrapper.response(response, 400, "Password not found", null);
      }
      if (newPassword !== confirmPassword) {
        return wrapper.response(response, 400, "Password not match", null);
      }
      const newEncryptedPassword = encryptPassword(newPassword, {
        min: 8,
        max: 24,
        pattern: /^\w{8,24}$/,
        signature: "signature",
      });
      const setData = {
        password: newEncryptedPassword,
        updateAt: "now()",
      };

      const result = await userModel.updateData(id, setData);

      return wrapper.response(
        response,
        result.status,
        "Success Update Data",
        result.data
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
};
