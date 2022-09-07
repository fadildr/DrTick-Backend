const wishlistModel = require("../models/wishlist");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllData: async (request, response) => {
    try {
      // console.log(request.query);
      let { page, limit } = request.query;
      page = +page;
      limit = +limit;

      const totalData = await wishlistModel.getCountData();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        // page, totalPage, limit, totalData
        page,
        totalPage,
        limit,
        totalData,
      };

      const offset = page * limit - limit;
      const { userId } = request.query;
      const result = await wishlistModel.getAllData(offset, limit, userId);
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
      const result = await wishlistModel.getDataById(id);
      if (result.data.length < 1) {
        return wrapper.response(response, 404, "data not found", []);
      }
      console.log(id);
      return wrapper.response(
        response,
        200,
        "succes get data by id in wishlist",
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
      const { eventId, userId } = request.body;

      const setData = {
        eventId,
        userId,
      };
      const result = await wishlistModel.createData(setData);
      //   console.log(request.body);
      return wrapper.response(
        response,
        result.status,
        "succes create data in wishlist",
        result.data
      );
    } catch (error) {
      //   console.log(error);
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

      // const checkId = await wishlistModel.getDataById(id);

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
        category,
        location,
        detail,
        dateTimeShow,
        price,
      };

      const result = await wishlistModel.updateData(id, setData);

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
      const result = await wishlistModel.deleteData(request.params);
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
