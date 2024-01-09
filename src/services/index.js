/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-09 11:18:08
 * @LastEditTime: 2024-01-09 12:15:58
 */
const axios = require('axios');

const API_PREFIX = 'https://pan.baidu.com/rest/2.0/xpan';


// {
//   "expires_in": 2592000,
//   "refresh_token": "122.27d1b73f6bd8b3c3ebe5d281b7823007.Y7rMbWCU70EmA3ZS0Ob1wTLrxEAxgbkUz5KQQiY.Q86YnA",
//   "access_token": "121.05968d3c0441597f7b2da148b8823194.YHfIGdNGuV0SPTzJEMwBlZzQLiFmJTFD2_9oB4w.gYx6lA",
//   "session_secret": "",
//   "session_key": "",
//   "scope": "basic netdisk"
// }
const getBaiduUserinfo = async (token) => {
  const res = await axios.get(
    `${API_PREFIX}/nas?access_token=${token}&method=uinfo`
  );
  console.log(res);
}