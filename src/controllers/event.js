const eventModel = require("../models/event");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");
const client = require("../config/redis");
module.exports = {
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
  getAllData: async (request, response) => {
    try {
      let { page, limit, name, sort, sortType } = request.query;
      page = +page || 1;
      limit = +limit || 5;

      const totalData = await eventModel.getCountData();
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        // page, totalPage, limit, totalData
        page,
        totalPage,
        limit,
        totalData,
      };
      let type;
      const offset = page * limit - limit;
      if (sortType.toLowerCase() === "asc") {
        type = true;
      }
      if (sortType.toLowerCase() === "dsc") {
        type = false;
      }

      const result = await eventModel.getAllData(
        offset,
        limit,
        name,
        sort,
        type
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
  getDataById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await eventModel.getDataById(id);
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

  createData: async (request, response) => {
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
      const result = await eventModel.createData(setData);

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
      const { id } = request.params;
      const { name, category, location, detail, dateTimeShow, price } =
        request.body;
      const checkId = await eventModel.getDataById(id);
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
        await cloudinary.uploader.destroy(image, (result) => {
          return result;
        });
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
      return wrapper.response(response, status, statusText, errorData);
    }
  },
  deleteData: async (request, response) => {
    try {
      const result = await eventModel.deleteData(request.params);
      let fileName = result.data[0].image.split(".")[0];
      // PROSES DELETE FILE DI CLOUDINARY
      await cloudinary.uploader.destroy(fileName, (result) => {
        console.log(result);
      });
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
