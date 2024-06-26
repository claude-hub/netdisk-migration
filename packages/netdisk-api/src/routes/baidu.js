/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-09 12:01:29
 * @LastEditTime: 2024-01-19 15:03:26
 */
const axios = require('axios');
const qs = require('node:querystring');
const path = require('path');
const Router = require('@koa/router');
const {
  getBaiduUserinfo,
  getBaiduFiles,
  downloadBaiduFile,
  downloadLink,
} = require('../services');
const { getFolderFilesByList } = require('../utils');

const cookieName = 'baidu_token';

const router = new Router({
  prefix: '/api/baidu',
});

// 百度授权重定向页
router.get('/auth', async (ctx) => {
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

    ctx.set('Content-Type', 'text/html');
    const { access_token } = res.data;
    ctx.cookies.set(cookieName, access_token, {
      maxAge: 10 * 24 * 60 * 60 * 1000 /*设置cookie过期时间10天，单位ms*/,
      // 设置为true后，前端页面不可直接访问cookie。
      httpOnly: false,
    });

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
          window.close();
        </script>
      </body>

      </html>
    
    `;
  } catch (e) {
    ctx.body = {
      code: 500,
      data: e.response.data,
    };
  }
});

router.post('/logout', async (ctx) => {
  ctx.cookies.set(cookieName, '');
  ctx.body = {
    code: 200,
    data: 'success',
  };
});

router.get('/user', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const useinfo = await getBaiduUserinfo(token);
  ctx.body = useinfo;
});

router.get('/files', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const { path = '/' } = ctx.query;
  const files = await getBaiduFiles(token, path);
  ctx.body = files;
});

router.post('/download', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const { fsids = [] } = ctx.request.body;
  if (!fsids.length) {
    ctx.body = {
      code: 400,
      error: 'fsids error!',
    };
    return;
  }
  try {
    await downloadBaiduFile(token, fsids);
    const dir = path.resolve(__dirname, '../../public');
    const files = getFolderFilesByList(dir);

    ctx.body = {
      code: 200,
      data: '下载完成',
      url: files,
    };
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e
    };
  }
});

router.post('/dlinks', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const { fsids = [] } = ctx.request.body;
  if (!fsids.length) {
    ctx.body = {
      code: 400,
      error: 'fsids error!',
    };
    return;
  }
  try {
    const dlinks = await downloadLink(token, fsids);

    ctx.body = {
      code: 200,
      data: dlinks
    };
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e
    };
  }
});

module.exports = router;
