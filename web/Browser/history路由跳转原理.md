# 原理

**参考即可，不全是 popstate 的功劳**

window.history 的方法：

- **back**

- **forward**

- **go**

- **pushState**：**`history.pushState()`** 方法向浏览器的会话历史栈增加了一个条目

  ```javascript
  pushState(state, unused, url)
  ```

  `state` 对象是一个 JavaScript 对象

  `unused`：由于历史原因，该参数存在且不能忽略；传递一个空字符串是安全的，以防将来对该方法进行更改

  `url`：新历史条目的 URL

- **replaceState**：**`replaceState()`** 方法使用状态对象和 URL 作为参数来修改当前的历史记录条目

  ```javascript
  replaceState(state, unused, url)
  ```

  `state`：一个与传递给 `replaceState()` 方法的历史记录条目相关联的对象。状态对象可以是 `null`





1. 当活动的历史记录发生变化会触发 popstate 事件
2. 通过拦截 popstate 实现页面不刷新
3. 而后改变组件渲染

```html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>h5 router</title>
</head>

<body>
    <ul>
        <li><a href="/">/</a></li>
        <li><a href="/page1">page1</a></li>
        <li><a href="/page2">page2</a></li>
        <div id="hash">切换哈希</div>
        <div id="history">切换路由page3</div>
    </ul>
    <div class='content-div'></div>
    <script>
        /**
         * 当活动的历史记录发生变化会触发 popstate 事件
         * 通过拦截 popstate 实现页面不刷新
         * 而后改变组件渲染
         * 即为历史路由基本原理
         */

        class RouterClass {
            constructor(path) {
                this.routes = {}        // 记录路径标识符对应的cb
                history.replaceState({ path }, null, path)
                this.routes[path] && this.routes[path]()
                window.addEventListener('popstate', e => {
                    console.log(e, ' --- e')
                    const path = e.state && e.state.path
                    this.routes[path] && this.routes[path]()
                })
            }

            /**
             * 初始化
             */
            static init() {
                window.Router = new RouterClass(location.pathname)
            }

            /**
             * 记录path对应cb
             * @param path 路径
             * @param cb 回调
             */
            route(path, cb) {
                this.routes[path] = cb || function () { }
            }

            /**
             * 触发路由对应回调
             * @param path
             */
            go(path) {
                history.pushState({ path }, null, path)
                // 因为 pushState 不会触发 popstate 事件，所以需要手动调用函数
                this.routes[path] && this.routes[path]()
            }
        }


        RouterClass.init()
        const ul = document.querySelector('ul')
        const ContentDom = document.querySelector('.content-div')
        const changeContent = content => ContentDom.innerHTML = content

        Router.route('/', () => changeContent('默认页面'))
        Router.route('/page1', () => changeContent('page1页面'))
        Router.route('/page2', () => changeContent('page2页面'))

        ul.addEventListener('click', e => {
            if (e.target.tagName === 'A') {
                e.preventDefault()
                Router.go(e.target.getAttribute('href'))
            }
        })

        const ahistory = document.getElementById("history")
        ahistory.addEventListener("click", () => {
            history.pushState({
                path: "/page3"
            }, null, "/page3")
            const popStateEvent = new PopStateEvent('popstate', { state: { data: 'test' } })
        	window.dispatchEvent(popStateEvent)            // 手动触发popstate事件
            // const ContentDom = document.querySelector('.content-div')
            // ContentDom.innerHTML = "/page3"
            // history.replaceState({}, null, "/page1")
            // console.log(history);
        })
        const hash = document.getElementById("hash")
        hash.addEventListener("click", () => {
            window.location.hash = "#/page1"
        })

    </script>
</body>

</html>
```



## `React`简单历史路由跳转

1. 监听路由`Hooks`

   ```typescript
   import { useState, useLayoutEffect } from 'react'
   
   const useHistoryRoute = () => {
   
       const [route, setRoute] = useState<string>('/')
       const [routeData, setRouteData] = useState<object | null>(null)
   
       useLayoutEffect(() => {
           setRoute(window.location.hash)
   
           window.addEventListener('popstate', (event) => {
               setRoute(event.state?.path || window.location.pathname)
               setRouteData(event.state?.data || null)
           })
   
           return () => {
               window.removeEventListener('popstate', () => {})
           }
       }, [])
   
       return [route, routeData]
   }
   export default useHistoryRoute
   
   ```

2. 跳转路由`Hooks`

   ```typescript
   /**
    * @description 自定义历史路由跳转方法
    */
   const useHistoryRouter = () => {
       /**
        * @description 创建一个路由对象，并返回给外部使用
        * @tips 使用Hooks 闭包函数（IIFE），每次返回的都是同一个 router 对象
        * @extra 如需继续完善，建议增加useSreach()、useParams()等方法
        */
       const router = (() => {
           const push = (path: string, data: Record<string, unknown> | null = null) => {
               if (window.location.pathname === path) {
                   // TODO 对比参数是否一致，一致则不进行跳转
                   // 如若不对比参数，则建议将 data 拼接至 path，本示例仅作简单使用，如有需要请另写
                   return
               }
   
               window.history.pushState(data, '', path)
               const popStateEvent = new PopStateEvent('popstate', { state: { path, data } })
               window.dispatchEvent(popStateEvent)
           }
   
           const replace = (path: string, data: Record<string, unknown> | null = null) => {
               if (window.location.pathname === path) {
                   // TODO 对比参数是否一致，一致则不进行跳转
                   // 如若不对比参数，则建议将 data 拼接至 path，本示例仅作简单使用，如有需要请另写
                   return
               }
   
               window.history.replaceState(data, '', path)
               const popStateEvent = new PopStateEvent('popstate', { state: { path, data } })
               window.dispatchEvent(popStateEvent)
           }
   
           const go = (delta: number = 1) => {
               window.history.go(delta)
           }
   
           const forward = () => {
               go()
           }
   
           const back = () => {
               window.history.back()
           }
   
           return {
               push,
               replace,
               go,
               forward,
               back,
           }
       })()
   
       return router
   }
   
   export default useHistoryRouter
   
   ```
