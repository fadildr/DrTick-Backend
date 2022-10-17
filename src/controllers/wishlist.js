const { response } = require("express");
const wishlistModel = require("../models/wishlist");
const wrapper = require("../utils/wrapper");

module.exports = {
  getAllWishlist: async (request, response) => {
    try {
      // console.log(request.query);
      let { page, limit } = request.query;
      page = +page || 1;
      limit = +limit || 3;

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
      const result = await wishlistModel.getAllWishlist(offset, limit, userId);
      // console.log(result);
      // if (result.data.length < 1) {
      //   return wrapper.response(response, 404, "data not found", []);
      // }
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
  getWishlistById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await wishlistModel.getWishlistById(id);
      if (result.data.length < 1) {
        return wrapper.response(response, 404, "data not found", []);
      }
      // console.log(id);
      return wrapper.response(
        response,
        200,
        "succes get data by id in wishlist",
        "hello world"
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
  // getWishlistByUserId: async(request,response) =>{
  //   try {
  //     const {id} = request.params;
  //     const result = await wishlistModel.getWishlistByUserId
  //   } catch (error) {

  //   }
  // }
  createWishlist: async (request, response) => {
    try {
      const { eventId, userId } = request.body;
      const setWishlist = {
        eventId,
        userId,
      };
      const checkEventId = await wishlistModel.getWishlistByEventId(
        eventId,
        userId
      );
      console.log(checkEventId);
      if (checkEventId.data.length > 0) {
        const id = checkEventId.data[0].wishlistId;
        const result = await wishlistModel.deleteWishlist(id);
        return wrapper.response(
          response,
          result.status,
          "Success Delete Wishlist !",
          result.data
        );
      }
      const result = await wishlistModel.createWishlist(setWishlist);
      return wrapper.response(
        response,
        result.status,
        "Success Create Wishlist",
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
  updateWishlist: async (request, response) => {
    try {
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
        updateAt: "now()",
      };

      const result = await wishlistModel.updateWishlist(id, setData);

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
  deleteDataWishlist: async (request, response) => {
    try {
      const result = await wishlistModel.deleteDataWishlist(request.params);

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
