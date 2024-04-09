# 网盘同步

## 环境

> node >=18


## 百度 access_token 获取

官网文档：https://pan.baidu.com/union/doc/Yl0s0499d

第三方用户授权，除了扫码获取授权码再获取access_token的方法外，是否有其他授权渠道？

您好， 接入流程里的授权链接默认就是用百度帐号密码登录的，示例链接： http://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=fSds3K4w43rw37tOqlQmTa2kDwaczK4U&redirect_uri=oob&scope=basic,netdisk&display=popup&state=xxx

访问上面 URL 登录后，从回调页面的 URL 上面获取 access_token
