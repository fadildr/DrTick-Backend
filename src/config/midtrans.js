const midtransClient = require("midtrans-client");

const isProduction = false;
const serverKey = process.env.SERVER_KEYS;
const clientKey = process.env.CLIENT_KEYS;

const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey,
});

module.exports = snap;
