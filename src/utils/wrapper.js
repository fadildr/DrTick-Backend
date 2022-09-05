module.exports = {
  response: (response, status, msg, data, pagination) => {
    const result = {
      status,
      msg,
      data,
      pagination,
    };
    return response.status(status).json(result);
  },
};
