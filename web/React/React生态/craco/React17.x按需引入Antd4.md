[antd ((PC端版本4.16.13）4官网](https://4x.ant.design/docs/react/introduce-cn/)

版本5自动支持按需引入

```javascript
npm install antd --save
```

引入 **react-app-rewired和customize-cra** 并修改 package.json 里的启动配置

- **config-overrides.js 用于覆盖 webpack 配置**
- **customize-cra 用于执行 config-overrides.js 的修改**
- **react-app-rewired 用于启动 App**

```javascript
npm install react-app-rewired customize-cra --save-dev
```

将package.json 的 "scripts" 修改为

```json
"scripts": {

    "start": "react-app-rewired start",

    "build": "react-app-rewired build",

    "test": "react-app-rewired test",

    "eject": "react-scripts eject"

}
```

安装 babel-plugin-import

```javascript
npm install babel-plugin-import --save-dev
```

在根目录下创建覆盖webpack的 config-overrides.js 文件 并写入以下代码

```javascript
const { override, fixBabelImports } = require('cusomize-cra');

module.exports = override(

    fixBabelImports('import', {

        libraryName: 'antd',

        libraryDirectory: 'es',

        style: 'css',

    })

)
```

然后在页面中写入，重启项目即可看到一个蓝色的按钮

```javascript
import React, { Component } from 'react'
import { Button} from 'antd';

export default class App extends Component {
    render() {
        return (
            <div>
                <Button type="primary">Primary Buttom</Button>
            </div>
        )
    }
}
```

若你还需要自定义样式，你需要安装 less

```javascript
npm i less less-loader -D  // (less-loader建议使用 7.3.0 版本)
```

然后修改 config-overrides.js 文件

```javascript
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exprts = override(

    fixBabelImports('import', {

        libraryName: 'antd',

        libraryDirectory: 'es',

        style: true,

    }),

    addLessLoader({

        lessOptions: {

            javascriptEnabled: true,

            modifyVars: { '@primary-color': '#1DA57A' },

        }

    }),

);
```

重启项目，如果你看到一个绿色的按钮，说明你自定义主题成功



附上包版本信息

package.json

```json
"dependencies": {
    "@testing-library/jest-dom": "^5.15.0",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "antd": "^4.16.13",
    "axios": "^0.24.0",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

```json
"devDependencies": {
    "babel-plugin-import": "1.13.3",
    "customize-cra": "^1.0.0",
    "less": "^4.1.2",
    "less-loader": "^7.3.0",
    "react-app-rewired": "^2.1.8"
}
```

最后，对自己的备忘录：

antd mobile 的配置与网页端只有 libraryName: 'antd-mobile',不一样。antd-mobile5.0以上不需要做按需加载。其依据webpack的Tree Shaking自配按需加载

如果需要安装less 不需要antd,可尝试仅安装

```javascript
npm install less less-loader -D
npm install react-app-rewired customize-cra --save-dev
```

修改package.json的启动配置后修改 config-overrides.js 文件为

```javascript
const { override, addLessLoader } = require('customize-cra');

module.exports = override(

    addLessLoader({

        lessOptions: {

            javascriptEnabled: true,

        }

    }),

);
```
