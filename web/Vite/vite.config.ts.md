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

   下载`https://res.wx.qq.com/open/js/jweixin-1.6.0.js`到`assets`下：`/assets/js/`中

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
           'jweixin': new URL('./src/assets/js/jweixin-1.6.0.js', import.meta.url).pathname,
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

3. `/public`下的文件不能使用`import`导入

   ❗ **Vite 不允许用 `import` 引入放在 `public/` 目录下的 JS 文件**

   可以在`index.html`中以`script`的方式导入。

   ```html
   <script type="module" src="/static/js/jweixin-1.6.0.js"></script>
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



