全局前置路由守卫，**基于 React-Router V6.4前**

需要注意的是，React Router v6 的设计哲学是将路由和**导航逻辑尽量放在组件内部处理**，而不是在外部使用全局的路由守卫。因此，它没有直接提供类似于 `beforeNavigate` 的全局钩子或事件。你需要在组件内部实现逻辑来控制导航行为。

# 原理

用一个 GuardedRoute 组件将每个路由组件包裹住，**将各个路由组件的公共代码（如登录验证等）抽到 GuardedRoute 中**

优点：仅是将公共代码抽离出各个路由组件，并没有性能上的提升

缺点：每个路由组件（包括子级路由）都会套上一层 GuardedRoute 组件，致使 GuardedRoute 才是真正的路由组件。增加了组件层数

提供一个优化方向：干掉 GuardedRoute 组件。将**公共代码封装成函数**，在每个路由组件加载时执行即可。



## 原理教学：

1. `routerConfig.tsx` 中 `export routes` 参考了 `vue-router` 的路由集中管理，用于生成 `react-router` 的路由列表。
2. 在 `App.tsx` 中利用 `RenderRoutes` 生成有 **GuardedRoute 包裹**的路由列表
3. 书写 `GuardedRoute.tsx` 路由守卫文件。



## 书写教学：

文件结构

```typescript
1. src/router/lazyComponents.ts   // ts 文件
2. src/router/routerConfig.tsx
3. src/router/RenderRoutes.tsx
4. src/router/RouteGuard.tsx

5.src/App.tsx
6.src/components/Loading/Loading.tsx
```

1. 在`pages/`下新建`Home`、`NotFound`等组件
2. 在`components/`下建立`Loading`组件



### 1.`lazyComponents.ts`懒加载路由组件

```typescript
import { lazy } from 'react'

export const Home = lazy(() => import('@/pages/Home/Home'))
export const NotFound = lazy(() => import('@/pages/NotFound/NotFound'))

```



### 2.`routerConfig.tsx`引入路由文件

```tsx
import { Home, NotFound } from './lazyComponents'

export type RouteRecordRaw = {
    path: string;
    element: JSX.Element;
    name?: string | symbol;
    redirect?: string;
    // alias?: string | string[];
    children?: RouteRecordRaw[];
    meta?: Record<string | number | symbol, unknown>;
}

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "home",
        element: <Home />,
        // element: (<><Home/><Navigate to="/home/:id" replace/></>),
        meta: {
            needAuth: false,
        },
        children: [],
    },
    {
        path: '*',
        name: "notfound",
        element: <NotFound />,
        meta: {
            title: "notfound",
            needAuth: false,
        },
    },
]

```



### 3.`RenderRoutes.tsx`渲染路由

```tsx
import { Suspense } from "react"
import { Routes, Route } from 'react-router-dom'

import Loading from "@/components/Loading/Loading"
import { routes } from "./routerConfig"
import type { RouteRecordRaw } from "./routerConfig"
import GuardedRoute from "./RouteGuard"

const RenderRoutes: React.FC = () => {

    const createRoutes = (routes: Array<RouteRecordRaw>) => {
        return routes.map((item) => {
            return (
                <Route path={item.path} element={
                    <GuardedRoute router={item}></GuardedRoute>
                } key={item.path}>
                    {item?.children && createRoutes(item.children)}
                </Route>
            )
        })
    }

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {createRoutes(routes)}
            </Routes>
        </Suspense>
    )
}

export default RenderRoutes

```

这一步旨在利用 `createRoutes`方法生成以下的列表

```tsx
<div id="app">
    <Suspense fallback={<Loading/>}>
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route path="home/:id" element={<HomeComponent/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Suspense>
</div>
```



### 4. `RouteGuard.tsx`路由守卫

```tsx
import { useSelector } from 'react-redux'
import { useLocation, useMatch, Navigate } from 'react-router-dom'

import type { RootState } from '@/store/store'
import type { RouteRecordRaw } from "@/router/routerConfig"

// 是否需要重定向
const redirect = (router: RouteRecordRaw): JSX.Element => {
    if (router.redirect) {
        return (
            <>
                {router.element}
                <Navigate to={router.redirect} replace />
            </>
        )
    }
    return router.element
}

const GuardedRoute: React.FC<{ router: RouteRecordRaw }> = ({ router }) => {
    const location = useLocation()
    const match = useMatch(router.path)
    const token = useSelector((state: RootState) => state.user.userInfo.token)

    // 没有 match 即不是目标路由，可能是父路由。无需处理往下的逻辑
    if (!match) return router.element
    // 处理重定向问题
    let element = redirect(router)

    // 登录验证
    if (token || !router.meta?.needAuth) {
        document.title = (router.meta?.title as string) || "React"
    } else {
        // from 可以在 login 的 location.state 中接收，以便登陆后直接返回至本页
        element = <Navigate to="/" state={{ from: location }} />
    }

    return element
}

export default GuardedRoute

```



### 5.`main.tsx`引入`BrowserRouter/HashRouter`路由配置

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './store/store'
import App from './App.tsx'
import './styles/tailwind.css'

createRoot(document.getElementById('root')!)
.render(
    <StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </StrictMode>,
)

```



### 6.`App.tsx`加载整个路由配置

```tsx
import { useEffect } from 'react'

import RenderRoutes from "@/router/RenderRoutes"
import "./App.less"

const App: React.FC = () => {

    return (
        <div id="app">
            <RenderRoutes></RenderRoutes>
        </div>
    )
}

export default App

```







PS：除了Loading组件外，这里的组件都是异步组件，react 第一次加载异步组组件的时候，异步组组件会执行两次。这是正常现象。

