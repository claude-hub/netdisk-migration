/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 17:35:27
 * @LastEditTime: 2024-04-11 20:29:09
 */

const path = require('path');
const {
  mkdirsSync,
  baiduFileDlink,
  downloader,
  getFileInfo,
  aliWebCreateFolderPath,
  aliWebCreateFile,
  aliWebUpload,
  aliWebUploadComplete,
  getBaiduFiles,
  aliWebDefaultDrive,
} = require('@claude-hub/netdisk-core');

require('dotenv').config();

const {
  baidu_access_token: token,
  downlaod_folder,
  ali_access_token: aliToken
} = process.env;


// 使用阿里云web api上传。上传文件时会报错 InvalidParameter.ContentHash
const webApi = async (folderPath) => {
  try {
    // 1. 获取默认的备份盘id
    const { drive_id } = await aliWebDefaultDrive(aliToken);

    const downloadBaiduFile = async (dir) => {
      // 获取百度网盘 指定文件夹下的文件及文件夹
      const data = await getBaiduFiles(token, dir);

      const { list = [] } = data;

      // 创建阿里云盘的文件夹。如果已创建，则会返回文件夹id
      const folderId = await aliWebCreateFolderPath(aliToken, dir, drive_id);

      for (let index = 0; index < list.length; index++) {
        const fileinfo = list[index];

        const { path: filePath, isdir, fs_id } = fileinfo;
        const realPath = path.join(downlaod_folder, filePath);

        // 如果是文件夹，则创建
        if (isdir === 1) {
          // 创建本地文件夹
          mkdirsSync(realPath);
          // 递归子文件夹
          await downloadBaiduFile(filePath);
        } else {
          console.log(`下载的文件：${filePath}`);
          // 如果是文件，则下载
          const res = await baiduFileDlink(token, [fs_id]);
          const dlink = res[0]?.dlink || '';
          await downloader(`${dlink}&access_token=${token}`, realPath);

          // 上传阿里云盘
          const fileInfo = await getFileInfo(realPath);
          const data = await aliWebCreateFile(aliToken, fileInfo, drive_id, folderId);
          const { part_info_list, upload_id, file_id, exist } = data;

          if (!exist) {
            const uploadUrl = part_info_list?.[0]?.['upload_url'];
            // 4：上传
            const status = await aliWebUpload(realPath, uploadUrl);
            if (status) {
              // 使用 web api 会报错 InvalidParameter.ContentHash。
              // 4：上传完成
              await aliWebUploadComplete(aliToken, drive_id, file_id, upload_id);
            }
          }
        }
      }
    }

    await downloadBaiduFile(folderPath);
  } catch (e) {
    console.log(e.response?.data)
  }

}