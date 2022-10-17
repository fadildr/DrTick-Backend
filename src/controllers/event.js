const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");
const client = require("../config/redis");

module.exports = {
  getAllEvent: async (request, response) => {
    try {
      let { page, limit, name, sort, dateTimeShow } = request.query;
      page = +page || 1;
      limit = +limit || 5;
      // name = `%${name}%`;

      const totalData = await eventModel.getCountData();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        page,
        totalPage,
        limit,
        totalData,
      };
      let sortColumn = "dateTimeShow";
      let sortType = "asc";
      if (sort) {
        sortColumn = sort.split(" ")[0];
        sortType = sort.split(" ")[1];
      }
      if (sortType.toLowerCase() === "asc") {
        sortType = true;
      } else {
        sortType = false;
      }

      const offset = page * limit - limit;

      let day;
      let nextDay;
      if (dateTimeShow) {
        day = new Date(dateTimeShow);
        nextDay = new Date(new Date(day).setDate(day.getDate() + 1));
      }
      console.log(day, nextDay);
      const result = await eventModel.getAllEvent(
        offset,
        limit,
        name,
        sortColumn,
        sortType,
        day,
        nextDay
      );

      client.setEx(
        `getProduct:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ result: result.data, pagination })
      );
      return wrapper.response(
        response,
        result.status,
        "Success Get Data !",
        result.data,
        pagination
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
  getEventById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await eventModel.getEventById(id);
      client.setEx(`getProduct:${id}`, 3600, JSON.stringify(result.data));
      if (result.data.length >= 1) {
        return wrapper.response(
          response,
          200,
          "succes get data by id",
          result.data
        );
      }
    } catch (error) {
      const {
        status = 404,
        statusText = `data by id ${id} not found`,
        error: errorData = null,
      } = error;
      return wrapper.response(response, status, statusText, errorData);
    }
  },

  createEvent: async (request, response) => {
    try {
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const { filename, mimetype } = request.file;
      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        image: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
      };
      const result = await eventModel.createEvent(setData);

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
  updateEvent: async (request, response) => {
    try {
      const { id } = request.params;
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const checkId = await eventModel.getEventById(id);
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
        // DELETE FILE DI CLOUDINARY
        await cloudinary.uploader.destroy(image, (result) => result);
      }

      const setData = {
        name,
        category,
        location,
        detail,
        dateTimeShow,
        price,
        image,
        updateAt: "now()",
      };
      const result = await eventModel.updateEvent(id, setData);

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
  deleteEvent: async (request, response) => {
    try {
      const { id } = request.params;
      const checkId = await eventModel.getEventById(id);

      if (checkId.data.length < 1) {
        return wrapper.response(
          response,
          404,
          `Delete Failed Id ${id} Not Found`,
          []
        );
      }
      const result = await eventModel.deleteEvent(request.params);
      const fileName = result.data[0].image.split(".")[0];
      // PROSES DELETE FILE DI CLOUDINARY
      await cloudinary.uploader.destroy(fileName, (result) => {});
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
};
