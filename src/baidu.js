/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 10:51:01
 * @LastEditTime: 2024-04-09 18:40:59
 */
const qs = require('qs');
const path = require('path');
const { logger, getEnv, mkdirsSync } = require('../utils');
const { default: axios } = require("axios")

const BASE_API = 'https://pan.baidu.com/rest/2.0/xpan';

const env = getEnv();

const userinfo = async () => {
  const params = {
    access_token: env.baidu_access_token,
    method: 'uinfo'
  }
  const url = `${BASE_API}/nas?${qs.stringify(params)}`;

  try {
    const { data: userinfo } = await axios.get(url);
    console.log(userinfo)
  } catch (e) {
    logger.error(e.response.data)
  }
}

const loginBaidu = async () => {
  await userinfo();

  // getBaiduFiles('/测试')
  // getBaiduAllList('/测试')

  downlaodBaiduFile({
    category: 4,
    fs_id: 344467918384277,
    isdir: 0,
    local_ctime: 1614565938,
    local_mtime: 1560140642,
    md5: '0459b5290jbc140f0c57b1e10af8dc7e',
    path: '/测试/内部文件夹/Pro Git 中文版本.pdf',
    server_ctime: 1614566330,
    server_filename: 'Pro Git 中文版本.pdf',
    server_mtime: 1712635455,
    size: 4662787
  })
}

const getBaiduFiles = async (dir = '/') => {
  const params = {
    access_token: env.baidu_access_token,
    method: 'list',
    dir
  }
  const url = `${BASE_API}/file?${qs.stringify(params)}`;

  try {
    const { data } = await axios.get(url);
    console.log(data)
  } catch (e) {
    logger.error(e.response.data)
  }
}

// 递归获取指定目录下的文件
const getBaiduAllList = async (path = '/') => {
  const params = {
    access_token: env.baidu_access_token,
    method: 'listall',
    path,
    recursion: 1,
    order: 'name',
    // limit: 1
  }
  const url = `${BASE_API}/multimedia?${qs.stringify(params)}`;

  try {
    const { data: { list = [] } } = await axios.get(url
      //   , headers = {
      //   'User-Agent': 'pan.baidu.com'
      // }
    );
    console.log(list)
  } catch (e) {
    logger.error(e.response.data)
  }
}


const downlaodBaiduFile = async (fileinfo) => {
  const { path: filePath, isdir, fs_id } = fileinfo;
  const floder = env.floder || path.resolve(__dirname);
  const realPath = path.join(floder, filePath);
  console.log(realPath);

  if (isdir === 1) {
    mkdirsSync(realPath);
  } else {
    const dlink = await baiduFileDlink(fs_id);
    console.log(dlink)
  }
}

const baiduFileDlink = async (fsid) => {
  const params = {
    method: 'filemetas',
    access_token: env.baidu_access_token,
    fsids: `[${fsid}]`,
    dlink: 1
  }
  const url = `${BASE_API}/multimedia?${qs.stringify(params)}`;
  try {
    const { data } = await axios.get(url);
    return data.list[0]?.dlink || '';
  } catch (e) {
    logger.error(e.response.data)
  }
}

module.exports = {
  loginBaidu
}