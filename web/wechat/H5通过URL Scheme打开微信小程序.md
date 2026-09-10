# `URL Scheme`

[`URL Scheme`](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/url-scheme.html "URL Scheme")

前端只要把地址改成如下，将会被浏览器自动识别，跳转到微信小程序

```typescript
window.location.href = "weixin://dl/business/?appid=*APPID*&path=*PATH*&query=*QUERY*&env_version=*ENV_VERSION*"
```

>`APPID`：小程序的 `APPID`
>
>`PATH`：小程序页面链接，如 `pages/index/index`（不是小程序首页需要在小程序开放 `URL Scheme` 跳转）
>
>`QUERY`：如：`a=1&b=2`
>
>`ENV_VERSION`：可选值
>
>- `release`：打开 正式版（默认值）
>- `trial`：打开 体验版
>- `develop`：打开 开发版

具体链接示例链接

```typescript
const query = "a=1&b=2"

const url = `weixin://dl/business/?appid=123456&path=pages/index/index&query=${encodeURIComponent(query)}&env_version=release`

window.location.href = url
```



## 加密 `URL Scheme`

通过[服务端接口](https://developers.weixin.qq.com/minigame/dev/api-backend/url-scheme/api_generatescheme)可以获取打开小程序任意页面的加密 `URL Scheme`，生成的 `URL Scheme` 如下所示：

```typescript
weixin://dl/business/?t= *TICKET*
```

```typescript
// 可以跳转
location.href = 'weixin://dl/business/?t= *TICKET*'
```

如果需要拼接自定义参数

```typescript
weixin://dl/business/?t= *TICKET*&cq=*CUSTOM PARAMETER*
```

`CUSTOM PARAMETE`是一种特殊的`query`，最大256个字符，只支持数字，大小写英文以及部分特殊字符，需要 `url_encode`

