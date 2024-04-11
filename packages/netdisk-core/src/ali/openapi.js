/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-11 17:21:35
 * @LastEditTime: 2024-04-11 19:43:23
 */
const axios = require('axios');

const BASE_API = 'https://openapi.alipan.com';

const client_id = '36f4121ff0ed4d64b315b7a911f9335d';
const client_secret = 'c040c0bc75d84ccd80be9dfb8a897777';

const getAliToken = async (code) => {
  const { data } = await axios({
    url: `${BASE_API}/oauth/access_token`,
    method: 'POST',
    data: {
      client_id,
      client_secret,
      grant_type: 'authorization_code',
      code
    }
  })
  return data;
}

const getAliTokenByRefreshToken = async (refresh_token) => {
  const { data } = await axios({
    url: `${BASE_API}/oauth/access_token`,
    method: 'POST',
    data: {
      client_id,
      client_secret,
      grant_type: 'refresh_token',
      refresh_token
    }
  })
  return data;
}


const getAliDdrive = async (token) => {
  const { data } = await axios({
    url: `${BASE_API}/adrive/v1.0/user/getDriveInfo`,
    method: 'POST',
    // data: {},
    headers: {
      Authorization: token,
    },
  })
  return data;
}

const isAliPathExist = async (token, drive_id, file_path, create = true) => {
  try {
    const { data } = await axios({
      url: `${BASE_API}/adrive/v1.0/openFile/get_by_path`,
      method: 'POST',
      data: {
        drive_id,
        file_path
      },
      headers: {
        Authorization: token,
      },
    })
    return data?.file_id || '';
  } catch (e) {
    if (e.response?.data?.code === 'NotFound.File') {
      if (create) {
        // 文件夹不存在，则创建
        return await aliCreateFolderPath(token, file_path, drive_id);
      }
      return ''
    }
    throw e;
  }
}


/**
 * 创建文件夹
 * @param {*} token 
 * @param {*} params name, drive_id, parent_file_id = 'root'
 * @returns 
 */
const aliCreateFolder = async (token, params) => {
  if (!params.parent_file_id) {
    params.parent_file_id = 'root';
  }
  const { data } = await axios({
    method: 'POST',
    url: `${BASE_API}/adrive/v1.0/openFile/create`,
    data: {
      auto_rename: false,
      type: 'folder',
      // 同名不创建
      check_name_mode: 'refuse',
      ...params
    },
    headers: {
      Authorization: token,
    },
  });

  return data;
};

/**
 * 根据路径创建文件夹
 * @param {*} token 
 * @param {*} folderPath 路径
 * @param {*} driveId 盘
 * @returns 
 */
const aliCreateFolderPath = async (token, folderPath, driveId) => {
  const paths = folderPath.split('/').filter(item => item);

  let parentFileId = 'root';

  for (let index = 0; index < paths.length; index++) {
    const name = paths[index];
    const { file_id } = await aliCreateFolder(token, {
      name,
      drive_id: driveId,
      parent_file_id: parentFileId
    })
    parentFileId = file_id;
  }

  return parentFileId;
}


/**
 * 创建文件
 * @param {*} token 
 * @param {*} fileInfo 
 * @param {*} drive_id 
 * @param {*} parent_file_id 
 * @returns 
 */
const aliCreateFile = async (token, fileInfo, drive_id, parent_file_id = 'root') => {
  const { content_hash, name, size } = fileInfo;
  const params = {
    drive_id,
    parent_file_id,
    name,
    type: 'file',
    // 存在则不创建
    check_name_mode: 'refuse',

    // 文件 hash
    content_hash,
    content_hash_name: 'sha1',
    size,
  };
  const { data } = await axios({
    method: 'POST',
    url: `${BASE_API}/adrive/v1.0/openFile/create`,
    data: params,
    headers: {
      Authorization: token,
    }
  });
  return data;
};


const aliUploadComplete = async (token, drive_id, file_id, upload_id) => {
  const params = {
    drive_id,
    file_id,
    upload_id,
  };

  try {
    return await axios({
      method: 'POST',
      url: `${BASE_API}/adrive/v1.0/openFile/complete`,
      data: params,
      headers: {
        Authorization: token,
      }
    });
  } catch (e) {
    console.log(e.response.data)
  }
};

module.exports = {
  getAliToken,
  getAliTokenByRefreshToken,
  isAliPathExist,
  getAliDdrive,
  aliCreateFolder,
  aliCreateFolderPath,
  aliCreateFile,
  aliUploadComplete
}