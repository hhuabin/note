# ReactRouter路由原理：

通过 **history.listen**（这个 history 是经过封装的，不是window.history）监听路由变化。再匹配显示对应的组件

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



# ReactRouter 6

## 与ReactRouter 5相比

1. 内置组件变化
   - 移除 \<Switch/>，\<Redirect/>
   - 新增 **\<Routes/>**, **\<Navigate/>**
2. 语法变化
   - component={Home} 变为 **element**={\<Home/>}
3. 新增多个hook
   - useParams
   - useMatch
   - useNavigate
4. 官方明确推荐使用函数式组件



## 内置组件

- **\<Routes/>**

  \<Routes/> 具备 \<Switch/> 的功能

  \<Routes/> 与 \<Route/>配合使用，\<Route/> 必须用 \<Routes/> 包裹

- **\<Navigate/>**：

  只要 \<Navigate/> 组件被渲染就会修改路径

- **\<Route/>**

  \<Route caseSensitive/>：属性用于指定路由路径的大小写

- **\<NavLink>**

  删除 activeClassName 属性，动态类名需要写成函数

  子路由的 to 属性，可以不再需要写全部路径，但是不能带/

  ```jsx
  <Link to="/" replace={true} /> 
  <NavLink  className={({isActive}) => {return isActive? 'home active' : 'home'} end}>home</NavLink>
  ```

  - end：当匹配了自己路由，active样式失效

- **\<Outlet/>**

  指定路由组件的呈现位置，相当于 vue 里的 \<router-view />

- **useRoutes**

  可以将 useRoutes 抽出来做成一个文件

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

- useResolvedPath，解析路径用

  ```tsx
  import { useResolvedPath } from 'react-router-dom';
  
  console.log("useResolvedPath", useResolvedPath("/user?id=0#/abc"));
  // useResolvedPath {pathname: '/user', search: '?id=0', hash: '#/abc?a=0'}
  ```

  



## 路由参数

### params参数 **useParams, useMatch**

- useParams：获取 params

- useMatch：获取 match

```tsx
import { useParams, useMatch } from 'react-router-dom';

const params = useParams()
// const { id } = useParams()
// /home 必须与当前路径一致
const match = useMatch("/home")

console.log(params, match);
```

### search参数 **useSearchParams, useLocation**

- useSearchParams：获取 search
- useLocation：获取 location

```tsx
import { useSearchParams, useLocation } from 'react-router-dom';

// seatch 路由search，需要调用get方法才能得到数据
// setSearch 修改路径的search参数
const [search, setSearch] = useSearchParams()
const location = useLocation()

setSearch("id=0&name=bin")

console.log(SearchParams.get("id"), location);
```

### state 参数

使用 useLocation 获得 location，location 里面有 state 参数

```tsx
const { state } = useLocation()
```



## 编程式路由导航 useNavigate

### useNavigate

```tsx
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    
    const changeRoute = () => {
		navigate("/request", {
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







# ReactRouter 5

## ReactRouter 5 内置组件

- **\<BrowserRouter>**：history 路由，整个应用应该用一个路由去管理

  **BrowserRouter 历史路由要注意静态文件的引入路径问题**

- **\<HashRouter>**：hash 路由

- **\<Route>**：展示区，\<Route path="/" exact={true} component={}/>

  exact：严格匹配，非必要不用

- **\<Redirect>**：\<Redirect to="/" />默认匹配，一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

- **\<Link>**：\<Link to="/" **replace={true}** /> 

- **\<NavLink>**：\<Link>加上一个 activeClassName(选中的样式类名) 属性

- **\<Switch>**：路径匹配到了一个就不往下匹配了，用于提升匹配效率



## 路由组件通过 props 传递的仨对象

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



## 路由参数

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



## 编程式路由导航

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



## withRouter

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

