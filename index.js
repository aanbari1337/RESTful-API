const winston = require("./util/logger");
const express = require("express");
const app = express();

require("./startup/config")();
require("./startup/db")();
require("./startup/validation")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
// const server = app.listen(port, () =>
//   winston.info(`Listening on port ${port} ...`)
// );
const server = app.listen(port, () => {});

module.exports = server;
