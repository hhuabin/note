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



### 数据预加载（`loader`）

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
                   throw redirect("/login")  // 重定向到登录页
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

   



### 懒加载（`lazy`）和嵌套路由

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

所以如果你定义了 `lazy`，它会**接管所有配置**，会**覆盖**掉`element`、`loader`等

##### 重定向

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





### 错误边界（`errorElement`）

```tsx
errorElement: <ErrorPage />, // 错误处理
```

