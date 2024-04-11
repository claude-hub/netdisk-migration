/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-11 20:23:51
 * @LastEditTime: 2024-04-11 20:28:30
 */
const winston = require('winston');
const path = require('path');

require('winston-daily-rotate-file');

require('dotenv').config();

const { logs_folder } = process.env;

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logs_folder, `%DATE%.log`),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  transports: [transport, new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) =>
        `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`
    )
  ),
});

module.exports = {
  logger
}