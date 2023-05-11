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





# ReactRouter 5

## ReactRouter 内置组件

- \<BrowserRouter>：history 路由，整个应用应该用一个路由去管理

  **BrowserRouter 历史路由要注意静态文件的引入路径问题**

- \<HashRouter>：hash 路由

- \<Route>：展示区，\<Route path="/" exact={true} component={}/>

  exact：严格匹配，非必要不用

- \<Redirect>：\<Redirect to="/" />默认匹配，一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

- \<Link>：\<Link to="/" /> 

- \<NavLink>：\<Link>加上一个 activeClassName(选中的样式类名) 属性

- \<Switch>：路径匹配到了一个就不往下匹配了，用于提升匹配效率



## ReactRouter 内置对象





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



## 路由接受参数的三种方式

- **params**: this.props.match.params

  - 需要声明接收 params 参数

    ```html
    <Link to="/home/1">home</Link>
    <Route path="/home/:id" component={Home}/>
    ```

- **search**: this.props.location.search

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

- **state**: this.props.location.state         哈希路由不支持这个（刷新直接失效）

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

