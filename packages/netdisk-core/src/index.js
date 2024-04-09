/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-04-09 15:42:59
 * @LastEditTime: 2024-04-09 17:24:03
 */
const { getBaiduUserinfo, getBaiduFiles, getBaiduAllList } = require('./baidu');

require('dotenv').config();

const { baidu_access_token: access_token } = process.env;
console.log(process.env.baidu_access_token)

const main = async () => {
  // const data = await getBaiduUserinfo(access_token);
  // const data = await getBaiduFiles(access_token);
  const data = await getBaiduAllList(access_token, '/测试')
  console.log(data);
}

main()