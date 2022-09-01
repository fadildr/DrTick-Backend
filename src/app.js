/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");
const routerNavigation = require("./routes"); // ./routes/index.js

const app = express();
const port = 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/greetings", (request, response) => {
//   response.status(200).send("Hello World!");
// });

app.use("/api", routerNavigation);

app.use("/*", (req, res) => {
  res.status(404).send("Path Not Found !");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
