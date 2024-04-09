/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 17:35:27
 * @LastEditTime: 2024-04-09 18:39:39
 */

const path = require('path');
const { getBaiduAllList, getBaiduUserinfo, downloadByFileinfo, mkdirsSync, baiduFileDlink, downloader } = require('@claude-hub/netdisk-core');

require('dotenv').config();

const { baidu_access_token: token, downlaod_folder } = process.env;

// 默认下载到项目根目录的 download 文件夹
const defaultFolder = path.resolve(process.cwd(), '../../download');

const main = async () => {
  // const data = await getBaiduUserinfo(token);
  // const data = await getBaiduFiles(token);
  const data = await getBaiduAllList(token, '/测试')

  const { list = [] } = data;

  for (let index = 0; index < list.length; index++) {
    const fileinfo = list[index];

    const { path: filePath, isdir, fs_id } = fileinfo;
    const realPath = path.join(downlaod_folder || defaultFolder, filePath);

    if (isdir === 1) {
      mkdirsSync(realPath);
    } else {
      const res = await baiduFileDlink(token, [fs_id]);
      const dlink = res[0]?.dlink || '';
      try {
        await downloader(`${dlink}&access_token=${token}`, realPath);
      } catch (e) {
        console.log(e)
      }
    }
  }
}

main()
