/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-16 11:51:27
 * @LastEditTime: 2024-01-18 14:38:36
 */
const downloader = require('./downloader');
const fileUtils = require('./file');

/**
 * 百度文件下载
 * @param {*} list
 * @param {*} token
 * @returns
 */
const downloadBaidu = (list, token) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    const start = async () => {
      if (counter > 3) {
        return;
      }
      // 一个任务
      const task = list.shift();
      if (task) {
        const { isdir, md5, path, dlink } = task;
        if (isdir === 0 && md5 && dlink) {
          try {
            await downloader(`${dlink}&access_token=${token}`, path);
          } catch (err) {
            // reject(err);
            console.log(err)
          }
          counter += 1;
          start();
        }
      } else {
        resolve(0);
      }
    };
    start();
  });
};

module.exports = {
  downloadBaidu,
  downloader,
  ...fileUtils
};
