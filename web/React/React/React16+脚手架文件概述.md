安装create-react-app

```bash
npm install -g create-react-app
```

创建 ts 项目

```shell
create-react-app react --template typescript
```

创建 js 项目

```shell
create-react-app react-learn
```



主目录文件：

- **.env.development**              开发环境加载的环境变量配置
- **.env.production **                 生产环境加载的环境变量配置
- craco.config.js                       craco 配置文件
- config-overrides.js                rewired 配置文件



public 下的文件：

- manifest.json         应用加壳配置文件
- robots.txt                爬虫协议文件

src 下的文件：

- App.test.tsx                         用于给App测试
- react-app-env.d.ts              类型文件，在编译时会引入额外文件
- reportWebVitals.ts             页面性能分析文件
- setupTests.ts                       组件单元测试文件



# 样式模块化

```javascript
// 样式文件命名 index.module.css
import hello from './index.module.css'

render() {
    return <h2 className={hello.title}>Hello,React!</h2>
}
```

