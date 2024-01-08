const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const Router = require('@koa/router');

const router = new Router({
  prefix: '/api',
});

const app = new Koa();

const staticPath = './public';

// 注册中间件
app.use(static(path.join(__dirname, staticPath)));

router.get('/', (ctx, next) => {
  ctx.body = {
    text: 'hello world!'
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3008, () => {
  console.log('3008项目启动');
});
