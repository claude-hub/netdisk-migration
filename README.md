# 网盘同步

## 环境

> node >=18

> 1. 安装依赖 yarn

> 2. 同步文件 yarn cli

## 使用方式

把获取到的数据填写到 `.env` 文件内

1. 获取百度 access_token

官网文档：https://pan.baidu.com/union/doc/Yl0s0499d

第三方用户授权，除了扫码获取授权码再获取access_token的方法外，是否有其他授权渠道？

您好， 接入流程里的授权链接默认就是用百度帐号密码登录的，示例链接： http://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=fSds3K4w43rw37tOqlQmTa2kDwaczK4U&redirect_uri=oob&scope=basic,netdisk&display=popup&state=xxx

直接访问上面 URL，登录后，从回调页面的 URL 上面获取 access_token。

2. 获取阿里云盘登录授权后的授权码

直接访问地址登录：https://openapi.alipan.com/oauth/authorize?client_id=36f4121ff0ed4d64b315b7a911f9335d&redirect_uri=oob&scope=user:base,file:all:read,file:all:write

获取到返回的授权码。填入 `.env` 文件内的 `ali_code`

3. 使用授权码登录阿里云盘。获取到 `refresh_token`

完成第二步后，运行 `yarn cli`。控制台会输出 `refresh_token`。把这个值复制到 `.env` 文件内即可