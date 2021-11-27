var appRoot = require("app-root-path");
var winston = require("winston");
const { format } = winston;
const { timestamp, printf, combine } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

var logger = new winston.createLogger({
  format: combine(timestamp(), myFormat),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${appRoot}/logs/uncaughtException.log`,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: `${appRoot}/logs/uncaughtRejection.log`,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});
//
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
