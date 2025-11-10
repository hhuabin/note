# webpack.config.js

1. `@`设置为根路径 `src` 别名

   ```js
   alias: {
   	'@': path.resolve(__dirname, "..", 'src'), // 设置根目录路径
   },
   ```

2. 引入less，在rules下添加`less-loader`

   ```shell
   yarn add less-loader --dev
   yarn add css-loader style-loader --dev
   ```

   ```js
   module: {
       rules: [
           {
               oneOf: [
                   {
                       test: /\.less$/,
                       exclude: /\.module\.less$/,
                       use: getStyleLoaders({
                           importLoaders: 2,
                       }).concat({
                           loader: 'less-loader',
                       }),
                   },
                   {
                       test: /\.module\.less$/,
                       use: getStyleLoaders({
                           importLoaders: 2,
                           modules: {
                               getLocalIdent: getCSSModuleLocalIdent,
                           },
                       }).concat({
                           loader: 'less-loader',
                       }),
                   },
               ]
           }
       ]
   }
   ```

3. 源映射

   React 源映射是指 React 库的源代码与压缩后的代码之间的映射关系。React 使用源映射来帮助开发者在调试时定位到源代码中的错误或警告，而不是压缩后的代码

   **源映射占用大量资源，生产环境不建议使用**

   ```javascript
   const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
   
   // shouldUseSourceMap=true     使用map
   // shouldUseSourceMap=false    不使用map
   ```

   改成

   ```javascript
   const shouldUseSourceMap = process.env.NODE_ENV !== 'production';
   ```

   