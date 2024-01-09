/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-08 17:01:28
 * @LastEditTime: 2024-01-08 20:11:52
 */

import { Button } from 'antd';
import { useEffect } from 'react';
import { baiduDiskLogin } from '../../services';

const Home = () => {
  const listenMessage = (e) => {
    const { data } = e;
    if (data) {
      console.log(e, data);
    } else {
      console.log(e);
    }
  };

  useEffect(() => {
    // 监听postMessage事件
    window.addEventListener("message", listenMessage)
    return () => {
      window.removeEventListener("message", listenMessage);
    }
  }, [])

  const handleLogin = () => {
    baiduDiskLogin();
  }

  return (
    <Button onClick={handleLogin} type='link'>登录</Button>
  )
}

export default Home;
