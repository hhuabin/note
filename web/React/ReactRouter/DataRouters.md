# 数据路由

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
}
```



### `loader`数据预加载

在组件加载之前请求数据，一般为`get`方法

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
       const url = new URL(request.url);
       const searchTerm = url.searchParams.get("q");
       const userId = params.id;
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
   
   




### `action`表单提交

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



### `lazy`懒加载和嵌套路由

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

#### 重定向

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



### `index`默认匹配

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



### `errorElement`错误边界

```tsx
errorElement: <ErrorPage />, // 错误处理
```

