/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-08 17:01:28
 * @LastEditTime: 2024-01-09 16:12:19
 */

import { Button } from 'antd';
import { useEffect } from 'react';
import { baiduDiskLogin, baiduUserinfo, baiduLogout } from '@/services';
import { LOCAL_STORAGE_KEYS, getCookies } from '@/utils';
import { useReactive } from 'ahooks';
import './index.less';

const Home = () => {
  const store = useReactive({
    avatar_url: '',
    baidu_name: '',
  });

  const { avatar_url: avatar, baidu_name: name } = store;

  const init = async () => {
    const token = getCookies(LOCAL_STORAGE_KEYS.baiduToken);
    if (token) {
      const userinfo = await baiduUserinfo();
      store.avatar_url = userinfo.avatar_url;
      store.baidu_name = userinfo.baidu_name;
    }
  }

  useEffect(() => {
    init();
  }, []);

  const logout = async () => {
    await baiduLogout();
    store.baidu_name = '';
  }


  if (name) {
    return (
      <div className='header'>
        <div className='userinfo'>
          <img className='avatar' src={avatar} alt="img" />
          {name}
        </div>
        <Button onClick={logout} type='link'>退出</Button>
      </div>
    )
  }

  return (
    <Button onClick={() => baiduDiskLogin()} type='link'>登录</Button>
  )
}

export default Home;
