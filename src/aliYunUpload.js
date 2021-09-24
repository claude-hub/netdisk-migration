const fetch = require('node-fetch');
const { default: axios } = require('axios');
const fse = require('fs-extra');
const path = require('path');
const crypto = require('crypto');
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
      console.log(ali_access_token === token);
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

// const fileExists = async (self, parent_file_id, file_info) => {
//   const part_num = compute_part_num(file_info, self.part_size)
//   const data = {"drive_id": self.drive_id,
//           "part_info_list": [{"part_number": i + 1} for i in range(part_num)],
//           "parent_file_id": parent_file_id,
//           "name": file_info.get("file_name"),
//           "type": "file",
//           "check_name_mode": "auto_rename",
//           "size": file_info.get("file_size"),
//           "pre_hash": file_info.get("pre_hash")}
//   const res = await axios.post("https://api.aliyundrive.com/adrive/v2/file/createWithFolders", data);
//   console.log(res);
// }

const createFile = async (fileInfo, drive_id, parent_file_id = 'root') => {
  const { content_hash, name, size } = fileInfo;
  const params = {
    auto_rename: true,
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
  // console.log(data);
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
    console.log('-------', data);
    return data;
  } catch (err) {
    // console.log(err);
  }
};

const upload = async (filePath, uploadUrl) => {
  try {
    const fileData = fse.readFileSync(filePath, {
      encoding: 'utf-8'
    });
    console.log(fileData);
    // const { data } = await baseRequest((config) => {
    //   const headers = {
    //     ...config.headers,
    //     'content-type': "application/x-www-form-urlencoded",
    //   };
    //   console.log(headers);
    //   return axios({
    //     method: 'PUT',
    //     url: uploadUrl,
    //     data: a,
    //     headers: {
    //       'content-type': "application/xml",
    //     }
    //   });
    // });
    // return data;
    // await axios({
    //   method: "PUT",
    //   url: uploadUrl,
    //   data: fileData
    // })

    // const headers = {
    //   'content-type': 'application/json;charset=UTF-8',
    //   origin: 'https://www.aliyundrive.com',
    //   referer: 'https://www.aliyundrive.com/',
    //   'user-agent':
    //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
    // };

    // const res = await fetch(uploadUrl, { method: 'PUT', body: fileData, headers });
    // console.log(res);

    const FormData = require('form-data');
    const formdata = new FormData();
    formdata.append("file", fileData);
    const res = await fetch(decodeURIComponent(uploadUrl), {
      method: 'PUT',
      body: formdata,
      headers: {
        'content-type': "application/xml"
      }
      //  headers: formdata.getHeaders(),
    });

    console.log(res);

  } catch (err) {
    console.log(err);
  }
};

const uploadToAliYun = async () => {
  // // 第一步：获取用户信息
  const { default_drive_id } = await getUserInfo();
  console.log(default_drive_id);

  // const fileList = await getFileList(default_drive_id);
  // // console.log(fileList);

  const filePath = path.resolve(__dirname, '../README.md');

  const fileInfo = await getFileInfo(filePath);
  console.log(fileInfo);

  // 上传
  // const { file_id, upload_id } = await upload(fileInfo, default_drive_id);
  // console.log(file_id, upload_id);
  const data = await createFile(fileInfo, default_drive_id);
  const uploadUrl = data['part_info_list'][0]['upload_url'];
  console.log(decodeURIComponent(uploadUrl));

  const a = await upload(filePath, uploadUrl);
  // 上传完成
  // uploadComplete(default_drive_id, file_id, upload_id);
};

module.exports = { uploadToAliYun, getSha1Hash };
