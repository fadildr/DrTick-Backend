const supabase = require("../config/supabase");
const { register } = require("../controllers/auth");

module.exports = {
  showGreetings: () => new Promise((resolve, reject) => {}),
  getUserByEmail: (email) =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .select("*")
        .eq("email", email)
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
  register: (data) =>
    new Promise((resolve, reject) => {
      supabase
        .from("user")
        .insert([data]) // insert([{name: "Tea", price: 5000}])
        .then((result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(result);
          }
        });
    }),
};
