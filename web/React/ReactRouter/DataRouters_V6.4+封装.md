# 文件结构

```tsx
1. src/router/index.tsx
2. src/router/router.tsx

3.src/App.tsx
4.src/components/Loading/Loading.tsx
```



## 1.`router.tsx`自定义路由

```tsx
import { redirect, Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

export type RouteConfig = RouteObject & {
    children?: RouteConfig[];
    meta?: Record<string | number | symbol, unknown>;
}

export const routes: RouteConfig[] = [
    {
        path: '/',
        lazy: async () => {
            const Home = (await import('@/pages/Home/Home')).default
            // const RedirectCom = () => (<><Home/><Navigate to="/home" replace /></>)   // 重定向
            return { Component: Home }
        },
        meta: {
            auth: false,
        },
    },
    {
        path: '*',
        lazy: async () => {
            const NotFound = (await import('@/pages/NotFound/NotFound')).default
            return { Component: NotFound }
        },
        meta: {
            title: 'notfound',
            auth: false,
        },
    },
]

```



## 2.`index.tsx`制作 App 路由组件

把`AppRouter`组件暴露给`App.tsx`使用

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom'
import type {
    RouteObject,
    LoaderFunction,
    LazyRouteFunction,
    NonIndexRouteObject,
    LoaderFunctionArgs,
} from 'react-router-dom'

import store from '@/store/store'
import { routes } from './router'
import type { RouteConfig } from './types'

import Loading from '@/components/Loading/Loading'

// 检查是否是空对象 {}
const isEmptyObject = (obj: any) =>
    obj !== null &&
    typeof obj === 'object' &&
    Object.getPrototypeOf(obj) === Object.prototype &&
    Object.keys(obj).length === 0

/**
 * @description 创建公共 loader 函数
 * @param route 路由配置对象
 * @returns { LoaderFunction }
 */
const createPublicLoader = (route: RouteConfig): LoaderFunction => (args: LoaderFunctionArgs<any>) => {
    // 公共路由守卫
    const token = store.getState().user.userInfo.token
    if (!token && route.meta?.auth) {
        throw redirect('/login')
    }
    document.title = (route.meta?.title as string) || 'react'
    // 功能正常返回 null
    return null
}

const createPublicLazy = (route: RouteConfig): LazyRouteFunction<RouteObject> => async () => {
    const lazy: RouteObject = await route.lazy?.() ?? {}
    const lazyOrRouteLoader = lazy.loader ?? route.loader    // lazy.loader 优先级更高
    // 获取公共loader
    const publicLoader = createPublicLoader(route)

    /**
     * @description 合并 公共loader 与自定义 loader
     * 默认公共 loader 优先级高，因为公共 loader 可能处理未登录重定向的问题
     * 有需要可自行修改
     */
    const loader: LoaderFunction = lazyOrRouteLoader ? async (args: LoaderFunctionArgs<any>) => {
        const publicDataFunctionValue = await publicLoader(args)

        if (publicDataFunctionValue && !isEmptyObject(publicDataFunctionValue)) {
            // 当 publicLoader 不返回 null | {}
            return publicDataFunctionValue
        } else {
            const loaderDataFunctionValue = await (lazyOrRouteLoader as LoaderFunction)(args)
            return loaderDataFunctionValue
        }
    } : publicLoader

    return {
        ...lazy,
        loader,
    }
}

const createRoutes = (routes: RouteConfig[]): RouteObject[] => routes.map((route): RouteObject => ({
    path: route.path ?? undefined,
    id: route.id ?? undefined,
    index: (route.index as NonIndexRouteObject['index']) ?? undefined,
    element: route.element ?? undefined,
    loader: route.loader ?? undefined,
    lazy: createPublicLazy(route),
    errorElement: route.errorElement ?? undefined,
    children: route.children ? createRoutes(route.children) : undefined,
}))

// 一定要这个赋值步骤，避免重复创建 Router 实例
const router = createHashRouter(createRoutes(routes))

/**
 * 禁止使用<RouterProvider router={createHashRouter(createRoutes(routes))}></RouterProvider>写法
 * AppRouter渲染时都会调用 createHashRouter(createRoutes(routes))，创建一个新的 Router 实例
 * 导致 React Router 的内部状态（如导航历史、加载状态等）被重置，进而引发页面闪烁、导航失败等问题
 */
const AppRouter: React.FC = () => (<RouterProvider router={router} fallbackElement={<Loading />} />)

export default AppRouter

```

旧版：

```tsx
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom'
import type { RouteObject, LoaderFunction, NonIndexRouteObject } from 'react-router-dom'

import store from '@/store/store'
import { routes } from './router'
import type { RouteConfig } from './router'

import Loading from '@/components/Loading/Loading'

const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
    return routes.map((route): RouteObject => {
        const loader: LoaderFunction = () => {
            // 公共路由守卫
            const token = store.getState().user.userInfo.token
            if (!token && route.meta?.auth) {
                throw redirect("/login")
            }
            document.title = (route.meta?.title as string) || "react"
            return {}
        }
        return {
            path: route.path ?? undefined,
            id: route.id ?? undefined,
            index: (route.index as NonIndexRouteObject['index']) ?? undefined,
            element: route.element ?? undefined,
            loader: route.loader ?? loader,
            lazy: route.lazy ?? undefined,
            errorElement: route.errorElement ?? undefined,
            children: route.children ? createRoutes(route.children) : undefined,
        }
    })
}

// 一定要这个赋值步骤，避免重复创建 Router 实例
const router = createHashRouter(createRoutes(routes))

/**
 * 禁止使用<RouterProvider router={createHashRouter(createRoutes(routes))}></RouterProvider>写法
 * AppRouter渲染时都会调用 createHashRouter(createRoutes(routes))，创建一个新的 Router 实例
 * 导致 React Router 的内部状态（如导航历史、加载状态等）被重置，进而引发页面闪烁、导航失败等问题
 */
const AppRouter: React.FC = () => (<RouterProvider router={router} fallbackElement={<Loading />} />)

export default AppRouter

```



## 3.`App.tsx`使用路由组件

```tsx
const App: React.FC = () => {

    return (
        <div id="app">
            <AppRouter></AppRouter>
        </div>
    )
}

export default App

```



## 4.main.tsx根文件

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import store from './store/store'
import './styles/tailwind.css'

createRoot(document.getElementById('root')!)
.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)

```

