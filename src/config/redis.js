const redis = require("redis");

const redisPassword = "z5TDRF2PBe6YOc41kQTrdqpuHxaaR3X4";
const redisHost = "redis-11126.c14.us-east-1-2.ec2.cloud.redislabs.com";
const redistPort = "11126";

// REMOTE : rdcli -h redis-11606.c240.us-east-1-3.ec2.cloud.redislabs.com -a ytCJxzIg640RA0qX5tMC8ciLwx08AS92 -p 11606

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
