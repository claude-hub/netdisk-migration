const schedule = require("node-schedule");
const { logger } = require("./utils/index");

// const rule = new schedule.RecurrenceRule();
// 每隔5秒执行一下
// rule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

// const job = schedule.scheduleJob(rule, function () {
//   logger.info("The answer to life, the universe, and everything!");
// });

const patternBaiduShareLink = (url) => {
  const url_pattern =
    "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*(),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+";
  const code_pattern = "(?<=提取码：)[0-9a-z]{4}";
  const urlReg = new RegExp(url_pattern);
  const codeReg = new RegExp(code_pattern);
  return {
    url: url.match(urlReg)[0],
    code: url.match(codeReg)[0],
  }
};

const url =
    "复制这段内容后打开百度网盘App，操作更方便哦。 链接：https://pan.baidu.com/s/1XJfrp4qJn6osWr_RiWFWRg 提取码：4ez8";


const a = patternBaiduShareLink(url);
logger.info(a)
