const qs = require('qs');
const schedule = require('node-schedule');
const { logger, getEnv } = require('../utils');
const { default: axios } = require('axios');

const baiduYunDownload = async () => {
  // const rule = new schedule.RecurrenceRule();
  // 每隔5秒执行一下
  // rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  // const job = schedule.scheduleJob(rule, function () {
  //   logger.info("The answer to life, the universe, and everything!");
  // });
  // const url =
  // "链接: https://pan.baidu.com/s/1AloyVf_izxHi9Zo8XuMU3Q  密码: i6ob--来自百度网盘超级会员V5的分享";
  const url =
    '链接: https://pan.baidu.com/s/1e3v5J6RqBzcpKx2k8op7SA  密码: 9kpw--来自百度网盘超级会员V5的分享';

  const headers = { Referer: 'pan.baidu.com' };

  const patternBaiduShareLink = (url) => {
    const url_pattern =
      'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+';
    const urlReg = new RegExp(url_pattern);
    return {
      url: url.match(urlReg)?.[0],
      password:
        url.match(new RegExp('(?<=提取码: )[0-9a-z]{4}'))?.[0] ||
        url.match(new RegExp('(?<=提取码：)[0-9a-z]{4}'))?.[0] ||
        url.match(new RegExp('(?<=密码: )[0-9a-z]{4}'))?.[0] ||
        url.match(new RegExp('(?<=密码：)[0-9a-z]{4}'))?.[0] ||
        '',
    };
  };

  const getSurl = async (url) => {
    const { data } = await axios.get(shareInfo.url, { headers });
    if (data.includes('百度网盘 请输入提取码')) {
      if (url.includes('surl')) {
        const [, search] = url.split('?');
        const { surl } = qs.parse(search);
        return surl;
      } else {
        const lastIndex = url.lastIndexOf('/');
        if (lastIndex > -1) {
          const surl = url.substring(lastIndex + 2);
          return surl;
        }
      }
    } else {
      logger.error('链接已失效或访问的资源不存在，请输入正确的链接!');
    }
  };

  const getSekey = async (surl) => {
    const url = 'https://pan.baidu.com/rest/2.0/xpan/share?method=verify';
    const params = { surl };
    const { data } = await axios({
      url,
      params,
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `pwd=${shareInfo.password}`,
    });
    const { errno, randsk } = data;
    if (errno === 0 && randsk) {
      // 需要decode url一下，不然%25会再次编码成%2525
      return decodeURIComponent(randsk);
    }
    const errMap = {
      105: '链接地址错误',
      '-12': '非会员用户达到转存文件数目上限',
      '-9': 'pwd错误',
      2: '参数错误,或者判断是否有referer',
    };
    logger.error(`getSeKey: ${errMap[errno]}`);
  };

  const getTransferInfo = async (surl, sekey) => {
    const params = {
      shorturl: surl,
      page: '1',
      num: '100',
      root: '1',
      fid: '0',
      sekey: sekey,
    };
    const { data } = await axios({
      method: 'GET',
      url: 'https://pan.baidu.com/rest/2.0/xpan/share?method=list',
      params,
      headers,
    });
    const { errno, list, share_id, uk } = data;
    if (errno === 0) {
      return {
        fsidlist: list.map((item) => item.fs_id),
        shareid: share_id,
        from: uk,
      };
    } else {
      const errorMap = {
        110: '有其他转存任务在进行',
        105: '非会员用户达到转存文件数目上限',
        '-7': '达到高级会员转存上限',
      };
      logger.error(errorMap[errno]);
    }
  };

  const transfer = async (info) => {
    const { access_token, shareid, from, sekey, path, ondup } = info;
    const params = {
      access_token,
      shareid,
      from,
    };
    const requestData = {
      sekey,
      path,
      ondup,
    };
    const { data } = await axios({
      method: 'POST',
      url: 'https://pan.baidu.com/rest/2.0/xpan/share?method=transfer',
      params,
      data: qs.stringify(requestData) + `&fsidlist=[${info.fsidlist}]`, // 必须拼接fsidlist才行，直接stringify转义后的数据有问题
      headers: {
        ...headers,
        'User-Agent': 'pan.baidu.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: '*/*',
      },
    });
    const { errno } = data;
    if (errno === 0) {
      logger.info('转存成功！');
    } else {
      const errorMap = {
        2: '转存路径不存在',
        111: '有其他转存任务在进行',
        120: '非会员用户达到转存文件数目上限',
        130: '达到高级会员转存上限',
        '-33': '达到转存文件数目上限',
        12: '批量操作失败, 请检查是否第二次转换同一个文件，或者自己转存自己分享的文件',
        '-3': '转存文件不存在',
        '-9': '密码错误',
        5: '分享文件夹等禁止文件',
      };
      logger.info('===========================');
      logger.error(errorMap[errno]);
      logger.info(data);
      logger.info('===========================');
    }
  };

  // 1. 解析出链接和提取码
  const shareInfo = patternBaiduShareLink(url);
  if (!shareInfo.url) return;
  logger.info(shareInfo)
  // 2. 链接转换为surl
  const surl = await getSurl(shareInfo.url);
  if (!surl) return;
  // 3. 通过surl，获取sekey
  const sekey = await getSekey(surl);
  if (!sekey) return;
  // 4. 获取转存文件信息
  const transferInfo = await getTransferInfo(surl, sekey);
  if (!transferInfo) return;

  const env = getEnv();
  // 5. 转存
  await transfer({
    ...transferInfo,
    sekey,
    path: '/转存测试',
    async: 1,
    ondup: 'newcopy',
    access_token: env?.baidu_access_token,
  });
};

module.exports = baiduYunDownload;
