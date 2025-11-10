# 搭建项目

1. npm

   ```bash
   npm create vite@latest
   ```

2. yarn

   ```bash
   yarn create vite
   ```
   
   ```typescript
   TypeScript + SWC
   ```
   
   `SWC` 是一个用 `Rust` 编写的高性能 JavaScript 和 TypeScript 编译器，比 Babel 更快




# eslint

可在`.eslintrc.cjs`文件中配置



# 相对路径打包

在`vite.config.ts`中修改`base`为`./`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => ({
    base: './',
    plugins: [
        react(),
    ],
}))
```





# 使用node

vite不推荐使用require等es5写法

1. 下载`commonjs`依赖包

   ```bash
   yarn add vite-plugin-commonjs --dev
   ```

2. 下载`@types/node`依赖包

   ```bash
   yarn add @types/node --dev
   ```

3. 修改`vite.config.ts`

   ```ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react-swc'
   import commonjs from 'vite-plugin-commonjs';
   
   // https://vitejs.dev/config/
   export default defineConfig({
       base: './',
       plugins: [
           react(),
           commonjs(), // 添加 CommonJS 插件
       ],
   })
   ```
   



