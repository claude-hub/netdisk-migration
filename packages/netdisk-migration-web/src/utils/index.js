/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-09 14:12:57
 * @LastEditTime: 2024-01-09 14:13:29
 */
import Cookies from 'js-cookie';

export const LOCAL_STORAGE_KEYS = {
  baiduToken: 'baidu_token',
  aliToken: 'ali_token',
};

export const bytesToSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = (bytes / Math.pow(k, i)).toPrecision(3);
  return `${size} ${sizes[i]}`;
};

/**
 * 存储Cookies
 */
export const setCookies = (name, content) => {
  return Cookies.set(name, content);
};

/**
 * 存储Cookies
 */
export const setCookiesRemember = (name, content) => {
  return Cookies.set(name, content, { expires: 7 });
};

/**
 * 获取Cookies
 */
export const getCookies = (name) => {
  return Cookies.get(name);
};

/**
 * 删除Cookies
 */
export const removeCookies = (name) => {
  return Cookies.remove(name);
};
