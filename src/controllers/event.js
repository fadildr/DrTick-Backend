const eventModel = require("../models/event");
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
      const result = await eventModel.getAllData();
      return wrapper.response(
        response,
        result.status,
        "Success Get Data in event!",
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
        "succes get data by id in event",
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
      console.log(request.body);
      return wrapper.response(
        response,
        200,
        "succes create data in event",
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
};
