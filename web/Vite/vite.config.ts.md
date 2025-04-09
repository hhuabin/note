# UserConfig

```typescript
import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'

export default defineConfig((env: ConfigEnv) => ({
    base: './',
}))
```



## resolve

### alias

1. `@`别名

   ```typescript
   resolve: {
       alias: { '@': new URL('./src', import.meta.url).pathname },
   },
   ```

2. 其他库别名，如`wx-js-sdk`

   下载`https://res.wx.qq.com/open/js/jweixin-1.6.0.js`到`public`下：`/public/static/js/`中

   `jweixin-1.6.0.js`源码末尾增加导出：

   ```typescript
   /* eslint-disable */
   // 把 this 改成 window
   export default window.wx || window.jWeixin;
   ```

   ```typescript
   resolve: {
       alias: {
           '@': new URL('./src', import.meta.url).pathname,
           // 导入public目录的静态js文件需要加上 ?url，用于明确表示你希望获取某个静态资源的 URL 路径 而不是资源内容本身
           'jweixin': '/static/js/jweixin-1.6.0.js?url',
       },
   },
   ```

   ```typescript
   // jweixin.d.ts
   /* eslint-disable @typescript-eslint/no-explicit-any */
   
   declare module 'jweixin' {
       const wx: any
       export default wx
   }
   ```

   `ES Module (ESM)`支持`export default`

   ```typescript
   import wx from 'jweixin'
   ```

   



## server

**`server`仅在开发环境有效**，所以尽情配置吧

```typescript
server: {
    port: 3000,
    open: true,
    headers: {
        'cache-control': 'no-cache, no-store, must-revalidate',   // 禁止缓存
        // 'cache-control': 'public, max-age=30, immutable',         // 缓存 3600s
        // 'last-modified': '',  // 禁止协商缓存
        // 'etag': '',           // 禁止协商缓存
    },
},
```



## build



### rollupOptions（[rollupOptions](./rollupOptions.md)）



#### external

用来指定哪些模块不应该被打包到最终的产物中，而是**保留为外部依赖**

```typescript
external: ['react', 'react-dom'],
```



