/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 单线程下载器
 * @Date: 2024-01-17 11:00:43
 * @LastEditTime: 2024-01-18 11:45:33
 */
const path = require('path');
const md5File = require('md5-file');
const { default: axios } = require('axios');
const {
  pathExistsSync,
  lstatSync,
  removeSync,
  createWriteStream,
  mkdirsSync,
} = require('fs-extra');

const downloadFolder = '../../public/download';

const downloadByRange = async (url, start, end) => {
  return await axios.get(url, {
    headers: {
      Range: `bytes=${start}-${end}`,
    },
    responseType: 'stream',
  });
};

const downloader = (url, relativePath = '') => {
  return new Promise(async (resolve, reject) => {
    try {
      const filePath = path.resolve(
        __dirname,
        path.join(downloadFolder, relativePath)
      );
      // 先请求一个字节，获取到文件大小。以及是否支持断点下载
      const res = await downloadByRange(url, 0, 1);
      const { headers } = res;
      const acceptRanges = headers['accept-ranges'];
      if (acceptRanges !== 'bytes') {
        reject('资源不支持断点下载');
        return;
      }

      const totalSize = Number(headers['content-range'].split('/')[1]) || 0;
      let localSize = 0;
      // 文件 md5 信息，下载完成后，需要对比
      const md5 = headers['content-md5'];

      const isExists = pathExistsSync(filePath);

      if (isExists) {
        const stat = lstatSync(filePath);
        localSize = stat.size;

        if (localSize === totalSize && md5File.sync(filePath) === md5) {
          resolve();
          console.info('文件已下载完成')
          return;
        }

        if (localSize > totalSize) {
          removeSync(filePath);
          reject('文件大小异常，直接删除');
          return;
        }
      }

      const { data } = await downloadByRange(url, localSize, totalSize - 1);

      // 获取下载文件夹
      const dirPath = path.dirname(filePath);
      // 下载的目录，不存在则创建
      await mkdirsSync(dirPath);

      const fileWriter = createWriteStream(filePath, {
        // 打开文件进行追加。如果文件不存在，则创建该文件。
        flags: 'a',
      });

      data.on('data', (chunk) => {
        localSize += chunk.length;
        console.log('已完成：', ((localSize / totalSize) * 100).toFixed(2));
      });

      data.pipe(fileWriter);

      fileWriter.on('finish', () => {
        if (md5File.sync(filePath) === md5) {
          // 下载完成
          resolve();
          return;
        }
        removeSync(filePath);
        reject('下载完成，但是文件异常，直接删除');
      });
      fileWriter.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = downloader;
