/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-08 11:15:42
 * @LastEditTime: 2024-04-09 12:37:51
 */
const winston = require('winston');
const path = require('path');
const fse = require('fs-extra');

require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '..', 'logs', `%DATE%.log`),
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

const getEnvPath = () => {
  const localEnvPath = path.resolve(__dirname, '../.env.local.json');
  const envPath = path.resolve(__dirname, '../.env.json');
  // 本地默认使用 .env.local
  if (fse.pathExistsSync(localEnvPath)) {
    return localEnvPath;
  }
  return envPath;
};

const getEnv = () => {
  const envPath = getEnvPath();
  const env = fse.readFileSync(envPath, 'utf-8');
  return JSON.parse(env);
};

const updateEnv = (params) => {
  const env = {
    ...getEnv(),
    ...params,
  };
  fse.writeJSONSync(getEnvPath(), env, {
    spaces: '\n',
  });
};

// 递归创建文件夹
const mkdirsSync = (dirname) => {
  if (!dirname) return false
  if (fse.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fse.mkdirSync(dirname);
      return true;
    }
  }
}

module.exports = {
  logger,
  getEnv,
  updateEnv,
  mkdirsSync
};
