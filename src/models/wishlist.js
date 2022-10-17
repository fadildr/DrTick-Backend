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
  getAllWishlist: (offset, limit, userId) =>
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
  getWishlistByEventId: (eventId, userId) =>
    new Promise((resolve, reject) => {
      supabase
        .from("wishlist")
        .select(
          `*,
      event(*)`
        )
        .eq("eventId", eventId)
        .eq("userId", userId)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  createWishlist: (data) =>
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
  updateWishlist: (id, data) =>
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
  deleteWishlist: (id) =>
    new Promise((resolve, reject) => {
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
  getWishlistByUserId: (id) =>
    new Promise((resolve, reject) => {
      // SELECT * FROM product WHERE id = "123"
      supabase
        .from("wishlist")
        .select("*")
        .match({ userId: id })
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
