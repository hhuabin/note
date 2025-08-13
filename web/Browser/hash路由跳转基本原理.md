# 原理

1. 当哈希值变化会触发 `hashchange` 事件
2. 通过拦截 `hashchange` 实现页面不刷新
3. 而后改变组件渲染

```html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>hash router</title>
</head>

<body>
    <ul>
        <li><a href="#/">/</a></li>
        <li><a href="#/page1">page1</a></li>
        <li><a href="#/page2">page2</a></li>
        <div id="hash">切换哈希</div>
    </ul>
    <div class='content-div'></div>
    <script>
        /**
         * 当哈希值变化会触发 hashchange 事件
         * 通过拦截 hashchange 实现页面不刷新
         * 而后改变组件渲染
         * 即为哈希路由基本原理
         */

        class RouterClass {
            constructor() {
                this.routes = {}        // 记录路径标识符对应的cb
                this.currentUrl = ''    // 记录hash只为方便执行cb
                window.addEventListener('load', () => this.render())
                window.addEventListener('hashchange', () => this.render())
            }

            /**
             * 初始化
             */
            static init() {
                window.Router = new RouterClass()
            }

            /**
             * 注册路由和回调
             * @param path
             * @param cb 回调
             */
            route(path, cb) {
                this.routes[path] = cb || function () { }
            }

            /**
             * 记录当前hash，执行cb
             */
            render() {
                this.currentUrl = location.hash.slice(1) || '/'
                this.routes[this.currentUrl]()
            }
        }

        RouterClass.init()
        const ContentDom = document.querySelector('.content-div')
        const changeContent = content => ContentDom.innerHTML = content

        Router.route('/', () => changeContent('默认页面'))
        Router.route('/page1', () => changeContent('page1页面'))
        Router.route('/page2', () => changeContent('page2页面'))

        const hash = document.getElementById("hash")
        hash.addEventListener("click", () => {
            window.location.hash = "#/page1"
        })

    </script>
</body>

</html>
```





## `React`简单哈希路由跳转

1. 监听路由`Hooks`

   ```typescript
   import { useState, useLayoutEffect } from 'react'
   
   const useHashRoute = () => {
   
       const [route, setRoute] = useState<string>('/')
       const [routeData, setRouteData] = useState<object | null>(null)
   
       useLayoutEffect(() => {
           const hash = window.location.hash.slice(1).split('?')[0]
           setRoute(hash || '/')
   
           window.addEventListener('hashchange', () => {
               const newHash = window.location.hash.slice(1).split('?')[0]
               setRoute(newHash || '/')
           })
   
           return () => {
               window.removeEventListener('hashchange ', () => {})
           }
       }, [])
   
       return [route, routeData]
   }
   export default useHashRoute
   ```

2. 跳转路由`Hooks`

   ```typescript
   /**
    * @description 自定义历史路由跳转方法
    */
   const useHashRouter = () => {
       /**
        * @description 创建一个路由对象，并返回给外部使用
        * @tips 使用Hooks 闭包函数（IIFE），每次返回的都是同一个 router 对象
        */
       const router = (() => {
           const push = (path: string, data: Record<string, unknown> | null = null) => {
               if (window.location.hash === path) {
                   // TODO 对比参数是否一致，一致则不进行跳转
                   // 如若不对比参数，则建议将 data 拼接至 path，本示例仅作简单使用，如有需要请另写
                   return
               }
   
               window.location.hash = '#' + path
           }
   
           const replace = (path: string, data: Record<string, unknown> | null = null) => {
               if (window.location.hash === path) {
                   // TODO 对比参数是否一致，一致则不进行跳转
                   // 如若不对比参数，则建议将 data 拼接至 path，本示例仅作简单使用，如有需要请另写
                   return
               }
   
               window.history.replaceState(null, '', `#${path}`)
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
   
   export default useHashRouter
   ```

   

