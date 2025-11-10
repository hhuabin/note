[webpack官网](https://webpack.docschina.org/ "webpack")



**webpack.config.js**

```javascript
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
        ]
    },
    plugins: [
        
    ],
    mode: 'development'
};
```

