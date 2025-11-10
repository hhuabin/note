# 使用 Vite 环境变量

Vite 支持以下几种 `.env` 文件：

- `.env` - 所有环境都会加载。
- `.env.local` - 所有环境都会加载，但会被 `.gitignore` 忽略。
- `.env.[mode]` - 仅在指定的模式下加载（例如 `.env.production`）。
- `.env.[mode].local` - 仅在指定的模式下加载，但会被 `.gitignore` 忽略。



## 步骤 1: 创建 `.env` 文件

在你的项目根目录下创建一个 `.env` 文件。例如：

```env
VITE_APP_TITLE=My Vite App
VITE_API_URL=https://api.example.com
```

请注意，**环境变量名必须以 `VITE_` 开头**，这样才能在 Vite 中使用。



## 步骤 2: 在代码中使用环境变量

你可以使用 `import.meta.env` 来访问环境变量。例如，在一个 React 组件中：

```javascript
javascript复制代码import React from 'react';

const App = () => {
  return (
    <div>
      <h1>{import.meta.env.VITE_APP_TITLE}</h1>
      <p>API URL: {import.meta.env.VITE_API_URL}</p>
    </div>
  );
}

export default App;
```



## 使用模式特定的环境变量

你可以创建模式特定的 `.env` 文件。例如，为生产环境创建一个 `.env.production` 文件：

```env
VITE_APP_TITLE=My Vite App (Production)
VITE_API_URL=https://api.example.com/production
```

当你使用 `vite build --mode production` 时，Vite 会加载 `.env.production` 中的变量。



## `vite.config.ts`中使用环境变量

使用`loadEnv`方法shi'xian

```typescript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    console.log('当前环境变量：', env.VITE_API_BASE_URL)

    return {
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, '')
                }
            }
        }
    }
})
```

