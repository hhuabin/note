# useAutoUpdate

## 使用版本号作为标识检测更新

在入口文件`index.html`中增加`version`和`timestamp`的`meta`标签

在`vite`构建时自动修改`version`和`timestamp`的值

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/react.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="version" content="__VERSION__" />
    <meta name="timestamp" content="__BUILD_TIME__" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

```typescript
/*  vite.config */
import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => ({
    base: './',
    plugins: [
        react(),
        {
            name: "inject-version",
            transformIndexHtml(html) {
                html = html.replace(/__VERSION__/g, version)
                    .replace(/__BUILD_TIME__/g, String(new Date().getTime()))
                return html
            },
        },
    ],
}))
```

最后写`hooks`

```typescript
import { useRef, useEffect } from 'react'

/**
 * 用于检测项目是否和线上最新版本相同，是否需要更新，仅生产环境生效
 * 当项目的 package.json 版本号和构建打包时间都不同，则需要更新
 * index.html需要增加 version 和 timestamp 的 meta 标签
 * vite.config.ts 需要配置自动修改 version meta 标签值为 package.json 的 version
 * vite.config.ts 需要配置自动修改 timestamp meta 标签值为当前时间戳
 * @param { string } projectLink 项目部署于域名下的路径，默认为域名根路径/；如果项目部署于子路径，则需要填写子路径，如 /project/
 * @param { boolean } intervalRefresh 是否定时轮询检查更新，默认为 false
 */
const useProjectAutoUpdate = (projectLink = '/', intervalRefresh = false) => {

    // <meta name="version" content="__VERSION__" />
    const versionAndtimestampRegex = /<meta\s+name="(version|timestamp)"\s+content="([^"]+)"\s*\/?>/gi
    const projectVersion = useRef('')
    const projectBuildTime = useRef('')
    const intervalRefreshTimer = useRef<NodeJS.Timeout | null>(null)
    const REFRESH_INTERVAL = 60000      // 一分钟轮询检查更新一次

    useEffect(() => {
        // if (import.meta.env.MODE !== 'production') return
        getVersionAndTimeFromLocalHtmlMetaAndStartRefresh()

        return () => {
            clearTntervalRefreshTimer()
        }
    }, [])

    /**
     * 获取当前（包括本地存储）页面的版本号和编译时间
     */
    const getVersionAndTimeFromLocalHtmlMetaAndStartRefresh = () => {
        const versionMeta = document.querySelector('meta[name="version"]')
        const buildTimeMeta = document.querySelector('meta[name="timestamp"]')
        projectVersion.current = versionMeta?.getAttribute('content') || ''
        projectBuildTime.current = buildTimeMeta?.getAttribute('content') || ''
        if (!projectVersion.current || !projectBuildTime.current) {
            console.warn('useProjectAutoUpdate：当前页面未找到版本信息，请检查是否已配置版本信息；检测项目更新失败，请稍后重试')
            return
        }
        startCheckRefresh()
    }

    /**
     * 提取链接（项目部署地址）中的版本号和构建打包时间
     * @param { string } link 项目部署于域名下的路径
     * @returns { Promise<[string, string]> } [版本号, 时间戳]
     */
    const extractMetaFromLink = (link = projectLink): Promise<[string, string]> => {
        // fetch('/?timestamp='+Date.now()).then(resp=>resp.text()).then(res=>console.log(res))
        return fetch(link + '?timestamp=' + Date.now())
            .then(response => response.text())
            .then(htmlString => {
                const result: [string, string] = ['', '']
                let match: RegExpExecArray | null
                versionAndtimestampRegex.lastIndex = 0
                while ((match = versionAndtimestampRegex.exec(htmlString)) !== null) {
                    const name = match[1]
                    if (name === 'version') {
                        result[0] = match[2]
                    } else if (name === 'timestamp') {
                        result[1] = match[2]
                    }
                }
                if (result[0] && result[1]) {
                    return Promise.resolve(result)
                } else {
                    return Promise.reject('useProjectAutoUpdate：远程页面未找到版本信息，请检查是否已配置版本信息；检测项目更新失败，请稍后重试')
                }
            })
            .catch(error => {
                console.warn(error)
                return Promise.reject(error)
            })
    }

    // 检测项目是否需要更新
    const checkProjectUpdate = async () => {
        const [version, buildTime] = await extractMetaFromLink(projectLink)
        let isNeedUpdate = false
        /**
         * 更新判定标准，可根据需要修改
         * 版本号和构建打包时间都不同，则需要更新
         */
        if (version !== projectVersion.current && buildTime !== projectBuildTime.current) {
            isNeedUpdate = true
            console.warn(`current version: ${projectVersion.current}, Latest version: ${version}`)
            console.warn(`current timestamp: ${projectBuildTime.current}, Latest timestamp: ${buildTime}`)
        }
        // 避免多次弹窗更新
        projectVersion.current = version
        projectBuildTime.current = buildTime
        if (isNeedUpdate) {
            // 避免多次弹窗更新
            clearTntervalRefreshTimer()
            // 弹出用户更新的弹窗
            if (window.confirm('检测到更新，是否刷新页面？')) {
                window.location.reload()
            }
        }
    }

    // 初始和轮询检查项目更新
    const startCheckRefresh = () => {
        // 初始化 3s 后检查一次更新，给用户反应时间
        setTimeout(() => {
            checkProjectUpdate()
        }, 3000)

        // 循环检查更新
        if (intervalRefresh) {
            clearTntervalRefreshTimer()
            intervalRefreshTimer.current = setInterval(() => {
                checkProjectUpdate()
            }, REFRESH_INTERVAL)
        }
    }

    // 清除循环检查更新定时器
    const clearTntervalRefreshTimer = () => {
        if (intervalRefreshTimer.current) {
            clearInterval(intervalRefreshTimer.current)
            intervalRefreshTimer.current = null
        }
    }
}

export default useProjectAutoUpdate

```



## 2.使用打包的\<script>标签作为标识检测更新

利用打包后`<script>`的`hash`值不一样实现自动更新

```typescript
import { useRef, useEffect } from 'react'

/**
 * bug: 该方法有个巨大的bug，就是会捕获 index.html 所有的 <script> 标签，哪怕是被注释的
 * @description 自动刷新页面，用于检测项目是否需要更新，仅生产环境生效
 * vite.config.ts 的 output.entryFileNames 需设置为 'js/[name]-[hash].js'
 * @param projectLink 项目部署地址，默认为域名根路径
 * @param realTime 是否实时检查，默认为 false
 */
const useProjectAutoUpdate = (projectLink = '/', realTime = false) => {

    // <script type='module' crossorigin src='./js/index.js'></script>
    const scriptReg = /<script\b[^>]*src=["']([^"']*)["'][^>]*(>[^<]*<\/script>|\/>)/gi
    const localScripts = useRef<string[]>([])
    const REALTIME_DURATION = 3000

    useEffect(() => {
        // if (import.meta.env.MODE !== 'production') return
        // if (process.env.NODE_ENV !== 'production') return   // webpack
        getFirstLevelHeadAndBodyScripts()
        if (realTime) {
            realTimeRefresh()
        } else {
            startRefresh()
        }
    }, [])

    // 获取当前（包括本地存储）页面的 <head/> 和 <body/> 子元素的 <script/>的src 值
    const getFirstLevelHeadAndBodyScripts = () => {
        const headChildren: HTMLCollection = document.head.children        // 获取 head 的直接子元素，伪数组
        const bodyChildren: HTMLCollection = document.body.children        // 获取 body 的直接子元素，伪数组

        const scriptsValue = [...Array.from(headChildren), ...Array.from(bodyChildren)].reduce((prev, current) => {
            if (current.tagName.toLowerCase() === 'script') {
                if (current.getAttribute('data-webpack')) return prev   // 移除 webpack 打包生成并用于懒加载模块

                const src = current.getAttribute('src')
                if (src) return [...prev, src]
                return prev
            }
            return prev
        }, [] as string[])
        localScripts.current = scriptsValue
    }

    /**
     * 提取链接中的script标签
     * @param link 链接
     * @returns Promise<string[]>
     */
    const extractNewScript = (link = projectLink): Promise<string[]> => {
        // fetch('/?timestamp='+Date.now()).then(resp=>resp.text()).then(res=>console.log(res))
        return fetch(link + '?timestamp=' + Date.now())
            .then(response => response.text())
            .then(htmlString => {
                scriptReg.lastIndex = 0
                const result: string[] = []
                let match: RegExpExecArray | null
                while ((match = scriptReg.exec(htmlString)) !== null) {
                    result.push(match[1])
                }
                return Promise.resolve(result)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    /**
     * 是否需要更新
     */
    const needUpdate = async () => {
        const newScripts = await extractNewScript()
        let result = false
        if (newScripts.length !== localScripts.current.length) {
            result = true
        }
        for (let i = 0; i < newScripts.length; i++) {
            if (localScripts.current[i] !== newScripts[i]) {
                result = true
                break
            }
        }
        if (result) console.log(newScripts, localScripts.current)
        localScripts.current = newScripts
        return result
    }

    // 项目启动时检查项目是否需要更新
    const startRefresh = async () => {
        const willUpdate = await needUpdate()
        if (willUpdate) {
            if (window.confirm('检测到更新，是否刷新页面？')) {
                location.reload()
            }
        }
    }

    // 实时检查项目是否需要更新
    const realTimeRefresh = () => {
        setTimeout(async () => {
            const willUpdate = await needUpdate()
            if (willUpdate) {
                if (window.confirm('检测到更新，是否刷新页面？')) {
                    location.reload()
                } else {
                    return
                }
            }
            realTimeRefresh()
        }, REALTIME_DURATION)
    }
}

export default useProjectAutoUpdate

```

