const supabase = require("../config/supabase");

module.exports = {
  // showGreetings: () => new Promise((resolve, reject) => {}),
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
  getAllData: (offset, limit, name) =>
    new Promise((resolve, reject) => {
      supabase
        .from("event")
        .select("*")
        .range(offset, offset + limit - 1)
        .ilike("name", `%${name}%`)
        // .order("created_at", { ascending: true })
        .order("name", { ascending: true })
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
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("event")
        .select("*")
        .eq("eventId", id)
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
