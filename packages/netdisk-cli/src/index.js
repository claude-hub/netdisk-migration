/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 17:35:27
 * @LastEditTime: 2024-04-12 15:55:14
 */

const path = require('path');
const findWorkspaceRoot = require('find-yarn-workspace-root');
const {
  mkdirsSync,
  baiduFileDlink,
  downloader,
  getFileInfo,
  aliWebUpload,
  getBaiduFiles,
  getAliTokenByRefreshToken,
  isAliPathExist,
  getAliDdrive,
  aliUploadComplete,
  aliCreateFile,
  getAliToken
} = require('@claude-hub/netdisk-core');
const fse = require('fs-extra');
const { logger } = require('./utils');

require('dotenv').config();

const {
  baidu_access_token: token,
  download_folder,
  baidu_path,
  ali_path,
  ali_code,
  ali_refresh_token: aliRefreshToken
} = process.env;

// 下载的文件夹，如果没有配置，则为根目录的 download
const downloadFolder = download_folder || path.join(findWorkspaceRoot(process.cwd()), 'download');

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

    // 如果没有填写refresh token，则使用 code 登录
    if (!aliRefreshToken) {
      const data = await getAliToken(ali_code);
      logger.info(`ali_refresh_token: ${data.refresh_token}`);
      return;
    }

    // 1. 登录阿里云盘
    const { token_type, access_token } = await getAliTokenByRefreshToken(aliRefreshToken);
    const aliToken = `${token_type} ${access_token}`;
    // 2. 获取默认的备份盘id
    const { default_drive_id: drive_id } = await getAliDdrive(aliToken);

    const downloadBaiduFile = async (dir) => {
      // 获取百度网盘 指定文件夹下的文件及文件夹
      const data = await getBaiduFiles(token, dir);

      const { list = [] } = data;

      // 上传到阿里网盘对应的文件夹。只把百度网盘路径下的文件，下载到阿里云盘路径下。 
      const aliFolder = dir.replace(baidu_path , ali_path);

      // 根据路径查找阿里云盘的文件，如果不存在则创建
      const folderId = await isAliPathExist(aliToken, drive_id, aliFolder);

      for (let index = 0; index < list.length; index++) {
        const fileinfo = list[index];

        const { path: filePath, isdir, fs_id } = fileinfo;
        const realPath = path.join(downloadFolder, filePath);

        // 如果是文件夹，则创建
        if (isdir === 1) {
          // 创建本地文件夹
          mkdirsSync(realPath);
          // 递归子文件夹
          await downloadBaiduFile(filePath);
        } else {
          // 阿里网盘对应的文件路径。
          const aliFilePath = filePath.replace(baidu_path, ali_path);
          const fileId = await isAliPathExist(aliToken, drive_id, path.normalize(aliFilePath), false);
          if (fileId) {
            // logger.info(`文件已存在: ${filePath}`);
            deleteFile(realPath);
            continue;
          }
          // logger.info(`正在下载的文件：${filePath}`);
          // 如果是文件，则下载
          const res = await baiduFileDlink(token, [fs_id]);
          const dlink = res[0]?.dlink || '';
          await downloader(`${dlink}&access_token=${token}`, realPath);

          // 上传阿里云盘
          const fileInfo = await getFileInfo(realPath);
          const data = await aliCreateFile(aliToken, fileInfo, drive_id, folderId);
          const { part_info_list, upload_id, file_id, exist, rapid_upload } = data;

          // 文件不存在，并且不是秒传了
          if (!exist && !rapid_upload) {
            const uploadUrl = part_info_list?.[0]?.['upload_url'];

            // 如果超过了一个上传地址则说明需要分片上传，待实现
            if (part_info_list.length > 1) {
              logger.info(`文件删除失败，需要分片上传：${filePath}`);
              continue;
            }
            // 4：上传
            const status = await aliWebUpload(realPath, uploadUrl, aliToken);
            // 成功了，或者秒传了，都可以掉完成接口。如果是秒传，也可以不用掉完成接口
            if (status || rapid_upload) {
              // 4：上传完成
              await aliUploadComplete(aliToken, drive_id, file_id, upload_id);
              // logger.info(`上传阿里云完成: ${filePath}`)
              // 删除文件
              deleteFile(realPath);
            }
          }
        }
      }
      // 删除文件夹
      deleteDir(path.join(downloadFolder, dir));
    }

    await downloadBaiduFile(folderPath);
  } catch (e) {
    logger.error(e.response?.data || e)
  }

}

(async () => {
  logger.info(`正在同步文件夹 ${baidu_path}`);
  await openApi(baidu_path);
  logger.info(`文件夹同步完成 ${baidu_path}`);
})()