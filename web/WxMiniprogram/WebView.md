# 内嵌 H5 的浏览器缓存问题

1. :star: 使用 `nginx` 配置浏览器缓存。（唯一正统解法，最保险）:point_right: [nginx配置浏览器缓存](../../Server/Nginx/缓存.md)

   在**不使用 `nginx`** 的情况下，其他一切办法都只是补救，**不可能做到 100% 可控更新**

2. ==**绕过缓存**==：动态 `URL` 。例如给 `URL` 加上版本号/时间戳；在没有 `nginx` 的情况下，搭配 3 使用

   如果使用 `hash` 路由，则需要在 `#` 前增加参数

   ```typescript
   let url = http://localhost:3000/?v=1.0.0
   ```

   ```typescript
   let url = http://localhost:3000/?v=1.0.0#/?aaa=111
   ```

   弊端：**必须携带一个识别参数**影响链接观感，一个版本号一个缓存；如果使用时间戳，则每次进入都会造成一个前端浏览器缓存（**无限制造缓存**）

3. `JS` **检查版本号**，然后使用 `window.location.reload()` 更新；

   该方法不一定有效，特别是 `ios` 端，`window.location.reload()`仍可能取强缓存的值。

   在没有 `nginx` 的情况下，适当搭配 2 使用 :point_right: [检查项目更新](../React/React实用hooks/检查项目更新hooks.md)

   ```typescript
   window.location.reload()   // -> F5
   
   // 绕过缓存
   const url = new URL(location.href)
   url.searchParams.set('v', version)
   location.replace(url.toString())
   ```



# 内嵌 H5 的滚动问题

问题：**在 `iOS` 的微信小程序 `WebView` 页面。上下滑动总是捕获页面，从而拖动整个页面，而不是滑动页面里的滚动块**

原因：

- 在 **`iOS` 微信小程序的 `<web-view>`** 中：**页面的整体滚动（小程序容器）优先级高于 `WebView` 内部的滚动**

也就是说：

- **`iOS WKWebView`，微信对 `WebView` 做了一层手势拦截，上下滑动手势会先被外层页面捕获**

  导致：拖动的是 **整个小程序页面**，而不是 `WebView` 里你写的 `overflow: auto` / `scroll`


 :point_right: 这不是 `CSS` 的问题，而是 **手势分发顺序的问题**

 :bulb: 为什么`Android`没有这个问题？

- `Android` 微信 `WebView（X5 / Chromium）`，**手势分发更接近浏览器原生，内部滚动容器优先级更高**

**只有 iOS + 微信 是最严格 / 最激进的拦截**



#####  :white_check_mark: 方案 1：禁止小程序页面滚动（最有效）

[微信小程序页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html "微信小程序页面配置")

```json
// 页面对应的 json
{
    "disableScroll": true
}
```

- 小程序页面不再滚动
- 所有上下滑动都交给 WebView
- 这是 **官方推荐 + 企业级项目常用方案**

> ⭐⭐⭐⭐⭐ **强烈推荐**



#####  方案 2：WebView 内开启 iOS 专用滚动优化

在 H5 中（WebView 内）：

```css
.scroll-container {
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
```

**作用：**

- 启用 iOS 的“惯性滚动”
- 提升滚动体验

 :warning: **注意**： 只能“改善”，**不能解决外层抢手势的问题**

