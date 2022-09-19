const client = require("../config/redis");
const wrapper = require("../utils/wrapper");

module.exports = {
  getEventById: async (request, response, next) => {
    try {
      const { id } = request.params;
      let result = await client.get(`getEvent:${id}`);
      if (result !== null) {
        // console.log("DATA ADA DIDALAM REDIS");
        result = JSON.parse(result);
        return wrapper.response(
          response,
          200,
          "Success Get Event By Id",
          result
        );
      }
      //   console.log("DATA TIDAK ADA DI DALAM REDIS");
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  getAllEvent: async (request, response, next) => {
    try {
      let result = await client.get(
        `getEvent:${JSON.stringify(request.query)}`
      );
      if (result !== null) {
        // console.log("DATA ADA DIDALAM REDIS");
        result = JSON.parse(result);
        return wrapper.response(
          response,
          200,
          "Success Get event !",
          result.result,
          result.pagination
        );
      }
      //   console.log("DATA TIDAK ADA DIDALAM REDIS");
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  clearEvent: async (request, response, next) => {
    try {
      const keys = await client.keys("getEvent:*");
      if (keys.length > 0) {
        keys.forEach(async (element) => {
          await client.del(element);
        });
      }
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  getWishlistById: async (request, response, next) => {
    try {
      const { id } = request.params;
      let result = await client.get(`getWishlist:${id}`);
      if (result !== null) {
        // console.log("DATA ADA DIDALAM REDIS");
        result = JSON.parse(result);
        return wrapper.response(
          response,
          200,
          "Success Get wishlist By Id",
          result
        );
      }
      //   console.log("DATA TIDAK ADA DI DALAM REDIS");
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  getAllWishlist: async (request, response, next) => {
    try {
      let result = await client.get(
        `getWishlist:${JSON.stringify(request.query)}`
      );
      if (result !== null) {
        // console.log("DATA ADA DIDALAM REDIS");
        result = JSON.parse(result);
        return wrapper.response(
          response,
          200,
          "Success Get Wishlist !",
          result.result,
          result.pagination
        );
      }
      //   console.log("DATA TIDAK ADA DIDALAM REDIS");
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  deleteWishlist: async (request, response, next) => {
    try {
      const keys = await client.keys("getWishlist:*");
      if (keys.length > 0) {
        keys.forEach(async (element) => {
          await client.del(element);
        });
      }
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  getBookingById: async (request, response, next) => {
    try {
      const { id } = request.params;
      let result = await client.get(`getBooking:${id}`);
      if (result !== null) {
        // console.log("DATA ADA DIDALAM REDIS");
        result = JSON.parse(result);
        return wrapper.response(
          response,
          200,
          "Success Get Booking By Id",
          result
        );
      }
      //   console.log("DATA TIDAK ADA DI DALAM REDIS");
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  getAllBooking: async (request, response, next) => {
    try {
      let result = await client.get(
        `getBooking:${JSON.stringify(request.query)}`
      );
      if (result !== null) {
        // console.log("DATA ADA DIDALAM REDIS");
        result = JSON.parse(result);
        return wrapper.response(
          response,
          200,
          "Success Get Booking !",
          result.result,
          result.pagination
        );
      }
      //   console.log("DATA TIDAK ADA DIDALAM REDIS");
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
  deleteBooking: async (request, response, next) => {
    try {
      const keys = await client.keys("getBooking:*");
      if (keys.length > 0) {
        keys.forEach(async (element) => {
          await client.del(element);
        });
      }
      return next();
    } catch (error) {
      return wrapper.response(response, 400, error.message, null);
    }
  },
};
