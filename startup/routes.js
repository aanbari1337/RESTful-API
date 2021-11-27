require("express-async-errors");
const morgan = require("morgan");
const express = require("express");
const error = require("../middleware/error");
const winston = require("../util/logger");
const genres = require("../controllers/genres");
const customers = require("../controllers/customers");
const movies = require("../controllers/movies");
const rentals = require("../controllers/rentals");
const users = require("../controllers/users");
const auth = require("../controllers/auth");

module.exports = function (app) {
  app.use(morgan("combined", { stream: winston.stream }));
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
