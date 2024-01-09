/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-09 12:04:27
 * @LastEditTime: 2024-01-09 12:13:14
 */
const Router = require('@koa/router');

const router = new Router({
  prefix: '/api',
});

// 测试接口
router.get('/', async (ctx) => {
  ctx.body = {
    text: 'hello world!'
  }
})

module.exports = router;
