# 数据路由(`Route`)

[reactrouter](https://reactrouter.com/home "reactrouter")、[Route ](https://reactrouter.com/api/components/Route "Route ")



## Api介绍

常用`RouteObject`属性

```typescript
{
    path?: string;
    id?: string;
    element?: React.ReactNode | null;
    loader?: LoaderFunction | boolean;
    lazy?: LazyRouteFunction<RouteObject>;
    errorElement?: React.ReactNode | null;
    children?: undefined;
    shouldRevalidate?: (args: ShouldRevalidateFunctionArgs): boolean;
}
```



## 1.`loader` 数据预加载

在**组件加载之前请求数据**，一般为`get`方法

1. 重定向及向组件发送数据

   ```tsx
   // router.ts
   export const router = createBrowserRouter([
       {
           path: "/user/:id",
           element: <UserProfile />,
           loader: async ({ params }) => {
               // 检查用户权限
               if (!isAuthenticated()) {
                   // Promise中要用resolve而不是return
                   return redirect("/login")  // 重定向到登录页
               }
               const res = await fetch(`/api/users/${params.id}`)
               if (!res.ok) throw new Error("User not found")
               return res.json();
           },
           errorElement: <ErrorBoundary /> // 错误边界组件
       }
   ]);
   
   // UserProfile.tsx
   import { useLoaderData } from "react-router-dom"
   
   function UserProfile() {
       const userData = useLoaderData(); // 获取 loader 返回的数据
       return <div>{userData.name}</div>
   }
   ```

   ==**`loader`的`throw redirect("")`不可重定向值子路由，会造成逻辑死循环问题**==，重定向至子路由可以使用`element`或者`lazy`

   建议`loader`默认返回`{}`。当组件不依赖`useLoaderData`时候可以返回`null`但是不建议如此

2. `loader`参数解析

   `loader` 接收包含以下属性的对象参数：

   | 属性      | 类型           | 说明                                     |
   | :-------- | :------------- | :--------------------------------------- |
   | `request` | Request        | 当前请求对象（包含 URL、headers 等信息） |
   | `params`  | Params<string> | 动态路由参数（如 `/user/:id` 中的 `id`） |
   | `context` | any            | 通过 `useMatches` 传递的上下文数据       |

   ```tsx
   loader: async ({ request, params, context }) => {
       const url = new URL(request.url)
       const searchTerm = url.searchParams.get('tetn')
       const userId = params.id
       return searchUsers(searchTerm, userId);
   }
   ```
   
   示例：
   
   ```typescript
   // loader.ts
   import type { LoaderFunction } from 'react-router-dom'
   
   import { Toast } from 'antd-mobile'
   
   import store from '@/store/store'
   
   const loader: LoaderFunction = ({ request, params, context }) => {
       console.log(request, params, context)
       const identityInfo = store.getState().user.identityInfo
       return new Promise((resolve) => {
           reqEducationInfo({
               stuName: identityInfo.stuName,
           })
           .then((res) => {
               resolve({
                   response: res,
               })
           })
           .catch((error) => {
               Toast.show({
                   content: error.data.err_msg,
                   position: 'top',
               })
               resolve({})
           })
       })
   }
   
   export default loader
   ```
   
   ```typescript
   // 组件函数
   import { useLoaderData } from 'react-router-dom'
   
   import type { AxiosResponse } from 'axios'
   
   const ApplyStudentInfo: React.FC = () => {
       const loaderData = useLoaderData() as {response: AxiosResponse<string>}
   }
   ```
   
3. 永远要结束（`return` / `throw redirect`），**不允许 `pending`**



## `loader` 的职责

`loader`的职责是：`loader`是等待接口加载完成

- **页面进入前准备数据**
- 控制页面是否可渲染

**不可使用 `loader` 当成骨架屏**显示，造成误用滥用；`loader`也不是全局 `loading` 控制器，`Suspense` 才是等组件加载完成。**大量滥用 `loader` 会让用户觉得加载困难、非常卡、体验极差**

`loader` 的“正确使用边界”（核心）吗，可以用下面这条 **判断标准** 来决定“要不要用 loader”：

> **没有这些数据，这个页面“压根没法渲染”？**
> 👉 是 → 用 `loader`
> 👉 否 → 不用 `loader`
> 👉 只有跳转逻辑的按钮 → 可用 `loader`，还有其他逻辑的按钮不建议使用`loader`，极易多次点击造成函数重复执行。

---

#### 1.1 :heavy_check_mark: 适合放进 loader 的数据

- **详情页**的主数据（订单详情、用户信息）-> 没有订单信息根本无从展示
- 页面首屏**必须展示的数据**
- 权限 / **鉴权结果**（是否能进这个路由）
- 路由级配置（tab、权限点）

```typescript
// 典型正确用法，锚定网页链接
export const orderDetailLoader = ({ params }) => {
    return new Promise((resolve, reject) => {
        fetchOrderDetail(params.id)
        .then(() => {
            resolve({ data: {} })
        })
        .catch(() => {
            resolve({})
        })
    })
}
```



#### 1.2 :x: 不适合放进 loader 的东西

- 表单提交
- 次要模块数据
- 用户点击触发的数据
- loading 状态
- 轮询 / 长连接
- 埋点 / 日志

```typescript
// ❌ 这是典型误用
export const loader = async () => {
	setGlobalLoading(true) // 不该出现在 loader
}
```

```typescript
// ❌ 这更是典型滥用
export const routes: RouteConfig[] = [
    {
        // 包裹全局，当成了全局 loading -> 滥用
        lazy: async () => {
            const { default: GlobalLoadingLayout } = await import('@/pages/GlobalLoadingLayout')
            return { Component: GlobalLoadingLayout }
        },
        children: [
            {
                path: '/',
                lazy: async () => {
                    const { default: Home } = await import('@/pages/Home/Home')
                    return {
                        Component: Home,
                        // loader: homeLoader,
                    }
                },
                meta: { title: '学生卡服务' },
            },
		],
    },
]
```

```typescript
/**
 * @Author: bin
 * @Date: 2025-04-16 18:21:04
 * @LastEditors: bin
 * @LastEditTime: 2025-12-26 14:11:36
 */
import { Outlet, useNavigation } from 'react-router-dom'

import Loading from '@/components/Loading/Loading'

// TODO 该层移动至最外层
const GlobalLoadingLayout: React.FC = () => {

    const navigation = useNavigation()

    if (navigation.state === 'loading') {
        return <Loading />
    } else {
        return <Outlet />
    }
}

export default GlobalLoadingLayout

```



#### 1.3 `loader` 注意事项

##### 1.3.1 页面滞留问题

使用 `loader` 之后，若 `navigation.state === 'loading'` ，`loader` 迟迟没有返回（比如网络慢），**页面将会一直停留在跳转之前的页面**，一定要做好点击限制。如重复提交订单等

```typescript
/**
 * @Author: bin
 * @Date: 2025-04-16 18:37:07
 * @LastEditors: bin
 * @LastEditTime: 2025-12-30 16:18:05
 */
import { Outlet, useNavigation } from 'react-router-dom'

import Skeleton from '@/components/Skeleton/Skeleton'

/**
 * 该功能尚处于 测试阶段
 * @description 全局默认骨架屏，可以结合 loader 使用。
 * GlobalSkeletonLayout + loader 可以在 router 路由中包裹着订单详情等组件
 */
const GlobalSkeletonLayout: React.FC = () => {

    const navigation = useNavigation()

    if (navigation.state === 'loading') {
        return <Skeleton />
    } else {
        return <Outlet />
    }
}

export default GlobalSkeletonLayout

```

##### 1.3.2 页面滞留导致的多次连续点击的问题

1. 用户多次点击 ”订单详情“，到底会发生什么？

   ```typescript
   navigate(`/order/${id}`)
   ```

   在极短时间内点击 3 次。React Router 内部行为是：

   1. 第一次点击
      - 开始执行该路由的 `loader`
      - 发起请求 A
   2. 第二次、第三次点击
      - 路由地址**没有变化**
      - **不会再次触发 loader**
      - 不会重复请求

   👉 **默认就是防抖的**

2. ⚠️ 情况 2：`navigate` 时强制 `revalidate`

   ```typescript
   navigate('/order/1', { replace: true })
   ```

   主动触发 loader 重新执行

   修复方式

   1. 禁止点击

      ```tsx
      const navigation = useNavigation()
      
      <Button
          loading={navigation.state === 'loading'}
          disabled={navigation.state === 'loading'}
          onClick={() => navigate(`/order/${id}`)}
      >
        查看详情
      </Button>
      ```

   2. 新导航发生时，上一个请求自动取消

      ```typescript
      export const loader = async ({ params, request }) => {
          const signal = request.signal
      
          const res = await fetch(`/api/order/${params.id}`, { signal })
          return res.json()
      }
      ```



##### 1.3.3 loader的返回问题

```typescript
export const orderDetailLoader = ({ params }) => {
    return new Promise((resolve, reject) => {
        fetchOrderDetail(params.id)
        .then(() => {
            resolve({ data: {} })
        })
        .catch(() => {
            resolve({})
        })
    })
}
```

对于该 `loader`，`resolve`就会正常进入下一个页面，`reject` 或 `throw` 则会进入 `errorElement`。

一般我们建议，不管接口成功还是失败，都进入下一页。哪怕请求失败，也应该返回 **空列表 + 提示**

不建议返回 `new Promise(() => {})`；`loader` 永远 `pending`，路由被“卡死”，后续导航异常。




## 2.`action` 表单提交

在 React Router v6.4+ 的 Data Mode 中，`action` 函数始终与当前路由关联。当用户通过 `<Form>` 组件或 `useSubmit` 钩子提交数据时，React Router 会根据当前匹配的路由路径调用该路由配置中的 `action` 函数

```tsx
const router = createBrowserRouter([
    {
        path: "/profile",
        element: <ProfilePage />,
        action: async ({ request }) => {
            const formData = await request.formData();
            // 处理表单数据
        },
    },
])
```

当用户在 `/profile` 页面提交表单时，React Router 会调用与 `/profile` 路由关联的 `action` 函数来处理提交的数据



## 3.`lazy` 懒加载和嵌套路由

`lazy` 可以返回`loader`和`errorElement`等

**`lazy` 强于 `React.lazy() + loader`**

```tsx
lazy: async () => {
    const Home = (await import('@/pages/Home/Home')).default
    const RedirectCom = () => (<><Home/><Navigate to="/home" replace /></>)   // 重定向
    const { loader } = await import('./pages/Blog/loader')
    return {
        Component: Home,
        loader,
    }
},
```

`lazy()` 是异步加载模块，允许你**动态返回**一整套 `Component`、`loader`、`action`、`ErrorBoundary`

所以如果你定义了 `lazy`，它会**接管所有配置**，会**覆盖**掉`element`、`loader`等，若返回了`loader`，原来的`loader`也不再被调用

#### 3.1重定向

```tsx
{
    path: '/',
    // element: (<><Home/><Navigate to="/home" replace /></>),
    lazy: async () => {
        const Home = (await import('@/pages/Home/Home')).default
        const RedirectCom = () => (<><Home/><Navigate to="/home" replace /></>)   // 重定向
        return {
            Component: RedirectCom,
        }
    },
    children: [
        {
            path: 'home',
            lazy: async () => {
                const HomeComponent = (await import('@/pages/NotFound/NotFound')).default
                return {
                    Component: HomeComponent,
                }
            },
        },
    ],
},
```



## 4.`index` 默认匹配

1. 默认匹配子路由，使用 `children` + `index: true` + `Navigate`

   ```tsx
   {
       path: '/parent',
       lazy: async () => {
           const { default: ParentLayout } = await import('@/pages/parent/ParentLayout')
           return { Component: ParentLayout }
       },
       children: [
           {
               index: true,
               element: <Navigate to="children" replace />,
           },
           {
               path: 'children',
               lazy: async () => {
                   const { default: Children } = await import('@/pages/children/Children/Children')
                   return { Component: Children }
               },
           },
       ],
   },
   ```



## 5.`errorElement` 错误边界

```tsx
errorElement: <ErrorPage />, // 错误处理
```



## 6.`shouldRevalidate` 

当路由发生变化时，要不要重新执行 `loader`，默认值：`true`

由于默认会执行两次 `loader`，故而在 `loader` 的请求中，不建议使用 `message.loading()` 提示

```typescript
{
    path: '/home';
    element: <Home/>;
    shouldRevalidate: () => true;
}
```



### 触发 `Revalidate` 的场景统计（`loader` 要不要执行两次）

1. 同路由（URL 看起来没变）仍然会触发 Revalidate 的情况
   1. 父路由发生 `revalidate`。`navigate('/home')` 但是 `/home` 直接重定向到子路由 `/home/about` 这种情况下，`/home/about` 的 `loader` 会执行两次
   2. 重复点击路由跳转按钮。多次触发 `navigate('/home')`， `loader` 会执行多次，但是路由只会跳转一次（`DataRoute`保护机制）
   3. `HashRouter` 的 `hash` 变化（即使 path 相同）。`#/card/cardlist → #/card/cardlist`
2. 不同路由（URL 发生变化）一定触发 Revalidate 的情况
   1. `pathname` 变化。`/card/cardlist → /card/detail`
   2. `params` 变化。`/detail/1 → /detail/2`
   3. `search` 变化。`/list?page=1 → /list?page=2`

除常见场景外，还有其他的一些场景，不一一列举。想要阻止就`shouldRevalidate: () => false;`。但是，不建议吧
