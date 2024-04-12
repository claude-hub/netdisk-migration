/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-11 20:23:51
 * @LastEditTime: 2024-04-12 14:46:47
 */
const winston = require('winston');
const path = require('path');
const findWorkspaceRoot = require('find-yarn-workspace-root');

require('winston-daily-rotate-file');

require('dotenv').config();


const { logs_folder } = process.env;

const logs = logs_folder || path.join(findWorkspaceRoot(process.cwd()), 'logs');

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(logs, `%DATE%.log`),
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