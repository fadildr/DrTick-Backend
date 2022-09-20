const crypto = require("crypto");

const accessKeys = crypto.randomBytes(32).toString("hex");
const refreshKeys = crypto.randomBytes(32).toString("hex");

console.table({ accessKeys, refreshKeys });
