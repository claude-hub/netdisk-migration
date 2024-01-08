/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-08 17:01:28
 * @LastEditTime: 2024-01-08 20:02:52
 */

import { Button } from 'antd';
import qs from 'query-string';
import { useEffect } from 'react';

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
}

const Home = () => {

  useEffect(() => {
    const listenMessage = (e) => {
      const { data } = e;
      if (data) {
        console.log(e, data);
      } else {
        console.log(e);
      }
    };
    // 监听postMessage事件
    window.addEventListener("message", listenMessage)
    return () => {
      window.removeEventListener("message", listenMessage);
    }, []
  })

  const handleLogin = () => {
    // doc: https://pan.baidu.com/union/doc/al0rwqzzl
    const params = {
      response_type: 'code',
      client_id: 'ncYkdVSxHyXRRwuZDnNlVPuD3CVxybNV',
      redirect_uri: 'http://pan.claude-hub.cn/redirect.html',
      scope: 'basic,netdisk', // 用户实际授予的权限列表
      confirm_login: 1, // 百度用户已处于登陆状态，会提示是否使用已当前登陆用户对应用授权。
      qrcode: 1 // 登录授权页面将增加扫码登录入口
    };
    const query = qs.stringify(params);

    openWindow(`http://openapi.baidu.com/oauth/2.0/authorize?${query}`);
  }

  return (
    <Button onClick={handleLogin} type='link'>登录</Button>
  )
}

export default Home;
