/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-09 11:18:08
 * @LastEditTime: 2024-01-09 15:23:42
 */
const axios = require('axios');

const API_PREFIX = 'https://pan.baidu.com/rest/2.0/xpan';

const getBaiduUserinfo = async (token) => {
  const res = await axios.get(
    `${API_PREFIX}/nas?access_token=${token}&method=uinfo`
  );
  return res.data;
};

module.exports = {
  getBaiduUserinfo,
};
