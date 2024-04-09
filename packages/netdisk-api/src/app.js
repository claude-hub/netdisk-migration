/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-05 16:50:37
 * @LastEditTime: 2024-01-19 15:04:12
 */
const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const cors = require('koa2-cors');
const { koaBody } = require('koa-body');
const baidu = require('./routes/baidu');
const ali = require('./routes/ali');

const app = new Koa();

const staticPath = '../public';

// 服务端支持跨域
app.use(
  cors({
    origin: function (ctx) {
      const requestOrigin = ctx.get('Origin');
      const whiteList = [
        'http://localhost:5173',
      ];
      if (whiteList.includes(requestOrigin)) {
        return requestOrigin;
      }
      return false;
    },
    credentials: true, // 允许跨域的时候带着 cookie
  })
);

// 注册中间件
app.use(static(path.join(__dirname, staticPath)));
// 解析body，支持 json、form
app.use(koaBody());

// routes
app.use(baidu.routes()).use(baidu.allowedMethods());
app.use(ali.routes()).use(ali.allowedMethods());

module.exports = app;
