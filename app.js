/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-05 16:50:37
 * @LastEditTime: 2024-01-09 10:46:44
 */
const Koa = require('koa');
const static = require('koa-static');
const path = require('path');
const Router = require('@koa/router');
const axios = require('axios');
const qs = require('node:querystring');

const router = new Router({
  prefix: '/api',
});

const app = new Koa();

const staticPath = './public';

// 注册中间件
app.use(static(path.join(__dirname, staticPath)));

router.get('/auth/baidu', async (ctx, next) => {
  const { url } = ctx;
  const [, search] = url.split('?');
  const { code = '' } = qs.parse(search) || {};

  const params = {
    grant_type: 'authorization_code',
    code,
    client_id: 'ncYkdVSxHyXRRwuZDnNlVPuD3CVxybNV',
    client_secret: 'UxKE1SlyBmsWf4OymEOa8TsbS0ofWuvy',
    redirect_uri: 'https://pan.claude-hub.cn/api/auth/baidu',
  };

  try {
    const res = await axios.get(
      `https://openapi.baidu.com/oauth/2.0/token?${qs.stringify(params)}`
    );
  
    ctx.set("Content-Type", "text/html");
    
    ctx.body = `
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>云盘迁移</title>
      </head>

      <body>
        <script language='javascript' type='text/javascript'>
          window.opener.postMessage(${JSON.stringify(res.data)});
          window.close();
        </script>
      </body>

      </html>
    
    `
  } catch(e) {
    ctx.body = {
      code: 500,
      data: e.response.data
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3008, () => {
  console.log('3008项目启动');
});
