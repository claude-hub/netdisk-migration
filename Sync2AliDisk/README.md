## 功能简介

* 基于阿里云盘实现
* 实现`秒传`
* 支持本地更新文件同步到网盘
* 支持 refresh_token 登录

### 使用

* 设置配置中的 `ALI_FOLDER_NAME` 和 `LOCAL_FOLDER_NAME` 和 `REFRESH_TOKEN`
```shell
ALI_FOLDER_NAME = "sync_folder"
LOCAL_FOLDER_NAME = "C:\\同步盘"
REFRESH_TOKEN = ""
```
* 同步环境
```shell
pip install -r requirement.txt
```
* 运行项目
```shell
python run.py
```
## 免责声明

1. 本软件为免费开源项目，无任何形式的盈利行为。
2. 本软件服务于阿里云盘，旨在让阿里云盘功能更强大。如有侵权，请与我联系，会及时处理。
3. 本软件皆调用官方接口实现，无任何“Hack”行为，无破坏官方接口行为。
5. 本软件仅做流量转发，不拦截、存储、篡改任何用户数据。
6. 严禁使用本软件进行盈利、损坏官方、散落任何违法信息等行为。
7. 本软件不作任何稳定性的承诺，如因使用本软件导致的文件丢失、文件破坏等意外情况，均与本软件无关。

## 鸣谢

[sync-alidisk](https://gitee.com/yxhpy/sync-alidisk)