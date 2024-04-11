/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 17:35:27
 * @LastEditTime: 2024-04-11 20:05:09
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
  getAliTokenByRefreshToken,
  isAliPathExist,
  getAliDdrive,
  aliUploadComplete,
  aliCreateFile
} = require('@claude-hub/netdisk-core');
const fse = require('fs-extra');

require('dotenv').config();

const {
  baidu_access_token: token,
  downlaod_folder,
  ali_access_token: aliToken,
  ali_refresh_token: aliRefreshToken
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

const deleteFile = (filePath) => {
  try {
    fse.unlinkSync(filePath);
  } catch (e) { }
}

const deleteDir = (folderPath) => {
  try {
    fse.rmdirSync(folderPath);
  } catch (e) { }
}

// 使用 阿里云盘 open api 上传
const openApi = async (folderPath) => {
  try {
    // 1. 登录阿里云盘
    const { token_type, access_token } = await getAliTokenByRefreshToken(aliRefreshToken);
    const aliToken = `${token_type} ${access_token}`;
    // 2. 获取默认的备份盘id
    const { default_drive_id: drive_id } = await getAliDdrive(aliToken);

    const downloadBaiduFile = async (dir) => {
      // 获取百度网盘 指定文件夹下的文件及文件夹
      const data = await getBaiduFiles(token, dir);

      const { list = [] } = data;

      // 根据路径查找阿里云盘的文件，如果不存在则创建
      const folderId = await isAliPathExist(aliToken, drive_id, dir);

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
          const fileId = await isAliPathExist(aliToken, drive_id, filePath, false);
          if (fileId) {
            console.log(`文件已同步: ${filePath}`)
            deleteFile(realPath);
            continue;
          }
          console.log(`正在下载的文件：${filePath}`);
          // 如果是文件，则下载
          const res = await baiduFileDlink(token, [fs_id]);
          const dlink = res[0]?.dlink || '';
          await downloader(`${dlink}&access_token=${token}`, realPath);

          // 上传阿里云盘
          const fileInfo = await getFileInfo(realPath);
          const data = await aliCreateFile(aliToken, fileInfo, drive_id, folderId);
          const { part_info_list, upload_id, file_id, exist, rapid_upload } = data;

          if (!exist) {
            const uploadUrl = part_info_list?.[0]?.['upload_url'];
            // 4：上传
            const status = await aliWebUpload(realPath, uploadUrl);
            // 成功了，或者秒传了，都可以掉完成接口。如果是秒传，也可以不用掉完成接口
            if (status || rapid_upload) {
              // 4：上传完成
              await aliUploadComplete(aliToken, drive_id, file_id, upload_id);
              console.log('上传阿里云完成')
              // 删除文件
              deleteFile(realPath);
            }
          }
        }
      }
      // 删除文件夹
      deleteDir(path.join(downlaod_folder, dir));
    }

    await downloadBaiduFile(folderPath);
  } catch (e) {
    console.log(e.response?.data)
  }

}


openApi('/分享书籍')
