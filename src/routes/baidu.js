/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-09 12:01:29
 * @LastEditTime: 2024-01-18 14:38:46
 */
const axios = require('axios');
const qs = require('node:querystring');
const path = require('path');
const router = require('./base');
const { getBaiduUserinfo, getBaiduFiles, downloadBaiduFile } = require('../services');
const { getFolderFilesByTree } = require('../utils');

const cookieName = 'baidu_token';

// 百度授权重定向页
router.get('/auth/baidu', async (ctx) => {
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

router.post('/baidu/logout', async (ctx) => {
  ctx.cookies.set(cookieName, '');
  ctx.body = {
    code: 200,
    data: 'success',
  };
});

router.get('/baidu/user', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const useinfo = await getBaiduUserinfo(token);
  ctx.body = useinfo;
});

router.get('/baidu/files', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const { path = '/' } = ctx.query;
  const files = await getBaiduFiles(token, path);
  ctx.body = files;
});

router.post('/baidu/download', async (ctx) => {
  const token = ctx.cookies.get(cookieName);
  const { fsids = [] } = ctx.request.body;
  if (!fsids.length) {
    ctx.body = {
      code: 400,
      error: 'fsids error!',
    };
    return;
  }
  await downloadBaiduFile(token, fsids);
  const dir = path.resolve(__dirname, '../../public');
  const files = getFolderFilesByTree(dir);

  ctx.body = {
    code: 200,
    data: '下载完成',
    url: files
  };
});


module.exports = router;
