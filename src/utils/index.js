/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description:
 * @Date: 2024-01-16 11:51:27
 * @LastEditTime: 2024-01-16 14:46:07
 */
const fse = require('fs-extra');
const { default: axios } = require('axios');
const path = require('path');
const downloadDefaultPath = path.resolve(__dirname, '../../download');

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
        const { isdir, md5, path, filename, dlink } = task;
        if (isdir === 0 && md5 && dlink) {
          axios
            .get(`${dlink}&access_token=${token}`, {
              headers: {
                'User-Agent': 'pan.baidu.com',
              },
              responseType: 'stream',
            })
            .then(async ({ data, headers }) => {
              // const totalLength = headers['content-length'];
              // const progressBar = new ProgressBar(
              //   `-> ${filename} downloading [:bar] :percent :rate/bps :etas`,
              //   {
              //     width: 40,
              //     complete: '=',
              //     incomplete: ' ',
              //     renderThrottle: 1,
              //     total: parseInt(totalLength, 10),
              //   }
              // );

              // 当前下载的相对目录
              const downloadFolder = path.replace(`/${filename}`, '');
              const downloadPath = `${downloadDefaultPath}${downloadFolder}`;
              // 下载的绝对目录，不存在则创建
              await fse.mkdirsSync(downloadPath);

              const realPath = `${downloadDefaultPath}${path}`;

              const tempPath = `${realPath.substring(
                0,
                realPath.lastIndexOf('.')
              )}.temp`;
              // 下载
              const writer = fse.createWriteStream(tempPath);

              // data.on('data', (chunk) => progressBar.tick(chunk.length));
              data.pipe(writer);

              // eslint-disable-next-line promise/param-names
              await new Promise((res, rej) => {
                writer.on('finish', () => {
                  res(0);
                });
                writer.on('error', (err) => {
                  rej(err);
                });
              });
              await fse.renameSync(tempPath, realPath);
              counter -= 1;
              // 继续start
              start();
            })
            .catch((err) => {
              console.log('=====报错了', err.message);
              reject(err);
            });
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
};
