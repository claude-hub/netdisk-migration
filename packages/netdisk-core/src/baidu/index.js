/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 16:03:46
 * @LastEditTime: 2024-04-09 16:31:10
 */
const axios = require('axios');
const qs = require('node:querystring');
const { downloadBaidu } = require('../utils');

const API_PREFIX = 'https://pan.baidu.com/rest/2.0/xpan';

const getBaiduUserinfo = async (token) => {
  const res = await axios.get(
    `${API_PREFIX}/nas?access_token=${token}&method=uinfo`
  );
  return res.data;
};

const getBaiduFiles = async (token, path = '/') => {
  const res = await axios.get(
    `${API_PREFIX}/file?${qs.stringify({
      method: 'list',
      access_token: token,
      dir: path,
      web: 1,
    })}`
  );
  return res.data;
};

// 递归获取指定目录下的文件
const getBaiduAllList = async (token, path = '/') => {
  const url = `${API_PREFIX}/multimedia?${qs.stringify({
    access_token: token,
    method: 'listall',
    path,
    recursion: 1,
    order: 'name',
    // limit: 1
  })}`;

  const res = await axios.get(url);
  return res.data;
}

const downloadBaiduFile = async (token, fsids = []) => {
  const {
    data: { list },
  } = await axios.get(
    `${API_PREFIX}/multimedia?${qs.stringify({
      method: 'filemetas',
      access_token: token,
      dlink: 1,
    })}&fsids=[${fsids}]`
  );

  if (list.length <= 0) {
    return;
  }
  await downloadBaidu(list, token);
};

const downloadLink = async (token, fsids = []) => {
  const {
    data: { list },
  } = await axios.get(
    `${API_PREFIX}/multimedia?${qs.stringify({
      method: 'filemetas',
      access_token: token,
      dlink: 1,
    })}&fsids=[${fsids}]`
  );

  return list;
};

module.exports = {
  getBaiduUserinfo,
  getBaiduFiles,
  downloadBaiduFile,
  downloadLink,
  getBaiduAllList
};