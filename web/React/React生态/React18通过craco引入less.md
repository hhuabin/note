[craco官网](https://craco.js.org/docs/getting-started/)

# 使用 less

1. **安装相关依赖**

   需要安装 **@craco/craco**、**less** 和 **craco-less**：

   craco 只能配和 craco.config.js 文件使用

   ```
   npm install @craco/craco less craco-less --save-dev
   ```

2. **创建 craco.config.js 文件**

   在项目根目录下，创建一个名为 craco.config.js 的文件，用于配置 `craco`。

   ```javascript
   const CracoLessPlugin = require('craco-less');
   
   module.exports = {
   	plugins: [
   		{
   			plugin: CracoLessPlugin,
   		},
   	],
   };
   ```
   
3. **修改 package.json 文件**

   在 package.json 文件中，将启动命令从 `react-scripts` 改为 `craco`。

   ```json
   "scripts": {
     "start": "craco start",
     "build": "craco build",
     "test": "craco test",
     "eject": "react-scripts eject"
   }
   ```

4. 创建 Less 文件并在组件中使用

   在需要使用 Less 样式的组件中，可以通过 `import` 引入 Less 文件，并通过 `className` 属性来应用样式。

   ```javascript
   import styles from './MyComponent.module.less';
   
   function MyComponent() {
     return (
       <div className={styles.container}>
         <p className={styles.text}>Hello, world!</p>
       </div>
     );
   }
   
   export default MyComponent;
   ```

   在 Less 文件中，可以使用类似下面这样的方式来定义样式：

   ```less
   .container {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
     background-color: #f0f0f0;
   
     .text {
       font-size: 24px;
       color: #333;
     }
   }
   ```



# 模块化

less做样式模块化，与 css 模块化累似

```javascript
// 样式文件命名 index.module.less
import hello from './index.module.less'

render() {
    return <h2 className={hello.title}>Hello,React!</h2>
}
```

但是导入 .module.less 时会报找不着该模块的错误，解决办法：

定义模块，声明有此模块即可

在 src/lib/下新建 less.d.ts 文件

```typescript
declare module "*.module.less" {
	const less: { [key: string]: string };
	export default less;
}
```





# 自定义 Antd 主题

**按需引入：Antd 5 自动支持按需引入，无需配置**

Antd 5 使用自己 ConfigProvider 组件实现**主题定制**，修改 theme 属性即可，以下代码，antd的主题色修改成 #00b96b

```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<HashRouter>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#00b96b',
					},
				}}
			>
				<App />
			</ConfigProvider>
		</HashRouter>
	</React.StrictMode>
);

```



