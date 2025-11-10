# rollupOptions

```typescript
import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'

export default defineConfig((env: ConfigEnv) => ({
    build: {
        rollupOptions: {},
    },
}))
```



## external

用来指定哪些模块不应该被打包到最终的产物中，而是**保留为外部依赖**

```typescript
rollupOptions: {
    external: [],
},
```



### 外部依赖包管理

1. 确保 `react` 和 `react-dom` 作为外部依赖

   ```typescript
   external: ['react', 'react-dom'],
   ```

2. 在 `index.html` 中添加引入 `<script type="importmap"/>`。链接需要支持 `ES Module` 模块化

   部分CDN网址：

   1. esm：`https://esm.sh`（推荐使用）`https://esm.sh/react` 不指定版本，默认就是最新的哦

   2.  jsDelivr：`https://www.jsdelivr.com/package/npm/react`
   3. skypack：`https://www.skypack.dev`：这个我用的时候挂了！
   
   ```html
   <body>
     <div id="root"></div>
     <script type="importmap">
     {
       "imports": {
         "react": "https://esm.sh/react@18.2.0",
         "react-dom": "https://esm.sh/react-dom@18.2.0"
       }
     }
     </script>
     <script type="module" src="/src/main.tsx"></script>
   </body>
   ```
   
   `importmap`的浏览器支持情况
   
   **Chrome**：从 89 版本开始，Chrome 完全支持导入映射（import map）。
   
   **Edge**：由于 Edge 是基于 Chromium 内核的，它与 Chrome 相同，也支持导入映射。
   
   **Safari**：从 Safari 14.1 版本开始，Safari 支持导入映射。
   
   **Firefox**：Firefox 在 93 版本中开始支持导入映射
   
   ```typescript
   // 浏览器判断支不支持importMap
   const supportsImportMap: boolean = 'importMap' in document.createElement('script');
   ```
   
   如果需要适配低版本的浏览器，可以结合**SystemJS** 动态加载 React 和 ReactDOM



## output

### assetFileNames

可以对打包后静态资源做出分类

```typescript
rollupOptions: {
    output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'react-vendor') {
                return 'js/[name].js'
            }
            return 'js/[name]-[hash].js'
        },
        assetFileNames(chunkInfo) {
            const imgExts = ['.jpg', '.png', '.jpeg', '.webp', '.svg', '.gif', '.ico']
            if (chunkInfo.name?.endsWith('.css')) {
                return 'css/[name]-[hash].css'
            } else if (imgExts.some(ext => chunkInfo.name?.endsWith(ext))) {
                return 'images/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
        },
    }
}
```



### manualChunks

**PS：大多数情况下，Vite 的默认代码分割策略已经足够。非专业就不要去配了，随他去吧**

`manualChunks` 是 Vite 和 Rollup 提供的一项配置，用于 **手动分割代码（chunks）**，控制项目在打包时生成的文件组织方式

1.  优化首屏加载时间
2.  提升缓存利用率
3.  按业务模块划分代码
4.  避免过大的单文件

一般做React独立配置即可

```typescript
rollupOptions: {
    output: {
        manualChunks: {
            'react-vendor': [
                'react',
                'react-dom',
                'react-router-dom',
                'react-redux',
                '@reduxjs/toolkit',
            ],
        },
    }
}
```



提供一部分测试代码，虽然没什么卵用：

```typescript
rollupOptions: {
    output: {
        manualChunks: (id) => {
            if (id.includes('/node_modules/')) {
                id = id.split('/node_modules/')[1]
                if (id.startsWith('react-router') || id.includes('@remix-run/router')) {
                    return 'react-router-vendor'
                } else if (id.includes('redux') || id.includes('immer')) {
                    return 'redux-vendor'
                } else if ( id.startsWith('react') || id.startsWith('@react-spring') || id.startsWith('@use-gesture')) {
                    return 'react-vendor'
                } else if (id.includes('lodash') || id.includes('axios') || id.includes('dayjs')) {
                    return 'utils-vendor'
                } else if (id.includes('antd-mobile')) {
                    return 'antd-vendor'
                }
                return 'vendor'
            } else if (id.includes('/src/pages/')) {
                const moduleName = id.split('/src/pages/')[1].split('/')
                let pageName = moduleName[0]
                if (!moduleName[1].includes('.')) {
                    pageName += ('-' + moduleName[1])
                }
                return pageName
            } else if (id.includes('/src/components/')) {
                const componentName = id.split('/src/components/')[1].split('/')[0]
                return componentName
            } else if (id.includes('/src/utils/')) {
                return 'utils'
            }
        },
    }
}
```

Vue：

```typescript
rollupOptions: {
    output: {
        manualChunks: (id) => {
            if (id.includes('node_modules')) {
                if (/node_modules\/(vue[^/]*\/|@vue[^/]*\/|pinia[^/]*\/)/.test(id)) {
                    return 'vue-vendor'
                } else if (id.includes('lodash') || id.includes('axios') || id.includes('dayjs')) {
                    return 'utils-vendor'
                } else if (id.includes('ant-design')) {
                    return 'antd-vendor'
                } else if (id.includes('echarts')) {
                    console.log(`--${id}--`);
                    return 'echarts-vendor'
                } else if (id.includes('zrender')) {
                    return 'zrender-vendor'
                }
                return 'vendor'
            } else if (id.includes('/src/views/')) {
                const moduleName = id.split('/src/views/')[1].split('/')
                let pageName = moduleName[0]
                if (!moduleName[1].includes('.')) {
                    pageName += ('-' + moduleName[1])
                }
                return pageName
            } else if (id.includes('/src/components/')) {
                const componentName = id.split('/src/components/')[1].split('/')[0]
                return componentName
            } else if (id.includes('/src/utils/')) {
                return 'utils'
            }
        },
    },
}
```







