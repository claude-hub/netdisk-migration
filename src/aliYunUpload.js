const { default: axios } = require('axios');
const fse = require('fs-extra');
const { getEnv, logger, updateEnv } = require('../utils');

const BASE_API = 'https://api.aliyundrive.com';

const refreshToken = async () => {
  const { ali_refresh_token, ali_access_token } = getEnv();
  const params = {
    refresh_token: ali_refresh_token,
  };
  const headers = {
    'content-type': 'application/json;charset=UTF-8',
    origin: 'https://www.aliyundrive.com',
    referer: 'https://www.aliyundrive.com/',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
  };

  try {
    const { data } = await axios({
      url: 'https://websv.aliyundrive.com/token/refresh',
      method: 'POST',
      data: params,
      headers,
    });
    const { refresh_token, access_token, token_type } = data;
    updateEnv({
      ali_access_token: `${token_type} ${access_token}`,
      ali_refresh_token: refresh_token,
    });
  } catch(err) {
    logger.info('刷新token失败');
    logger.error(err);
  }

};

const baseRequest = async (req) => {
  const { ali_access_token } = getEnv();
  const headers = {
    accept: 'application/json, text/plain, */*',
    authorization: ali_access_token,
    'content-type': 'application/json;charset=UTF-8',
    origin: 'https://www.aliyundrive.com',
    referer: 'https://www.aliyundrive.com/',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
  };
  try {
    return await req?.({ headers });
  } catch (err) {
    if (err?.response?.data?.code === 'AccessTokenInvalid') {
      refreshToken();
      const { ali_access_token: token } = getEnv();
      return await req?.({
        headers: {
          ...headers,
          authorization: token,
        },
      });
    } else {
      throw err;
    }
  }
};

const getUserInfo = async () => {
  try {
    const { data } = await baseRequest((config) => {
      return axios({
        url: `${BASE_API}/v2/user/get`,
        method: 'POST',
        data: {},
        ...config,
      });
    });
    return data;
  } catch(err) {
    logger.info('获取用户信息失败!');
    logger.error(err);
  }
};

const getFileList = async (driveId, parent_file_id = 'root') => {
  const params = {
    drive_id: driveId,
    parent_file_id: parent_file_id,
    limit: 100,
    all: false,
    image_thumbnail_process: 'image/resize,w_160/format,jpeg',
    image_url_process: 'image/resize,w_1920/format,jpeg',
    video_thumbnail_process: 'video/snapshot,t_0,f_jpg,ar_auto,w_300',
    fields: '*',
    order_by: 'updated_at',
    order_direction: 'DESC',
  };

  const { data } = await baseRequest((config) => {
    return axios({
      url: `${BASE_API}/v2/file/list`,
      method: 'POST',
      data: params,
      ...config,
    });
  });
  return data;
};

const uploadToAliYun = async () => {
  // 第一步：获取用户信息
  const { default_drive_id } = await getUserInfo();
  console.log(default_drive_id);

  const fileList = await getFileList(default_drive_id);
  // console.log(fileList);
};

module.exports = uploadToAliYun;
