[craco官网](https://craco.js.org/docs/getting-started/ "craco")

```shell
yarn add @craco/craco --dev
```

```shell
npm install @craco/craco --save-dev
```



# webpack

## alias

- 配置 `@` 指向 `src` 目录

1. craco.config.ts

   ```typescript
   const path = require('path');
   
   module.exports = {
   	webpack: {
   		alias: {
   			'@': path.resolve(__dirname, 'src'), // 将 @ 符号指向 src 目录
               'jweixin': resolve(__dirname, 'src/static/jweixin-1.6.0.js'),
   		},
   	},
   };
   ```

2. tsconfig.json

   ```typescript
   {
       "compilerOptions": {
           "baseUrl": "./",
           "paths": {
   			"@/*": ["src/*"]
           }
       }
   }
   ```




## publicPath

`publicPath` 是一个在前端构建工具（比如Webpack、Vue CLI、React Scripts等）中常见的配置选项，用于指定构建后静态资源文件在**服务器或 CDN 上的路径前缀**。

这个选项的作用是告诉构建工具生成的文件应该在服务器上的哪个路径下找到。如果 `publicPath` 被设置为 `'/'`，那么生成的文件将被部署到服务器的根目录下。如果设置为**相对路径**（比如 `'./'`），生成的文件会相对于部署在服务器上的当前目录进行引用。

在 Vue CLI 项目中，可以通过 `vue.config.js` 文件配置 `publicPath`

```javascript
// vue.config.js

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	publicPath: './',
})

```

在 React 项目中，如果你想设置类似的路径引用，可以使用 `react-scripts` 中提供的 `package.json` 中的 `homepage` 属性来定义项目的基本 URL 路径

```json
// package.json

{
  "name": "your-app",
  "version": "0.1.0",
  "homepage": "./",
}
```

