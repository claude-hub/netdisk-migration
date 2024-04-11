/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-19 15:09:34
 * @LastEditTime: 2024-04-11 17:35:56
 */
const web = require('./web');
const openapi = require('./openapi');

module.exports = {
  ...web,
  ...openapi
}
