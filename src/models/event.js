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
  getAllData: (offset, limit, name, sort, sortType) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*")
        .range(offset, offset + limit - 1)
        .ilike("name", `%${name}%`)
        .order(sort, { ascending: sortType })
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),

  getDataById: (id) =>
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
  createData: (data) =>
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
  updateData: (id, data) =>
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
  deleteData: (params) =>
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
