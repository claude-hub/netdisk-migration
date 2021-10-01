const fetch = require('node-fetch');
const { default: axios } = require('axios');
const fse = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
const rp = require('request-promise');
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
  } catch (err) {
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
  } catch (err) {
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

const getSha1Hash = async (filepath) => {
  return await new Promise((resolve) => {
    //从文件创建一个可读流
    const stream = fse.createReadStream(filepath);
    const fsHash = crypto.createHash('sha1');

    stream.on('data', (d) => {
      fsHash.update(d);
    });

    stream.on('end', () => {
      const sha1 = fsHash.digest('hex');
      resolve(sha1);
    });
  });
};

const getFileInfo = async (filepath) => {
  const name = filepath.split('/').pop();
  const content_hash = await getSha1Hash(filepath);
  const size = fse.statSync(filepath).size;
  return {
    content_hash: content_hash,
    name: name,
    size: size,
  };
};

const createFile = async (fileInfo, drive_id, parent_file_id = 'root') => {
  const { content_hash, name, size } = fileInfo;
  const params = {
    // auto_rename: true,
    auto_rename: false,
    content_hash: content_hash,
    content_hash_name: 'sha1',
    drive_id: drive_id,
    hidden: false,
    name: name,
    parent_file_id: parent_file_id,
    type: 'file',
    size: size,
  };
  const { data } = await baseRequest((config) => {
    return axios({
      method: 'POST',
      url: `${BASE_API}/v2/file/create`,
      data: params,
      ...config,
    });
  });
  return data;
};

const uploadComplete = async (drive_id, file_id, upload_id) => {
  const params = {
    drive_id: drive_id,
    file_id: file_id,
    upload_id: upload_id,
  };

  try {
    const { data } = await baseRequest((config) => {
      return axios({
        method: 'POST',
        url: `${BASE_API}/v2/file/complete`,
        data: params,
        ...config,
      });
    });
    return data;
  } catch (err) {
    logger.info('上传完成失败！');
    logger.error(err.message);
  }
};

const upload = async (filePath, uploadUrl) => {
  try {
    const fileData = fse.readFileSync(filePath, {
      encoding: 'utf-8',
    });
    await rp.put(uploadUrl, {
      body: fileData,
    });
    return true;
  } catch (err) {
    logger.info('上传失败！');
    logger.error(err.message);
    return false;
  }
};

const uploadToAliYun = async () => {
  // 1：获取用户信息
  const { default_drive_id } = await getUserInfo();

  // const fileList = await getFileList(default_drive_id);

  const filePath = path.resolve(__dirname, '../README.md');
  // 2：获取文件信息
  const fileInfo = await getFileInfo(filePath);
  // 3：创建文件
  const data = await createFile(fileInfo, default_drive_id);
  const { part_info_list, upload_id, file_id } = data;
  const uploadUrl = part_info_list?.[0]?.['upload_url'];
  // 4：上传
  const status = await upload(filePath, uploadUrl);
  if (status) {
    // 4：上传完成
    await uploadComplete(default_drive_id, file_id, upload_id);
    logger.info('文件上传成功，文件路径：' + filePath);
  }
};

module.exports = { uploadToAliYun, getSha1Hash };
