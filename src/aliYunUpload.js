const base_api = 'https://api.aliyundrive.com/v2/';

const headers = {
  accept: 'application/json, text/plain, */*',
  authorization: self.access_token,
  'content-type': 'application/json;charset=UTF-8',
  origin: 'https://www.aliyundrive.com',
  referer: 'https://www.aliyundrive.com/',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
};

const { getEnv } = require('../utils');

console.log(getEnv);
