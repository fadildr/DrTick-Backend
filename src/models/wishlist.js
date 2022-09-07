const supabase = require("../config/supabase");

module.exports = {
  // showGreetings: () => new Promise((resolve, reject) => {}),
  getCountData: () =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select("*", { count: "exact" })
        .then((result) => {
          if (!result.error) {
            resolve(result.count);
          } else {
            reject(result);
          }
        });
    }),
  getAllData: (offset, limit, userId) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select(`*, event(name,location,category,detail)`)
        .range(offset, offset + limit - 1)
        .eq("userId", userId)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),

  // new Promise(async (resolve, reject) => {
  //   const result = await supabase.from("product").select("*");
  //   console.log(result);
  // }),
  getDataById: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("wishlist")
        .select("*")
        .match({ wishlistId: id })
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
        .from("wishlist")
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
        .from("wishlist")
        .update(data)
        .match({ wishlistId: id })
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
        .from("wishlist")
        .delete()
        .match({ wishlistId: id })
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
