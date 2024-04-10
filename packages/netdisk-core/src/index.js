/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 15:42:59
 * @LastEditTime: 2024-04-10 11:39:05
 */
const baidu = require('./baidu');
const ali = require('./ali');
const { mkdirsSync, downloader } = require('./utils');

module.exports = {
  ...baidu,
  ...ali,
  mkdirsSync,
  downloader
}