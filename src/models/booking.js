const supabase = require("../config/supabase");

module.exports = {
  getBookingByUserId: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("booking")
        .select("*")
        .eq("userId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createBooking: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("booking")
        .insert([data])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createBookingSection: (bookingId, section, statusUsed) =>
    new Promise((resolve, reject) => {
      supabase
        .from("bookingSection")
        .insert([{ bookingId, section, statusUsed }])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  getBookingSectionByEventId: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("booking")
        .select(
          "bookingId, eventId, statusPayment, bookingSection,bookingSection(section)"
        )
        .eq("eventId", id)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
