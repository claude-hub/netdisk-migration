/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 文件操作
 * @Date: 2024-01-18 14:29:26
 * @LastEditTime: 2024-01-18 14:37:19
 */
const fse = require('fs-extra');

// 获取文件夹下所有文件
const getFolderFilesByList = (path) => {
  const filesList = [];
  readFile(path, filesList);
  return filesList;
};

// 遍历读取文件
const readFile = (path, filesList) => {
  const files = fse.readdirSync(path); // 需要用到同步读取

  const walk = (file) => {
    const states = fse.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList);
    } else {
      // 创建一个对象保存信息
      const obj = {};
      obj.size = states.size; // 文件大小，以字节为单位
      obj.name = file; // 文件名
      obj.path = path + '/' + file; // 文件绝对路径
      filesList.push(obj);
    }
  };

  files.forEach(walk);
};

/**
 * 获取下的文件所有文件，tree结构
 * @param {*} path
 * @returns
 */
const getFolderFilesByTree = (path) => {
  const items = fse.readdirSync(path);
  const result = [];
  items.forEach((item) => {
    const itemPath = `${path}/${item}`;
    const stat = fse.statSync(itemPath);
    if (stat.isDirectory()) {
      let data = {
        // 文件夹
        type: 'folder',
        name: item,
      };
      let children = getFolderFilesByTree(itemPath);
      if (children && children.length) {
        data.children = children;
      }
      result.push(data);
    } else {
      // 文件
      result.push({
        type: 'file',
        name: item,
      });
    }
  });
  return result;
};

module.exports = {
  getFolderFilesByList,
  getFolderFilesByTree,
};
