全局前置路由守卫，**基于 React-Router 6**

需要注意的是，React Router v6 的设计哲学是将路由和**导航逻辑尽量放在组件内部处理**，而不是在外部使用全局的路由守卫。因此，它没有直接提供类似于 `beforeNavigate` 的全局钩子或事件。你需要在组件内部实现逻辑来控制导航行为。

# 原理

用一个 GuardedRoute 组件将每个路由组件包裹住，**将各个路由组件的公共代码（如登录验证等）抽到 GuardedRoute 中**

优点：仅是将公共代码抽离出各个路由组件，并没有性能上的提升

缺点：每个路由组件（包括子级路由）都会套上一层 GuardedRoute 组件，致使 GuardedRoute 才是真正的路由组件。增加了组件层数

提供一个优化方向：干掉 GuardedRoute 组件。将**公共代码封装成函数**，在每个路由组件加载时执行即可。



## 原理教学：

1. index.tsx 中 export routes 参考了 vue-router 的路由集中管理，用于生成react-router的路由列表。
2. 在 App.tsx 中利用 routes 生成有 **GuardedRoute 包裹**的路由列表
3. 书写 GuardedRoute.tsx 路由守卫文件。



## 书写教学：

在/pages下新建Loading、Home、Login、NotFound等组件

1. 新建路由信息文件 /src/router/index.tsx

   ```tsx
   import { lazy } from "react";
   import { Navigate } from "react-router-dom";
   
   const Home = lazy(() => import("@/pages/Home/Home"))
   const HomeComponent = lazy(() => import("@/pages/Home/HomeComponent/HomeComponent"))
   const Login = lazy(() => import("@/pages/Login/Login"))
   const NotFound = lazy(() => import("@/pages/NotFound/NotFound"))
   
   // import Login from "@/pages/Login/Login";
   // import NotFound from "../pages/NotFound/NotFound";
   // import Home from "../pages/Home/Home";
   // import HomeComponent from "@/pages/Home/HomeComponent/HomeComponent";
   
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
   		element: <Home/>,
   		// element: (<><Home/><Navigate to="/home/:id" replace/></>),
   		redirect: '/home/id',
   		children: [
   			{
   				path: "/home/:id",
   				name: "HomeComponent",
   				element: <HomeComponent/>,
   				meta: {
   					needAuth: true,    // 需要登录才能访问
   					title: "home",     // 标题
   				}
   			}
   		]
   	},
   	{
   		path: '/login',
   		name: "login",
   		element: <Login/>,
   		meta: {
   			title: "login",
   		}
   	},
   	{
   		path: '*',
   		name: "notfound",
   		element: <NotFound/>,
   		meta: {
   			title: "找不到该页面",
   		},
   	},
   ]
   
   ```

2. 在App.tsx中使用

   ```tsx
   import { Suspense, lazy } from "react";
   import { Routes, Route } from 'react-router-dom'
   
   import Loading from "@/pages/Loading/Loading";
   
   import { routes } from "@/router/index"
   import type { RouteRecordRaw } from "@/router/index"
   import GuardedRoute from "@/router/RouteGuard"
   
   export default function App() {
   
   	const createRoutes = (routes: Array<RouteRecordRaw>) => {
   		return routes.map((item) => {
   			return (
   				<Route path={item.path} element={
   					<GuardedRoute router={item}>
   					</GuardedRoute>
   				} key={item.path}>
   					{item?.children && createRoutes(item.children)}
   				</Route>
   			)
   		})
   	}
   
   
   	return (
   		<div id="app">
   			<Suspense fallback={<Loading/>}>
   				<Routes>
   					{createRoutes(routes)}
   				</Routes>
   			</Suspense>
   		</div>
   	)
   }
   ```

   这一步旨在利用 createRoutes 生成**类似于**以下的列表

   ```tsx
   <div id="app">
       <Suspense fallback={<Loading/>}>
           <Routes>
               <Route path="/" element={<Home/>}>
                   <Route path="home/:id" element={<HomeComponent/>}/>
               </Route>
               <Route path="/login" element={<Login/>}/>
               <Route path="*" element={<NotFound/>}/>
           </Routes>
       </Suspense>
   </div>
   ```

   

3. 书写路由守卫组件 /router/GuardedRoute.tsx

   ```tsx
   /**
    * 全局前置路由守卫
    */
   import { useSelector } from "react-redux";
   import { useLocation, useMatch, Navigate } from "react-router-dom";
   
   import type { RootState } from '@/store/store'
   import type {RouteRecordRaw} from "@/router/index"
   
   // 是否具有重定向
   const redirect = (router: RouteRecordRaw): JSX.Element => {
   	if(router.redirect) {
   		return (
   			<>
   				{router.element}
   				<Navigate to={router.redirect} replace/>
   			</>
   		)
   	}
   	return router.element
   }
   
   const GuardedRoute = ({router}: {router: RouteRecordRaw, children: never[]}): JSX.Element => {
   	const location = useLocation()
   	const match = useMatch(router.path)
       // 登录信息可以自行修改获取，这里用了react-redux 的
   	const token = useSelector((state: RootState) => state.identity.token) || "token"
   	
   	// 没有 match 即不是目标路由，可能是父路由(Home)。无需处理往下的逻辑
   	if(!match) return router.element
   	// 处理重定向问题
   	let element = redirect(router)
   	
       // 往下书写自定义公共的代码
   	// 登录验证
   	if(token || !router.meta?.needAuth) {
   		document.title = (router.meta?.title as string) || "react"
   	} else {
   		// from 可以在 login 的 location.state 中接收，以便登陆后直接返回至本页
   		element = <Navigate to="/login" state={{from: location}}/>
   	}
   
   	return element
   };
   export default GuardedRoute;
   
   ```



PS：除了Loading组件外，这里的组件都是异步组件，react 第一次加载异步组组件的时候，异步组组件会执行两次。这是正常现象。

