/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 17:35:27
 * @LastEditTime: 2024-04-10 18:44:27
 */

const path = require('path');
const { getBaiduAllList, getBaiduUserinfo, downloadByFileinfo, mkdirsSync, baiduFileDlink, downloader, getAliUserinfo, aliWebUserinfo, aliWebSearchByPath, aliWebCreateFolder } = require('@claude-hub/netdisk-core');

require('dotenv').config();

const { baidu_access_token: token, downlaod_folder, ali_access_token: aliToken } = process.env;

// 默认下载到项目根目录的 download 文件夹
const defaultFolder = path.resolve(process.cwd(), '../../download');

// const main = async () => {
//   // const data = await getBaiduUserinfo(token);
//   // const data = await getBaiduFiles(token);
//   const data = await getBaiduAllList(token, '/测试')

//   const { list = [] } = data;

//   for (let index = 0; index < list.length; index++) {
//     const fileinfo = list[index];

//     const { path: filePath, isdir, fs_id } = fileinfo;
//     const realPath = path.join(downlaod_folder || defaultFolder, filePath);

//     if (isdir === 1) {
//       mkdirsSync(realPath);
//     } else {
//       const res = await baiduFileDlink(token, [fs_id]);
//       const dlink = res[0]?.dlink || '';
//       try {
//         await downloader(`${dlink}&access_token=${token}`, realPath);
//       } catch (e) {
//         console.log(e)
//       }
//     }
//   }
// }


const main = async () => {
  const userinfo = await aliWebUserinfo(aliToken);

  const { file_id: defaultFolderId } = await aliWebCreateFolder(aliToken, {
    name: '测试1',
    drive_id: userinfo.default_drive_id
  });

  // 当前用户上传的文件夹
  const { file_id: currentFileId } = await aliWebCreateFolder(aliToken, {
    name: '同步',
    drive_id: userinfo.default_drive_id,
    parent_file_id: defaultFolderId
  });

  console.log(currentFileId)
}

main()
