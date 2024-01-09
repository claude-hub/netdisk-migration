/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-09 12:01:29
 * @LastEditTime: 2024-01-09 15:08:51
 */
const axios = require('axios');
const qs = require('node:querystring');
const router = require('./base');

const cookieName = 'baidu_token'

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
    ctx.cookies.set(cookieName, access_token)

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

router.get('/baidu/user', async (ctx) => {
  console.log(ctx.cookies.get(cookieName))
  ctx.body = '11232'
})

module.exports = router;
