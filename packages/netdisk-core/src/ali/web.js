/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 阿里网盘 web 接口
 * @Date: 2024-04-10 14:04:33
 * @LastEditTime: 2024-04-10 18:43:24
 */
const axios = require('axios');
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

  console.log('==', data)
  return data;
};



module.exports = {
  aliWebUserinfo,
  aliWebCreateFolder
}