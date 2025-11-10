# 安装

## webpack安装

全局安装 Vue CLI

```bash
npm install -g @vue/cli
```

查看@vue/cli版本

```bash
vue --version
```

创建 vue 项目

```bash
vue create my-project
```



## vite安装

```bash
npm create vue@latest
```

```bash
npm install
```



# 配置代理

**vue.config.js**

```javascript
const { defineConfig } = require('@vue/cli-service')
const BASE_URL = 'http://localhost:5000'              //本地服务器

module.exports = defineConfig({
	devServer: {
		proxy: {
			'/api': {
				target: BASE_URL,      //你要访问的服务器域名
				changeOrigin: true,    //允许跨域
				pathRewrite: {
					'^/api': ''
				}
			},
            '/another-api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                  '^/another-api': ''
                }
            }
		}
	},
})
```

