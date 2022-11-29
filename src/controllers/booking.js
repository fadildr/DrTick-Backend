const bookingModel = require("../models/booking");
const wrapper = require("../utils/wrapper");
const groupingSection = require("../utils/groupingSection");
const snapMidtrans = require("../config/midtrans");
const { transaction } = require("../config/midtrans");

module.exports = {
  getBookingByUserId: async (request, response) => {
    try {
      const { id } = request.params;

      // console.log(data);
      const result = await bookingModel.getBookingByUserId(id);
      return wrapper.response(
        response,
        200,
        "succes get data by bookingId",
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
      // console.log();

      const { bookingId } = result.data[0];
      // const totalCost = result.data[0].totalPayment;

      const parameter = {
        transaction_details: {
          order_id: bookingId,
          gross_amount: totalPayment,
        },
        credit_card: {
          secure: true,
        },
      };
      const dataTransaction = await snapMidtrans.createTransaction(parameter);

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

      const allData = {
        ...result.data[0],
        ...dataTransaction,
        section: resultBookingSection,
        // url: transactionUrl,
      };
      return wrapper.response(
        response,
        200,
        "succes create data booking",
        allData
        // transaction
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
  getBookingSectionByEventId: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await bookingModel.getBookingSectionByEventId(id);
      console.log(result);
      const resultSection = groupingSection(result);
      // console.log(resultSection);
      return wrapper.response(
        response,
        200,
        "succes get data by eventId",
        resultSection
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
