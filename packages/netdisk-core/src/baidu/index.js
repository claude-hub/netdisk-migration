/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 16:03:46
 * @LastEditTime: 2024-04-11 20:07:37
 */
const axios = require('axios');
const qs = require('node:querystring');
const path = require('path');
const { downloadBaidu, mkdirsSync } = require('../utils');

// 项目根目录的 download 文件夹
const defaultFolder = path.resolve(process.cwd(), '../../download');
const API_PREFIX = 'https://pan.baidu.com/rest/2.0/xpan';

/**
 * 获取用户信息
 * @param {*} token 
 * @returns 
 */
const getBaiduUserinfo = async (token) => {
  const res = await axios.get(
    `${API_PREFIX}/nas?access_token=${token}&method=uinfo`
  );
  return res.data;
};

/**
 * 获取网盘文件列表
 * @param {*} token 
 * @param {*} path 
 * @returns 
 */
const getBaiduFiles = async (token, path = '/') => {
  const res = await axios.get(
    `${API_PREFIX}/file?${qs.stringify({
      method: 'list',
      access_token: token,
      dir: path,
      // web: 1,
      order: 'name',
    })}`
  );
  return res.data;
};

/**
 * 递归获取指定目录下的文件
 * @param {*} token 
 * @param {*} path 
 * @returns 
 */
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

/**
 * 根据 fsids 下载文件
 * @param {*} token 
 * @param {*} fsids 
 * @returns 
 */
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

/**
 * 根据 fsids 获取下载地址 dlink
 * @param {*} token 
 * @param {*} fsids 
 * @returns 
 */
const baiduFileDlink = async (token, fsids = []) => {
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

/**
 * 根据文件详情，获取下载链接 dlink
 * @param {*} token 
 * @param {*} fileinfo 
 * @param {*} folder 
 * @returns 
 */
const downloadByFileinfo = async (token, fileinfo, folder) => {
  const { path: filePath, isdir, fs_id } = fileinfo;
  const realPath = path.join(folder || defaultFolder, filePath);

  if (isdir === 1) {
    mkdirsSync(realPath);
  } else {
    return await baiduFileDlink(token, [fs_id]);
  }
}

module.exports = {
  getBaiduUserinfo,
  getBaiduFiles,
  downloadBaiduFile,
  baiduFileDlink,
  getBaiduAllList,
  downloadByFileinfo
};