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

import pck from './package.json'

// https://vitejs.dev/config/
export default defineConfig((env: ConfigEnv) => ({
    base: './',
    plugins: [
        react(),
        // 修改 index.html 中的 version
        {
            name: "inject-version",
            transformIndexHtml(html) {
                html = html.replace(/__VERSION__/g, pck.version)
                    .replace(/__BUILD_TIME__/g, String(new Date().getTime()))
                return html
            },
        },
    ],
}))
```

最后写`hooks`

```typescript
import { useRef, useEffect } from "react"

/**
 * 用于检测项目是否和线上最新版本相同，是否需要更新，仅生产环境生效
 * 当项目的 package.json 版本号和构建打包时间都不同，则需要更新
 * index.html需要增加 version 和 timestamp 的 meta 标签
 * vite.config.ts 需要配置自动修改 version meta 标签值为 package.json 的 version
 * vite.config.ts 需要配置自动修改 timestamp meta 标签值为当前时间戳
 * @param projectLink 项目部署地址，默认为域名根路径
 * @param realTime 是否实时检查，默认为 false
 */
const useProjectAutoUpdate = (projectLink = '/', realTime = false) => {

    // <meta name="version" content="__VERSION__" />
    const versionAndtimestampRegex = /<meta\s+name="(version|timestamp)"\s+content="([^"]+)"\s*\/?>/gi
    const projectVersion = useRef("")
    const projectBuildTime = useRef("")
    const REALTIME_DURATION = 3000

    useEffect(() => {
        if (import.meta.env.MODE !== 'production') return
        getVersionAndTimeFromLocalHtmlMeta()
        startRefresh()
    }, [])

    /**
     * 获取当前（包括本地存储）页面的版本号和编译时间
     */
    const getVersionAndTimeFromLocalHtmlMeta = () => {
        const versionMeta = document.querySelector('meta[name="version"]')
        const buildTimeMeta = document.querySelector('meta[name="timestamp"]')
        projectVersion.current = versionMeta?.getAttribute('content') || ""
        projectBuildTime.current = buildTimeMeta?.getAttribute('content') || ""
    }

    /**
     * 提取链接（项目部署地址）中的版本号和构建打包时间
     * @param { string } link 项目部署地址
     * @returns { Promise<[string, string]> } [版本号, 时间戳]
     */
    const extractVersionAndBuildTimeMeta = (link = projectLink): Promise<[string, string]> => {
        // fetch('/?timestamp='+Date.now()).then(resp=>resp.text()).then(res=>console.log(res))
        return fetch(link + '?timestamp=' + Date.now())
            .then(response => response.text())
            .then(htmlString => {
                const result: [string, string] = ["", ""]
                let match: RegExpExecArray | null
                versionAndtimestampRegex.lastIndex = 0
                while ((match = versionAndtimestampRegex.exec(htmlString)) !== null) {
                    const name = match[1]
                    if (name === "version") {
                        result[0] = match[2]
                    } else if (name === "timestamp") {
                        result[1] = match[2]
                    }
                }
                return Promise.resolve(result)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }

    // 检测项目是否需要更新
    const isProjectNeedUpdate = async () => {
        const [version, buildTime] = await extractVersionAndBuildTimeMeta()
        let isNeedUpdate = false
        // 版本号和构建打包时间都不同，则需要更新
        if (version !== projectVersion.current && buildTime !== projectBuildTime.current) {
            isNeedUpdate = true
            console.warn(`current version: ${projectVersion.current}, Latest version: ${version}`)
            console.warn(`current timestamp: ${projectBuildTime.current}, Latest timestamp: ${buildTime}`)
        }
        // 避免多次弹窗更新
        projectVersion.current = version
        projectBuildTime.current = buildTime

        return isNeedUpdate
    }

    // 实时检查项目是否需要更新
    const startRefresh = () => {
        setTimeout(async () => {
            const willUpdate = await isProjectNeedUpdate()
            if (willUpdate && window.confirm('检测到更新，是否刷新页面？')) {
                window.location.reload()
            } else {
                return
            }
            // 实时检查项目是否需要更新
            realTime && startRefresh()
        }, REALTIME_DURATION)
    }
}

export default useProjectAutoUpdate

```



## 使用打包的\<script>标签作为标识检测更新

利用打包后`<script>`的`hash`值不一样实现自动更新

```typescript
import { useRef, useEffect } from "react"

/**
 * 自动刷新页面，用于检测项目是否需要更新，仅生产环境生效
 * vite.config.ts 的 output.entryFileNames 需设置为 'js/[name]-[hash].js'
 * @param projectLink 项目部署地址，默认为域名根路径
 * @param realTime 是否实时检查，默认为 false
 */
const useProjectAutoUpdate = (projectLink = '/', realTime = false) => {

    // <script type="module" crossorigin src="./js/index.js"></script>
    const scriptReg = new RegExp(/<script\b[^>]*src=["'](?<src>[^"']*)["'][^>]*(>[^<]*<\/script>|\/>)/, 'gm')
    const localScripts = useRef<string[]>([])
    const REALTIME_DURATION = 3000

    useEffect(() => {
        if (import.meta.env.MODE !== 'production') return
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
        const scriptsValue = [...headChildren, ...bodyChildren].reduce((prev, current) => {
            if (current.tagName.toLowerCase() === 'script') {
                const src = current.getAttribute('src')
                if (src) {
                    return [...prev, src]
                }
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
            .then(html => {
                scriptReg.lastIndex = 0
                const result: string[] = []
                let match: RegExpExecArray | null
                while ((match = scriptReg.exec(html)) !== null) {
                    result.push(match.groups!.src)
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

