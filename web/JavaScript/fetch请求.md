# fetch 关注分离的设计思想

利用 `Promise` 的机制

1. 联系服务器，**获取响应头数据**
2. 将响应头信息信息封装在  `response`  中
3. 利用`json()`、`text()`等放出处理 `response` 的数据

第一次成功响应是联系服务器成功，**获取到了响应头数据**，比如`Content-Type`、`Content-Length` 等，此时可以访问`response.headers` 了

第二次响应则是**获取到了响应的所有数据**，即使是大文件下载亦是等到文件全部下载完成才会有第二次的响应成功。



## 基本使用

```javascript
fetch('/api1/users/search')
.then(response => {
    console.log('联系服务器成功了');
    return response.json()
},error => {
    console.log('联系服务器失败了',error);
    return new Promise(()=>{})
})
.then(response => {
    console.log('获取数据成功了',response);
},error => {
    console.log('获取数据失败了',error);
})
```

部分优化：

```javascript
fetch('/api1/users/search')
.then(response => {
    console.log('联系服务器成功了');
    return response.json()
})
.then(response => {
    console.log('获取数据成功了',response);
})
.catch(error => {
    console.error(error);
})
```

请求优化：

```javascript
try {
    const response= await fetch('/api1/users/search')
    const data = await response.json()
    console.log(data);
} catch (error) {
    console.log('请求出错',error);
}
```



### 响应类型

1. **JSON 响应**：

   将响应解析为 JSON 对象，适合处理服务器返回 **JSON 格式的 API 响应**

   ```javascript
   response.json().then(data => console.log(data));
   ```

2. **文本响应**：

   将响应解析为纯文本，适合处理**文本或 HTML** 内容

   ```javascript
   response.text().then(text => console.log(text));
   ```

3. **Blob (二进制) 响应**：

   将响应解析为 `Blob`（二进制文件），适合处理**文件下载或图片**

   ```javascript
   response.blob().then(blob => {
       const url = URL.createObjectURL(blob);
       console.log(url);
   });
   ```

4. **FormData 响应**：

   将响应解析为 `FormData` 对象，适合处理包含**表单数据**的响应

   ```javascript
   response.formData().then(formData => console.log(formData));
   ```

5. **ArrayBuffer响应（音频等）**：

   将响应解析为 `ArrayBuffer`，适合处理更底层的二进制数据，如**音频或视频**

   ```javascript
   response.arrayBuffer().then(buffer => console.log(buffer));
   ```



## 请求方法

`fetch` 默认使用 `GET` 方法。如果你需要使用其他方法，比如 `POST`、`PUT`、`DELETE`，可以通过传递第二个参数对象来指定



### POST

```javascript
fetch('https://api.example.com/data', {
    method: 'POST',   // 请求方法
    headers: {
        'Content-Type': 'application/json',  // 指定发送 JSON 数据
    },
    body: JSON.stringify({
        name: 'John',
        age: 30,
    }),  // 请求体内容
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))


fetch('https://api.example.com/data', {
    method: 'POST',            // HTTP 请求方法，例如：GET, POST, PUT, DELETE
    headers: {                 // 请求头信息，指定数据格式
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token',  // 如果需要 token 认证
    },
    body: JSON.stringify({
        title: 'Post title',
        body: 'Post content',
    }),                        // 请求体，发送数据
    mode: 'cors',              // 跨域请求设置，默认 'cors'
    credentials: 'include',    // 携带 cookie，'omit' 表示不携带，'same-origin' 表示同源携带
    cache: 'no-cache',         // 缓存模式，例如：default, no-cache, reload, force-cache
    redirect: 'follow',        // 重定向模式，例如：manual, follow, error
    referrerPolicy: 'no-referrer',  // 引用策略
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error))
```

- mode

  1. **`cors`**（默认）：允许跨域请求，但要求服务器允许（通过设置 `Access-Control-Allow-Origin` 头）
  2. **`no-cors`**：允许跨域请求，但你无法读取响应内容，只能用于加载图片、脚本等静态资源，不能用于获取 JSON 数据
  3. **`same-origin`**：要求请求的资源与页面来源相同，否则请求会被阻止

  如果服务器没有配置跨域，那么mode配置成什么都不好使，一般使用默认的`cors`即可



## 取消请求(AbortController)

虽然 `fetch` 本身不提供取消请求的机制，但你可以通过 `AbortController` 来实现取消请求的功能

- `AbortSignal` **不能重复使用**。每个 `AbortController.signal` 只能与一次请求绑定，一旦通过 `AbortController.abort()` 方法触发了中止信号，该 `signal` 就会变为不可用状态，不能再用于其他请求
- ==**一旦调用`controller.abort()`方法，必须立刻更新`controller`**==
- 一个`signal`可以被同时用于多个请求中，但是一旦取消请求，会将同个`signal`的请求都取消

```typescript
export default class FetchRequest {
    private controller: AbortController
    private signal: AbortSignal

    constructor() {
        const controller = new AbortController()
        this.controller = controller
        this.signal = controller.signal
    }

    private updateController = () => {
        const controller = new AbortController()
        this.controller = controller
        this.signal = controller.signal
    }

    public sendRequest = () => {
        fetch('https://api.example.com/data', {
            signal: this.signal,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('请求被取消')
            } else {
                console.error('Fetch error:', error)
            }
        })
    }

    // 取消请求
    public cancelFetch = (controller: AbortController) => {
        this.controller.abort()
        this.updateController()
    }
}
```



## 接口定义

```typescript
function fetch(
    input: string | URL | globalThis.Request,
    init?: RequestInit,
): Promise<Response>;
```

```typescript
interface RequestInit {
    method?: string
    keepalive?: boolean
    headers?: HeadersInit
    body?: BodyInit
    redirect?: RequestRedirect
    integrity?: string
    signal?: AbortSignal
    credentials?: RequestCredentials
    mode?: RequestMode
    referrer?: string
    referrerPolicy?: ReferrerPolicy
    window?: null
    dispatcher?: Dispatcher
    duplex?: RequestDuplex
}

export declare class Response implements BodyMixin {
    constructor (body?: BodyInit, init?: ResponseInit)

    readonly headers: Headers
    readonly ok: boolean
    readonly status: number
    readonly statusText: string
    readonly type: ResponseType
    readonly url: string
    readonly redirected: boolean

    readonly body: ReadableStream | null
    readonly bodyUsed: boolean

    readonly arrayBuffer: () => Promise<ArrayBuffer>
    readonly blob: () => Promise<Blob>
    readonly formData: () => Promise<FormData>
    readonly json: () => Promise<unknown>
    readonly text: () => Promise<string>

    readonly clone: () => Response

    static error (): Response
    static json(data: any, init?: ResponseInit): Response
    static redirect (url: string | URL, status: ResponseRedirectStatus): Response
}
```
