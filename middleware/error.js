const winston = require('../util/logger')
module.exports = function (err, req, res, next) {
  winston.error(err.message)
  res.status(500).send("Something failed.");
};
