const supabase = require("../config/supabase");
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
  getAllEvent: (offset, limit, name, sortColumn, sortType, day, nextDay) =>
    new Promise((resolve, reject) => {
      const req = supabase
        .from("event")
        .select("*")
        .range(offset, offset + limit - 1)
        .ilike("name", `%${name}%`)
        .order(sortColumn, { ascending: sortType });
      if (day) {
        req
          .gt("dateTimeShow", ` ${day.toISOString()}`)
          .lt("dateTimeShow", `${nextDay.toISOString()}`)
          .then((result) => {
            if (!result.error) {
              resolve(result);
            } else {
              reject(result);
            }
          });
      } else {
        req.then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
      }
    }),

  getEventById: (id) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*")
        .match({ eventId: id })
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createEvent: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .insert([data]) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  updateEvent: (id, data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .update(data)
        .match({ eventId: id })
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  deleteEvent: (params) =>
    new Promise((resolve, reject) => {
      const { id } = params;
      supabase
        .from("event")
        .delete()
        .match({ eventId: id })
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
