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
  getCountData: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  // getAllEvent: (offset, limit) =>
  //   new Promise((resolve, reject) => {
  //     // page = 1
  //     // limit = 10
  //     // offset = 0
  //     // .range(0, 9) // offset(0) + limit(10) - 1 = 9
  //     supabase
  //       .from("event")
  //       .select("*")
  //       .range(offset, offset + limit - 1)
  //       .then((result) => {
  //         if (!result.error) {
  //           resolve(result);
  //         } else {
  //           reject(result);
  //         }
  //       });
  // }),
  getAllData: async (request, response) => {
    try {
      // console.log(request.query);
      let { page, limit, name, sort } = request.query;
      page = +page;
      limit = +limit;

      const totalData = await eventModel.getCountData();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        // page, totalPage, limit, totalData
        page,
        totalPage,
        limit,
        totalData,
      };

      const offset = page * limit - limit;

      const result = await eventModel.getAllData(offset, limit, name, sort);
      // console.log(result);
      return wrapper.response(
        response,
        result.status,
        "Success Get Data !",
        result.data,
        pagination
      );
    } catch (error) {
      // console.log(error);
      const {
        status = 500,
        statusText = "Internal Server Error",
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  getDataById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await eventModel.getDataById(id);
      if (result.data.length < 1) {
        return wrapper.response(response, status, statusText, errorData);
      }
    } catch (error) {
      console.log(error);
    }
  },
  createData: async (request, response) => {
    try {
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };
      const result = await eventModel.createData(setData);
      console.log(request.body);
      return wrapper.response(
        response,
        200,
        "succes create data event",
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
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;

      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };

      const result = await eventModel.updateData(id, setData);

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
      const result = await eventModel.deleteData(request.params);
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