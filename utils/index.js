const winston = require('winston');
const path = require('path');
const fes = require('fs-extra');

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
  if (fes.pathExistsSync(localEnvPath)) {
    return localEnvPath;
  }
  return envPath;
};

const getEnv = () => {
  const envPath = getEnvPath();
  const env = fes.readFileSync(envPath, 'utf-8');
  return JSON.parse(env);
};

const updateEnv = (params) => {
  const env = {
    ...getEnv(),
    ...params,
  };
  fes.writeJSONSync(getEnvPath(), env, {
    spaces: '\n',
  });
};

module.exports = {
  logger,
  getEnv,
  updateEnv,
};
