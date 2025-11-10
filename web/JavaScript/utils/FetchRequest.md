# FetchRequest



## 单个可取消请求（移动端）

```typescript
export default class FetchRequest {

    private baseURL = import.meta.env.VITE_API_BASE_URL
    private controller: AbortController

    constructor() {
        this.controller = new AbortController()
    }

    private updateController = () => {
        this.controller = new AbortController()
    }

    // eslint-disable-next-line
    public sendRequest = async <T = any>(url: string, data: any = {}, options?: RequestInit): Promise<T> => {
        // 是否取消上次请求
        if (data.cancelLastFetch) {
            delete data.cancelLastFetch
            this.cancelFetch(this.controller)
            /**
             * 可以在这里更新请求 controller
             * 但是这样会造成controller长期不更新
             * 一旦取消请求，多个请求会被同时取消
             * 甚至是请求不同组件的请求被取消，不推荐在这里更新
             */
            // this.updateController()
        }
        // 不管是否取消上一次请求，都应该更新controller
        this.updateController()

        const body = data ? JSON.stringify({
            ...data,
        }) : undefined

        if (!url.startsWith('http')) {
            url = this.baseURL + url
        }

        return fetch(url, {
            signal: this.controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
            body,
        })
        .then((response: Response) => {
            if (!response.ok) return Promise.reject(response)
            return response.json()
        })
        .then(data => {
            if (data.result_code === '0') {
                return data
            }
            return Promise.reject(data)
        })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('请求被取消')
                /**
                 * 在返回 pendding 状态的时候，要确保请求函数的.catch没有什么必须要处理的逻辑
                 * 比如清除组件的loading状态、以及函数防抖等
                 * 若有此类逻辑，该接口不能使用取消请求功能，或者此处返回一个失败状态的 Promise
                 */
                return new Promise(() => {})
            } else {
                return Promise.reject(error)
            }
        })
    }

    // 取消请求
    public cancelFetch = (controller: AbortController) => {
        controller.abort()
    }

    public getFetchInstance = () => {
        return this.sendRequest
    }
}
```

调用`FetchRequest`

```typescript
import FetchRequest from "@/utils/Request/FetchRequest"

const fetchRequest = new FetchRequest()
import {
    PublicParam,
    IpublicAnswer,
} from './indexType'

export const baseRequest = (params: PublicParam, options?: RequestInit): Promise<IpublicAnswer> => {
    return fetchRequest.sendRequest(
        "http://localhost:5000/user/postlist",
        {
            ...params,
        },
        {
            method: 'POST',
            ...options,
        },
    )
}
```

React发送请求

```typescript
const controller = useRef<AbortController>(new AbortController())

const request = () => {
    cancelRequest()
    const { signal } = controller.current
    baseRequest({
        cancelLastFetch: false,
    }, {
        signal,
    })
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    })
}
// 取消请求
const cancelRequest = () => {
    controller.current.abort()
    controller.current = new AbortController()
}
```



## 多个 loading 可取消请求（PC端）

```typescript
import { message } from 'antd'

export default class FetchRequest {

    private baseURL = import.meta.env.VITE_API_BASE_URL
    private controller: AbortController
    private loadingMessage = new Map<symbol, () => void>()

    constructor() {
        this.controller = new AbortController()
    }

    // 更新controller
    private updateController = () => {
        this.controller = new AbortController()
    }

    // eslint-disable-next-line
    public sendRequest = async <T = any>(url: string, data: any = {}, options?: RequestInit): Promise<T> => {
        // 是否取消上次请求
        if (data.cancelLastRequest) {
            delete data.cancelLastRequest
            this.cancelFetch(this.controller)
            /**
             * 可以在这里更新请求 controller
             * 但是这样会造成controller长期不更新
             * 一旦取消请求，多个请求会被同时取消
             * 甚至是请求不同组件的请求被取消，不推荐在这里更新
             */
            // this.updateController()
        }
        // 不管是否取消上一次请求，都应该更新controller
        this.updateController()

        // 处理loading逻辑
        let loadingMessage = () => {}
        let timerId: NodeJS.Timeout
        if (!data.cancelLoading) {
            timerId = setTimeout(() => {
                loadingMessage = message.loading('loading...', 0)
            }, 1000)
        } else {
            delete data.cancelLoading
        }

        const body = data ? JSON.stringify({
            ...data,
        }) : undefined

        if (!url.startsWith('http')) {
            url = this.baseURL + url
        }

        return fetch(url, {
            signal: this.controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
            body,
        })
        .then((response: Response) => {
            if (!response.ok) return Promise.reject(response)
            return response.json()
        })
        .then(data => {
            if (data.result_code === '0') {
                clearTimeout(timerId)
                loadingMessage()
                return data
            }
            return Promise.reject(data)
        })
        .catch(error => {
            clearTimeout(timerId)
            loadingMessage()

            if (error.name === 'AbortError') {
                console.warn('请求被取消', error)
                return new Promise(() => { })
            } else {
                return Promise.reject(error)
            }
        })
    }

    // 取消请求
    public cancelFetch = (controller: AbortController) => {
        controller.abort()
    }

    public getFetchInstance = () => {
        return this.sendRequest
    }
}
```



## 请求进度

fetch无法监听请求进度



## 响应进度（参考）

**进度监听的主要用途确实集中在处理大文件或二进制数据的上传和下载**

进度监听的关键在于**数据流**的传输，而非数据的具体类型。无论是文本、JSON、图像、视频等，进度监听都可以捕获传输的进度。对于以下场景，进度监听都是有效的：

- 上传文件（无论文件格式）
- 下载大文件或长时间加载的资源

---

`fetch` 是一个基于 Promise 的现代接口，但**不直接支持对响应进度的监控**。为此，可以结合 `ReadableStream` 和 `Response.body` 来实现进度监控

- 其主要在初次响应的 `response` 中做处理，而不是在 `response.json()` 中
- 主要是利用header的`Content-Length`，以及对**流式读取响应体**后，需要对响应体进行重新拼接

```typescript
import { message } from 'antd'

export default class FetchRequest {

    private baseURL = import.meta.env.VITE_API_BASE_URL
    private controller: AbortController
    private loadingMessage = new Map<symbol, () => void>()

    constructor() {
        this.controller = new AbortController()
    }

    // 更新controller
    private updateController = () => {
        this.controller = new AbortController()
    }

    // eslint-disable-next-line
    public sendRequest = async <T = any>(url: string, data: any = {}, options?: RequestInit): Promise<T> => {
        // 是否取消上次请求
        if (data.cancelLastRequest) {
            delete data.cancelLastRequest
            this.cancelFetch(this.controller)
            /**
             * 可以在这里更新请求 controller
             * 但是这样会造成controller长期不更新
             * 一旦取消请求，多个请求会被同时取消
             * 甚至是请求不同组件的请求被取消，不推荐在这里更新
             */
            // this.updateController()
        }
        // 不管是否取消上一次请求，都应该更新controller
        this.updateController()

        // 处理loading逻辑
        let loadingMessage = () => {}
        let timerId: NodeJS.Timeout
        if (!data.cancelLoading) {
            timerId = setTimeout(() => {
                loadingMessage = message.loading('loading...', 0)
            }, 1000)
        } else {
            delete data.cancelLoading
        }

        const body = data ? JSON.stringify({
            ...data,
        }) : undefined

        if (!url.startsWith('http')) {
            url = this.baseURL + url
        }

        return fetch(url, {
            signal: this.controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
            body,
        })
        .then(async (response: Response) => {
            if (!response.ok) return Promise.reject(response)
            // 获取响应头，确定响应头的类型
            const contentType = response.headers.get("Content-Type")
            // 从请求头获取数据总长度
            const contentLength = response.headers.get("Content-Length")
            const stream = response.body
            if (contentLength && stream) {
                try {
                    const reader = stream.getReader()
                    let loaded = 0               // 已经加载的数据长度
                    const decoder = new TextDecoder()   // 用于解码二进制数据
                    let body = ''                // 存储读取的数据
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        const { done, value } = await reader.read()
                        if (done) {
                            reader.releaseLock()
                            break
                        }
                        body += decoder.decode(value)
                        loaded += value.length
                        console.log("request progress:", (loaded / +contentLength * 100).toFixed(0) + '%')
                    }
                    console.log("result body", body)
                    // body 是二进制数据，而不是 json，下面的请求需要针对此做出改变
                    return body
                } catch (error) {
                    // 例如请求中断会导致读取失败
                    console.error("Error reading stream")
                    return Promise.reject(error)
                }
            }
            // 检查返回的 Content-Type 以确定数据格式
            if (contentType?.includes("application/json")) {
                return response.json()
            } else if (contentType?.includes("text/plain") || contentType?.includes("text/html")) {
                return response.text()
            } else {
                return response.json()
            }
        })
        .then(data => {
            if (data.result_code === '0') {
                clearTimeout(timerId)
                loadingMessage()
                return data
            }
            return Promise.reject(data)
        })
        .catch(error => {
            clearTimeout(timerId)
            loadingMessage()

            if (error.name === 'AbortError') {
                console.warn('请求被取消', error)
                return new Promise(() => { })
            } else {
                return Promise.reject(error)
            }
        })
    }

    // 取消请求
    public cancelFetch = (controller: AbortController) => {
        controller.abort()
    }

    public getFetchInstance = () => {
        return this.sendRequest
    }
}
```



