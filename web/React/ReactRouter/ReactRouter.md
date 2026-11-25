[reactrouter 官网](https://reactrouter.com/en/main)

[react-router-dom github官网](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom)

安装依赖

```shell
yarn add react-router-dom
```

```shell
npm install react-router-dom
```



# 一、`ReactRouter` 路由原理：

通过 **`history.listen`**（这个 `history` 是经过封装的，不是 `window.history` ）监听路由变化。再匹配显示对应的组件

```javascript
// 引入 history.js 库
function push(path) {
    history.push(path)
	return false
}

history.listen((location) => {
    console.log("监听路径发生了变化", location)
})
```



# 二、路由参数

1. `params`

   ```tsx
   this.props.match.params
   ```

   会在地址栏展示（`/home/:id`）

2. `search`

   ```tsx
   this.props.location.search
   ```

   会在地址栏展示（/home?id=1），相当于 `query`

3. `state`

   ```tsx
   this.props.location.state
   ```

   不会在地址栏展示，刷新不丢失，不宜分享给别人。（安全）



# 三、`ReactRouter 6`

## 3.1 与 `ReactRouter 5` 相比

1. 内置组件变化
   - 移除 `<Switch/>`，`<Redirect/>`
   - 新增 `<Routes/>`, `<Navigate/>`
2. 语法变化
   - `component={Home}` 变为 `element={\<Home/>}`
3. 新增多个 `hook`
   - `useParams`
   - `useMatch`
   - `useNavigate`
4. 官方明确推荐使用函数式组件



## 3.2 内置组件

1.  `<Routes/>`

  `<Routes/>` 具备 `<Switch/>` 的功能

  `<Routes/>` 与 `<Route/>` 配合使用，`<Route/>` 必须用 `<Routes/>` 包裹

2.  `<Navigate/>`：重定向组件

  只要 `<Navigate/>` 组件被渲染就会修改路径，所以直接使用重定向的时候要注意 `query` 参数被吃掉

  可以包装 `<Navigate/>` 解决该问题

  ```java
  // 顶部加一个极小的组件
  const IndexRedirect: React.FC<{ to: string }> = ({ to }) => {
      const { search, hash } = useLocation()
      return <Navigate to={{ pathname: to, search, hash }} replace />
  }
  ```

3.  `<Route/>`

  - `path`：指定路由的匹配路径。可以使用字符串、数组或正则表达式来定义多个路径匹配规则。

    `You can have multiple dynamic segments in one route path:`

    ```jsx
    <Route path="/c/:categoryId/p/:productId" />;
    // both will be available
    params.categoryId;
    params.productId;
    ```

    Dynamic segments **cannot be "partial"**:

    - 🚫 `"/teams-:teamId"`

    - ✅ `"/teams/:teamId"`
    - 🚫 `"/:category--:productId"`
    - ✅ `"/:productSlug"`

  - `element`：指定路由匹配成功后要渲染的组件或元素。

  - `children`：可以使用函数作为子元素来定义路由匹配成功后要渲染的内容。

  - `caseSensitive`：指定路径匹配是否区分大小写，默认为 `false`。

  - `index`：指定是否将当前路由作为其父路由的默认子路由，默认为 `false`。

    请注意，`index` 属性与 children 属性互斥

  Route 的匹配是无条件渲染的。即 / 的组件为 \<Home/>， /about 的组件为 \<About/>。当此时的路由为 /about 的时候 \<Home/> 和 \<About/> 都会被渲染，要想只匹配到一个，需要使用 \<Routes/> 包裹

4.  `<NavLink>`

  删除 activeClassName 属性，动态类名需要写成函数

  子路由的 to 属性，可以不再需要写全部路径，但是不能带/

  ```jsx
  <Link to="/" replace={true} /> 
  <NavLink  className={({isActive}) => {return isActive? 'home active' : 'home'} end}>home</NavLink>
  ```

  - end：当匹配了自己路由，active样式失效

5.  `<Outlet/>`

  指定路由组件的呈现位置，相当于 vue 里的 \<router-view />

6.  `useRoutes`

  可以将 `useRoutes` 抽出来做成一个文件

  ```tsx
  import { Routes, Route, Navigate, useRoutes } from 'react-router-dom'
  import Home from './pages/Home/Home'
  
  export default function App() {
  
  	const element = useRoutes([
  		{
  			path: '/home',
  			element: <Home/>,
  			children: [
  				{
                      // 没有 /
  					path: 'about',
  					element: <About/>,
  				}
  			]
  		},
  		{
  			path: '/',
  			element: <Navigate to="/home"/>,
  		},
  	])
  
  	return (
  		<div id="app">
  			{element}
  			{/* <Routes>
  				<Route path="/home" element={<Home/>}/>
  				<Route path="/" element={<Navigate to="/home"/>}/>
  			</Routes> */}
  		</div>
  	)
  }
  ```

7.  `useResolvedPath`，解析路径用

  ```tsx
  import { useResolvedPath } from 'react-router-dom';
  
  console.log("useResolvedPath", useResolvedPath("/user?id=0#/abc"));
  // useResolvedPath {pathname: '/user', search: '?id=0', hash: '#/abc?a=0'}
  ```

  



## 3.3 路由参数

### 3.3.1 `params` 参数 `useParams`, `useMatch`

- `useParams`：获取 `params`

- `useMatch`：获取 `match`

  - 返回值：

    - 成功：返回包含匹配信息的对象

      对象包含 `path`、`url`、`params`、`pathname`、`route`

    - 失败：返回 `null`

  - `useMatch` 的作用是用于检查当前URL是否与指定的路由匹配，并获取匹配的路由信息

```tsx
import { useParams, useMatch } from 'react-router-dom';

const params = useParams()
// const { id } = useParams()
// /home 必须与当前路径一致
const match = useMatch("/home")

console.log(params, match);
```



### 3.3.2 `search` 参数 `useSearchParams`, `useLocation`

- useSearchParams：获取 search
- useLocation：获取 location

```tsx
import { useSearchParams, useLocation } from 'react-router-dom';

// seatch 路由search，需要调用get方法才能得到数据
// setSearch 修改路径的search参数
const [search, setSearch] = useSearchParams()
const location = useLocation()

setSearch("id=0&name=bin")

console.log(search.get("id"), location);
```



### 3.3.3 `state` 参数

使用 `useLocation` 获得 `location`，`location` 里面有 `state` 参数

```tsx
const { state } = useLocation()
```



## 3.4 编程式路由导航 `useNavigate`

```tsx
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    
    const changeRoute = () => {
		navigate('/request', {
			replace: false,
			state: {
				id: 100
			}
		})
	}
    
    // 路由前进
    const forward = () => {
        navigate(1)
    }
    // 路由后退
    const back = () => {
        navigate(-1)
    }
}
```



## 3.5 弹窗返回关闭/表单返回保存

由于 `ReactRouter6` 去掉了 `Prompt` 组件，使得 `ReactRouter6` 并不具备返回拦截功能。下面提供两种思路实现此功能

1. 使用 `window.history.pushState` 跳转至该路由下的子路由，假性增加路由层级。再使用 `history.popstate` 监听路由返回，实现此功能。注意移除监听

   ```tsx
   const handlePopstate = (event: PopStateEvent) => {
       console.log("handlePopstate");
       // 在这里执行 popstate 事件触发时的逻辑
       setIsModalOpen(false)
   };
   
   useEffect(() => {
   
       // 添加 popstate 事件监听
       window.addEventListener('popstate', handlePopstate);
   
       // 在组件卸载时移除事件监听
       return () => {
           window.removeEventListener('popstate', handlePopstate);
       };
   
   }, []);
   ```

1. 使用 `window.location.hash` 跳转至该路由下的子路由，假性增加路由层级。再使用 `history.hashchange` 监听路由返回，实现此功能。



>   在 `React Router` 中，当**父级路由加载子路由时，父级路由组件会被重新渲染**，
>
>   这可能导致父级路由重新加载的表象。这是由于 `React Router` 的工作原理和组件生命周期的机制导致的。
>
>   当父级路由加载子路由时，父级路由组件会首先被渲染，然后再渲染匹配的子路由组件。这是为了确保在渲染子路由之前，父级路由组件能够执行一些必要的操作，比如准备数据、执行路由守卫等。
>
>   因此，父级路由的重新加载可能是正常的行为，并且符合 `React Router` 的设计原则。如果你希望在父级路由加载子路由时避免父级路由的重新加载，可以考虑优化父级路由组件的逻辑，避免不必要的操作和副作用，以减少重新渲染的开销。



# 四、`ReactRouter 5`

## 4.1 `ReactRouter 5` 内置组件

- **\<BrowserRouter>**：history 路由，整个应用应该用一个路由去管理

  **BrowserRouter 历史路由要注意静态文件的引入路径问题**

- **\<HashRouter>**：hash 路由

- **\<Route>**：展示区，\<Route path="/" exact={true} component={}/>

  exact：严格匹配，非必要不用

- **\<Redirect>**：\<Redirect to="/" />默认匹配，一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

- **\<Link>**：\<Link to="/" **replace={true}** /> 

- **\<NavLink>**：\<Link>加上一个 activeClassName(选中的样式类名) 属性

- **\<Switch>**：路径匹配到了一个就不往下匹配了，用于提升匹配效率



## 4.2 路由组件通过 props 传递的仨对象

PS: 在 React Router 5 中，如果你是通过 \<BrowserRouter> 或者 \<Router> 组件将你的根组件包裹起来的话，那么**在根组件内部，是无法直接访问 history 对象的**，因为它不是通过 props 传递到组件内部的。

不过可以使用 withRouter 高阶组件将你的根组件包裹起来，从而让根组件能够通过 props 访问到 history 对象

- **hirstory** 对象：
  - go: ƒ go(n)
  - goBack: ƒ goBack()
  - goForward: ƒ goForward()
  - push: ƒ push(**path, state**)
  - replace: ƒ replace(**path, state**)
- **location** 对象：
  - pathname: "/home"
  - **search**: ""
  - **state**: **undefined**     值默认是 undefined
- **match** 对象：
  - isExact: true             是都是精准匹配
  - **params**: {}
  - path: "/about"
  - url: "/about"



## 4.3 路由参数

### **params**: this.props.match.params

- 需要声明接收 params 参数

  ```html
  <Link to="/home/1">home</Link>
  <Route path="/home/:id" component={Home}/>
  ```

### **search**: this.props.location.search

- 在路径携带即可（query）

  ```html
  <Link to={`/home?id=1`}>home</Link>
  <Route path="/home" component={Home}/>
  ```

注意：this.props.location .search是一个字符串（"?id=1"），需要将其转化成为对象，可使用库为 **querystring**

querystring 常用方法有：

- stringify
- parse

```tsx
// React脚手架自带了querystring这个库
import qs from 'querystring'

qs.stringify({
    name: "bin",
    age: 18,
})
// name=bin&age=18

const {name,age} = qs.parse(search.slice(1))
```

### **state**: this.props.location.state

- 哈希路由不支持这个（刷新直接失效）

- 在路径携带即可，无需声明即可接收

  ```html
  <Link to={{pathname:'/home',state:{id:1} }}>home</Link>
  <Route path="/home" component={Home}/>
  ```

state 原理：

- history 维护管理，正常刷新也不丢失。
- 注意：当清理 history 时，state 为 undefine
- 用于私密信息的传递。



replace 模式

```html
<Link replace to={{pathname:'/home',state:{id:1} }}>home</Link>
```



## 4.4 编程式路由导航

```javascript
back = ()=>{
    this.props.history.goBack()
}

forward = ()=>{
    this.props.history.goForward()
}

go = ()=>{
    this.props.history.go(-2)
}

// push(path, state)
push = () => {
    // params
    this.props.history.push("/home/1")
    // search
    this.props.history.push("/home?id=1")
    // state
    this.props.history.push("/home", {
        id: 1,
    })
}
// replace(path, state)
replace = () => {
    this.props.history.replace("/home/1")
}
```



## 4.5 withRouter

- withRouter可以加工一般组件，让一般组件具备路由组件所特有的API

- withRouter的返回值是一个新组件

```tsx
import { Component, ReactNode, ComponentType } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'

class Header extends Component {

	render(): ReactNode {
		return (
			<div></div>
		)
	}
}

export default withRouter((Header as ComponentType<RouteComponentProps>))
```

5
