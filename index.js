/*
 * @@Author: zhangyunpeng@sensorsdata.cn
 * @@Description:
 * @Date: 2024-01-05 15:59:44
 * @LastEditTime: 2024-01-05 16:02:23
 */
const exec = require('child_process').exec;
const cmd = 'npm run start';

exec(cmd, (error, stdout, stderr) => {
  // 获取命令执行的输出

  console.log('=====', error, stderr, stdout);
});
