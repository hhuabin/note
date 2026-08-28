# 文件结构

```tsx
1. src/router/index.tsx
2. src/router/router.tsx

3.src/App.tsx
4.src/components/Loading/Loading.tsx
```



## 1.`router.tsx`自定义路由

1. `React18`终极版本：使用 `<RootRouteLayout />` 做路由守卫，并且使用 `<AuthGuard />` 组件做登录鉴权

    ```tsx
    /**
     * @Author: bin
     * @Date: 2025-04-16 14:12:24
     * @LastEditors: bin
     * @LastEditTime: 2026-05-13 11:15:35
     */
    import { redirect, Navigate } from 'react-router-dom'
    import type { RouteConfig } from './types'
    
    // 根组件，无需懒加载
    import RootRouteLayout from '@/layout/RootRouteLayout'
    // 错误组件，无需懒加载
    import ErrorElement from '@/components/ErrorElement/ErrorElement'
    
    import { mobileRoute } from './mobileRoute'
    
    export const routes: RouteConfig[] = [
        {
            path: '/',
            Component: RootRouteLayout,
            errorElement: <ErrorElement />,        // 统一错误处理
            children: [
                {
                    // index: true,         // index 不能嵌套，children 中有 index 即可
                    lazy: async () => {
                        const { default: Home } = await import('@/pages/Home/Home')
                        // const RedirectCom = () => (<><Home/><Navigate to='/login' replace /></>)   // 重定向(不可重定向至子路由，子路由使用 index)
                        return { Component: Home }
                    },
                    children: [
                        {
                            index: true,
                            element: <Navigate to='introduce' replace />,
                        },
                        {
                            path: 'introduce',
                            lazy: async () => {
                                const { default: Introduce } = await import('@/pages/Introduce/Introduce')
                                return { Component: Introduce }
                            },
                            handle: {},
                        },
                    ],
                },
                {
                    // 切记该路由绝对不能放进 鉴权路由下
                    path: 'login',
                    lazy: async () => {
                        const { default: Login } = await import('@/pages/Login/Login')
                        return { Component: Login }
                    },
                    handle: {
                        title: 'login',
                    },
                },
                {
                    // 需要登录的路由放进鉴权路由下
                    lazy: async () => {
                        const { default: AuthGuard } = await import('@/router/guard/AuthGuard')
                        return { Component: AuthGuard }
                    },
                    children: [
                        {
                            path: 'cssmotion',
                            lazy: async () => {
                                const { default: CSSMotion } = await import('@/pages/CSSMotion/CSSMotion')
                                return { Component: CSSMotion }
                            },
                            handle: {
                                title: 'cssmotion',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '*',
            lazy: async () => {
                const { default: NotFound } = await import('@/pages/NotFound/NotFound')
                return { Component: NotFound }
            },
        },
    ]
    
    ```

2. `loader`版本，过期了

    ```tsx
    import { redirect, Navigate, type RouteObject } from 'react-router-dom'
    
    export const routes: RouteObject[] = [
        {
            path: '/',
            errorElement: <ErrorElement />,        // 统一错误处理
            lazy: async () => {
                const Home = (await import('@/pages/Home/Home')).default
                // const RedirectCom = () => (<><Home/><Navigate to="/home" replace /></>)   // 重定向
                return { Component: Home }
            },
            handle: {
                auth: false,
            },
        },
        {
            path: '*',
            lazy: async () => {
                const NotFound = (await import('@/pages/NotFound/NotFound')).default
                return { Component: NotFound }
            },
            handle: {
                title: 'notfound',
                auth: false,
            },
        },
    ]
    
    ```



## 2.`index.tsx`制作 App 路由组件

把`AppRouter`组件暴露给`App.tsx`使用

### 使用 `<RootRouteLayout />` 做路由守卫

使用 `<AuthGuard />` 组件做登录鉴权

```tsx
/**
 * @Author: bin
 * @Date: 2025-04-16 14:12:24
 * @LastEditors: bin
 * @LastEditTime: 2026-04-15 17:54:33
 */
import { createHashRouter, RouterProvider } from 'react-router-dom'

import { routes } from './mainRoutes'

import Loading from '@/components/Loading/Loading'

// 一定要这个赋值步骤，避免重复创建 Router 实例
// eslint-disable-next-line react-refresh/only-export-components
export const router = createHashRouter(
    routes,
    {
        basename: '/',
    },
)

/**
 * 禁止使用<RouterProvider router={createHashRouter(routes)}></RouterProvider>写法
 * AppRouter渲染时都会调用 createHashRouter(routes)，创建一个新的 Router 实例
 * 导致 React Router 的内部状态（如导航历史、加载状态等）被重置，进而引发页面闪烁、导航失败等问题
 */
const AppRouter: React.FC = () => (
    <RouterProvider router={router} fallbackElement={<Loading />}></RouterProvider>
)

export default AppRouter

```



### 使用公共 `loader` 做路由守卫

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
const createPublicLoader = (route: RouteObject): LoaderFunction => (loaderFunctionArgs: LoaderFunctionArgs<any>) => {
    // 登录路由守卫
    const { isLogin } = authStore.getAuthState()
    if (!isLogin && route.handle?.auth) {
        const url = new URL(loaderFunctionArgs.request.url)
        const redirectTo = url.pathname + url.search
        // 跳转到登录页面，并携带当前页面链接
        throw redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`)
    }
    document.title = (route.handle?.title as string) || 'react'
    // 功能正常返回 null
    return null
}

const createPublicLazy = (route: RouteObject): LazyRouteFunction<RouteObject> => async () => {
    const lazy: RouteObject = await route.lazy?.() ?? {}
    const lazyOrRouteLoader = lazy.loader ?? route.loader    // lazy.loader 优先级更高
    // 获取公共loader
    const publicLoader = createPublicLoader(route)

    /**
     * @description 合并 公共 loader 与自定义 loader
     */
    const loader: LoaderFunction = lazyOrRouteLoader ? async (args: LoaderFunctionArgs<any>) => {
        // 当 lazy.loader ?? route.loader 有值，也要执行 publicLoader 的逻辑
        const publicDataFunctionValue = await publicLoader(args)

        // 默认公共 loader 优先级高，因为公共 loader 可能处理未登录重定向的问题，有需要可自行修改
        if (publicDataFunctionValue && !isEmptyObject(publicDataFunctionValue)) {
            // 当 publicLoader 不返回 null | {} 时执行，兼容未登录重定向等返回
            return publicDataFunctionValue
        } else {
            if (lazyOrRouteLoader === true) return lazyOrRouteLoader
            const loaderDataFunctionValue = await lazyOrRouteLoader(args)
            return loaderDataFunctionValue
        }
    } : publicLoader

    return {
        ...lazy,
        loader,
    }
}

const createRoutes = (routes: RouteObject[]): RouteObject[] => routes.map((route): RouteObject => ({
    path: route.path ?? undefined,
    id: route.id ?? undefined,
    index: (route.index as NonIndexRouteObject['index']) ?? undefined,
    element: route.element ?? undefined,
    loader: route.loader ?? undefined,
    lazy: createPublicLazy(route),
    handle: route.handle ?? undefined,
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



## 4.`main.tsx` 根文件

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

