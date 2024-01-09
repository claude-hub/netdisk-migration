import axios from 'axios';
import qs from 'query-string';

/**
 * 打开窗口。默认垂直居中
 * @param {*} url 打开地址
 * @param {*} left 窗口左边距
 * @param {*} top 窗口右边距
 */
const openWindow = (url, width = 800, height = 600) => {
  const top = (window.screen.height - 30 - height) / 2; //获得窗口的垂直位置;
  const left = (window.screen.width - 10 - width) / 2; //获得窗口的水平位置;
  const windowFeatures = `left=${left},top=${top},width=${width},height=${height}`;

  return window.open(url, '_blank', windowFeatures);
};

/**
 * 百度网盘登录，授权码模式
 * @returns
 */
export const baiduDiskLogin = () => {
  // doc: https://pan.baidu.com/union/doc/al0rwqzzl
  const params = {
    response_type: 'code',
    client_id: 'ncYkdVSxHyXRRwuZDnNlVPuD3CVxybNV',
    redirect_uri: 'https://pan.claude-hub.cn/api/auth/baidu',
    // redirect_uri: 'oob',
    scope: 'basic,netdisk', // 用户实际授予的权限列表
    confirm_login: 1, // 百度用户已处于登陆状态，会提示是否使用已当前登陆用户对应用授权。
    qrcode: 1, // 登录授权页面将增加扫码登录入口
  };

  const query = qs.stringify(params);

  return openWindow(`http://openapi.baidu.com/oauth/2.0/authorize?${query}`);
};

// 退出登录
export const baiduLogout = async () => {
  await axios.post('/api/baidu/logout');
}

/**
 * 获取百度用户信息
 * @param {*} token
 * @returns
 */
export const baiduUserinfo = async () => {
  const res = await axios.get('/api/baidu/user');
  return res.data;
};
