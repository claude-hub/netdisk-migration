/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-09 12:04:27
 * @LastEditTime: 2024-04-09 14:43:23
 */
const Router = require('@koa/router');
const { getAliUserinfo } = require('../services');

const token = 'Bearer ';

const router = new Router({
  prefix: '/api/ali',
});

// 测试接口
router.get('/', async (ctx) => {
  ctx.body = {
    text: 'hello world!',
  };
});

router.get('/user', async (ctx) => {
  // const token = ctx.cookies.get(cookieName);
  try {
    const useinfo = await getAliUserinfo(token);
    console.log(useinfo)
    ctx.body = useinfo;
  } catch (e) {
    // console.log(e);
  }
});

module.exports = router;
