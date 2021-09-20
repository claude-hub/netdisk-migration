const fes = require('fs-extra');
const uploadToAliYun  = require('./src/aliYunUpload');

// const { getEnv } = require('./utils');
// const baiduYunDownload = require('./src/baiduYunDownload');
// baiduYunDownload();

// for (let i = 1; i <= 10000; i++) {
//   const file = `./测试1万个文件/哈哈${i}.txt`;
//   fes.ensureFileSync(file);

//   fes.writeFileSync(file, 'hello world!');
// }


uploadToAliYun();