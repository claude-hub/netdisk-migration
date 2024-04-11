/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 阿里网盘 web 接口
 * @Date: 2024-04-10 14:04:33
 * @LastEditTime: 2024-04-11 16:49:25
 */
const axios = require('axios');
const crypto = require('crypto');
const fse = require('fs-extra');
const request = require('request-promise');
const BASE_API = 'https://api.aliyundrive.com';

/**
 * 用户信息
 * @param {*} token 
 * @returns 
 */
const aliWebUserinfo = async (token) => {
  const { data } = await axios({
    url: `${BASE_API}/v2/user/get`,
    method: 'POST',
    data: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

const aliWebDefaultDrive = async (token) => {
  const { data } = await axios({
    url: `${BASE_API}/v2/drive/get_default_drive`,
    method: 'POST',
    data: {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * 创建文件夹
 * @param {*} token 
 * @param {*} params name, drive_id, parent_file_id = 'root'
 * @returns 
 */
const aliWebCreateFolder = async (token, params) => {
  if (!params.parent_file_id) {
    params.parent_file_id = 'root';
  }
  const { data } = await axios({
    method: 'POST',
    url: `${BASE_API}/v2/file/create`,
    data: {
      auto_rename: false,
      type: 'folder',
      // 检查文件夹是否存在
      check_name_mode: 'refuse',
      ...params
    },
    headers: {
      Authorization: `Bearer ${token}`,
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
const aliWebCreateFolderPath = async (token, folderPath, driveId) => {
  const paths = folderPath.split('/').filter(item => item);

  let parentFileId = 'root';

  for (let index = 0; index < paths.length; index++) {
    const name = paths[index];
    const { file_id } = await aliWebCreateFolder(token, {
      name,
      drive_id: driveId,
      parent_file_id: parentFileId
    })
    parentFileId = file_id;
  }

  return parentFileId;
}

const aliWebCreateFile = async (token, fileInfo, drive_id, parent_file_id = 'root') => {
  const { content_hash, name, size } = fileInfo;
  const params = {
    // auto_rename: true,
    auto_rename: false,
    content_hash,
    content_hash_name: 'sha1',
    drive_id,
    hidden: false,
    name,
    parent_file_id,
    type: 'file',
    size,
    // 检查文件是否存在
    check_name_mode: 'refuse'
  };
  const { data } = await axios({
    method: 'POST',
    url: `${BASE_API}/v2/file/create`,
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return data;
};

const aliWebUpload = async (filePath, uploadUrl) => {
  try {
    const fileData = fse.readFileSync(filePath, {
      encoding: 'utf-8',
    });
    await request.put(uploadUrl, {
      body: fileData,
    });
    return true;
  } catch (err) {
    return false;
  }
};

const aliWebUploadComplete = async (token, drive_id, file_id, upload_id) => {
  const params = {
    drive_id,
    file_id,
    upload_id,
  };

  return await axios({
    method: 'POST',
    url: `${BASE_API}/v2/file/complete`,
    data: params,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
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
    content_hash,
    name: name,
    size: size,
  };
};


module.exports = {
  aliWebUserinfo,
  aliWebDefaultDrive,
  aliWebCreateFolder,
  getFileInfo,
  aliWebCreateFolderPath,
  aliWebCreateFile,
  aliWebUpload,
  aliWebUploadComplete
}