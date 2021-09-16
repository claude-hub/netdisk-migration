const winston = require("winston");
const path = require("path");

require("winston-daily-rotate-file");

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, "..", "logs", `%DATE%.log`),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  transports: [transport, new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
    )
  ),
});

module.exports.logger = logger;
