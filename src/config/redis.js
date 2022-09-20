const redis = require("redis");

const redisPassword = process.env.REDIS_PASWORD;
const redisHost = process.env.REDIS_HOST;
const redistPort = process.env.REDIS_PORT;

// // REMOTE : rdcli -h redis-11606.c240.us-east-1-3.ec2.cloud.redislabs.com -a ytCJxzIg640RA0qX5tMC8ciLwx08AS92 -p 11606

const client = redis.createClient();
// const client = redis.createClient({
//   socket: {
//     host: redisHost,
//     port: redistPort,
//   },
//   password: redisPassword,
// });

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("You're connected db redis ...");
  });
})();

module.exports = client;
