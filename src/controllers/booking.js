const bookingModel = require("../models/booking");
const wrapper = require("../utils/wrapper");
const groupingSection = require("../utils/groupingSection");
module.exports = {
  getBookingByUserId: async (request, response) => {
    try {
      const { id } = request.params;
      console.log(id);
      // console.log(data);
      const result = await bookingModel.getBookingByUserId(id);
      return wrapper.response(
        response,
        200,
        "succes get data by bookingId",
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
  createBooking: async (request, response) => {
    try {
      const {
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
        statusPayment,
        section,
      } = request.body;
      const { userId } = request.params;
      const setBooking = {
        userId,
        eventId,
        totalTicket,
        totalPayment,
        paymentMethod,
        statusPayment,
      };

      const result = await bookingModel.createBooking(setBooking);
      const { bookingId } = result.data[0];
      //   console.log(request.body);
      const resultBookingSection = await Promise.all(
        section.map(async (element) => {
          try {
            await bookingModel.createBookingSection(bookingId, element, false);
            return element;
          } catch (error) {
            return error.error;
          }
        })
      );
      //   console.log(result.body);
      const allData = { ...result.data[0], section: resultBookingSection };
      return wrapper.response(
        response,
        200,
        "succes create data booking",
        allData
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
  getBookingSectionByEventId: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await bookingModel.getBookingSectionByEventId(id);
      console.log(result);
      const resultSection = groupingSection(result);
      return wrapper.response(
        response,
        200,
        "succes get data by bookingId",
        resultSection
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
