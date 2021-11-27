const mongoose = require("mongoose");
const winston = require("../util/logger");
const config = require("config");
const dbURL = config.get("dbURL");

module.exports = function () {
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to MongoDB"));
};
