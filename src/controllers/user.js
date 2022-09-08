const userModel = require("../models/user");
const wrapper = require("../utils/wrapper");

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
      console.log(id);
      return wrapper.response(
        response,
        200,
        "succes get data by id user",
        "hello world"
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
      console.log(request.params);
      console.log(request.body);
      const { id } = request.params;
      const { name, username, gender, profession, nationality, dateOfBirth } =
        request.body;

      // const checkId = await eventModel.getDataById(id);

      // if (checkId.data.length < 1) {
      //   return wrapper.response(
      //     response,
      //     404,
      //     `Data By Id ${id} Not Found`,
      //     []
      //   );
      // }

      const setData = {
        name,
        username,
        gender,
        profession,
        nationality,
        dateOfBirth,
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
      console.log(error);
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  deleteData: async (request, response) => {
    try {
      console.log(request.params);
      const result = await userModel.deleteData(request.params);
      console.log(result);
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
      console.log(error);
      return wrapper.response(response, status, statusText, errorData);
    }
  },
};
