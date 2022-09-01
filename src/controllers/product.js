module.exports = {
  showGreetings: async (request, response) => {
    try {
      response.status(200).send("Hello World!");
    } catch (error) {
      console.log(error);
    }
  },
};
