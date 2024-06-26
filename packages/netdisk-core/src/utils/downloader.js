/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 单线程下载器
 * @Date: 2024-01-17 11:00:43
 * @LastEditTime: 2024-04-12 15:23:25
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
const ProgressBar = require('progress');

const downloadByRange = async (url, start, end) => {
  return await axios.get(url, {
    headers: {
      Range: `bytes=${start}-${end}`,
      'User-Agent': 'pan.baidu.com',
    },
    responseType: 'stream',
  });
};

const downloader = (url, filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 先请求一个字节，获取到文件大小。以及是否支持断点下载
      const res = await downloadByRange(url, 0, 1);
      const { headers } = res;
      const acceptRanges = headers['accept-ranges'];
      if (acceptRanges !== 'bytes') {
        reject('资源不支持断点下载');
        return;
      }

      const totalSize = Number(headers['content-range']?.split('/')[1]) || 0;
      if (totalSize === 0) {
        reject('文件为空，不下载');
        return;
      }
      let localSize = 0;
      // 文件 md5 信息，下载完成后，需要对比
      const md5 = headers['content-md5'];

      const isExists = pathExistsSync(filePath);

      if (isExists) {
        const stat = lstatSync(filePath);
        localSize = stat.size;

        if (localSize === totalSize && md5File.sync(filePath) === md5) {
          console.info(`文件已下载完成: ${filePath}`);
          resolve();
          return;
        }

        if (localSize > totalSize) {
          removeSync(filePath);
          reject('文件大小异常，直接删除');
          return;
        }
      }

      const { data, headers: downloadHeaders } = await downloadByRange(
        url,
        localSize,
        totalSize - 1
      );

      const totalLength = downloadHeaders['content-length'];
      const fileName = path.basename(filePath);

      const progressBar = new ProgressBar(
        `-> downloading [:bar] :percent :rate/bps :etas`,
        {
          width: 40,
          complete: '=',
          incomplete: ' ',
          renderThrottle: 1,
          total: parseInt(totalLength, 10),
        }
      );

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
        progressBar.tick(chunk.length);
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
