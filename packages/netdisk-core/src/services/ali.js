/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-01-19 15:09:34
 * @LastEditTime: 2024-04-09 14:44:38
 */
const axios = require('axios');
const qs = require('node:querystring');


const API_PREFIX = 'https://openapi.alipan.com';

const getAliUserinfo = async (access_token) => {

  // console.log('====', `${API_PREFIX}/oauth/users/info`, access_token)
  // const res = await axios.get(`${API_PREFIX}/oauth/users/info`, {
  //   headers: {
  //     Authorization: 'Bearer '
  //   }
  // });
  try {
    const res = await axios({
      url: `${API_PREFIX}/oauth/users/info`,
      method: 'GET',
      headers: {
        Authorization: 'Bearer '
      }
    });
    console.log(res)
  }catch(e) {
    console.log(e)
  }
 

  // console.log(data)

}

module.exports = {
  getAliUserinfo
}
