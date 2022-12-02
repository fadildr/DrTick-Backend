const redis = require("redis");

const redisPassword = process.env.REDIS_PASWORD;
const redisHost = process.env.REDIS_HOST;
const redistPort = process.env.REDIS_PORT;
// REDIS_PASSWORD = "i87DyqPhWgZAL9FuDXb2gXCxkDLdJ95r"
// REDIS_HOST = "redis-16374.c11.us-east-1-2.ec2.cloud.redislabs.com"
// REDIS_PORT = "16374"
// // REMOTE : rdcli -h redis-16374.c11.us-east-1-2.ec2.cloud.redislabs.com -a i87DyqPhWgZAL9FuDXb2gXCxkDLdJ95r -p 16374

// const client = redis.createClient();
const client = redis.createClient({
  socket: {
    host: redisHost,
    port: redistPort,
  },
  password: redisPassword,
});

(async () => {
  client.connect();
  client.on("connect", () => {
    // eslint-disable-next-line no-console
    console.log("You're connected db redis ...");
  });
})();

module.exports = client;
