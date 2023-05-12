# setState

React 状态的更新是**异步**的

1. 一般的 setState，对象式

   ```jsx
   this.setState({
       count:count+1
   })
   ```

2. setState 函数接收两个参数，第二个参数是一个状态更新后的执行函数

   ```jsx
   this.setState({count:count+1},()=>{
       console.log(this.state.count);
   })
   ```

3. 函数式的 setState

   ```jsx
   this.setState( state => ({
       count:state.count+1
   }))
   // 或者
   this.setState( state => {
       return count:state.count+1
   })
   ```



# lazy、Suspense 

组件懒加载：组件懒加载可以使用 lszy 函数，同时必须使用 Suspense 组件，并且指定fallback，此时 fallback 组件不能使用懒加载，必须使用普通同步引入

```jsx
import { Component, lazy, Suspense} from 'react'

import Loading from './Loading'
const Home = lazy(()=> import('./Home') )

render() {
    return (
        <Suspense fallback={<Loading/>}>
            {/* 注册路由 */}
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
        </Suspense>
    )
}
```



# hooks

- Hook：React16.8.0版本增加的新特性
- 可以**在函数式组件中使用 state** 以及其他的 React 新特性

## 1. State Hook

- useState()

  参数：**第一次初始化**指定的值在内部作缓存

  返回值：包含2个元素的数组,，第1个为内部当前状态值，第2个为更新状态值的函数

  - setXxx(setName)：有两种写法

    setXxx(newValue)：参数为非函数值

    setXxx(value => newValue)：参数为函数，接收原本的状态值

```jsx
import React from 'react'
export default function Demo() {
    const [name, setName] = React.useState('bin')
    
    const changeName = () => {
		//setName("huabin") //第一种写法
		setName(name => {
            return "hua" + name
        })
	}
    
    return(
        <div>
			<div>名字：{name}</div>
            <div onClick={changeName}>改名字</div>
		</div>
    )
}
```

## 2. Effect Hook

可以让在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)

```javascript
useEffect(() => { 
    // 在此可以执行任何带副作用操作
    return () => { // 在组件卸载前执行
        // 在此做一些收尾工作, 比如清除定时器/取消订阅等
    }
}, [stateValue])  // 如果指定的是[], 回调函数只会在第一次render()后执行
```

可以把 useEffect Hook 看做如下三个函数的组合

- componentDidMount()
- componentDidUpdate()
- componentWillUnmount() 



## 3. Ref Hook

Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据

```javascript
 const refContainer = useRef()
```

作用：保存标签对象,功能与React.createRef()一样



# Fragment

Fragment：可以不用必须有一个真实的DOM根标签了

```html
<Fragment></Fragment>
<></>
```

区别：Fragment 可以指定 key 值，并且只能指定 key。不能写其他属性



# Context

context：一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

1. 建Context容器对象：

   ```jsx
   const MyContext = React.createContext()
   const {Provider, Consumer} = MyContext
   ```

2. 渲染子组时，外面包裹Provider，通过value属性给后代组件传递数据：

   ```jsx
   // 主组件使用
   <Provider value={数据}>
       <子组件/
   </Provider>
   ```

3. 后代组件读取数据：

   第一种方式：

   ```jsx
   static contextType = xxxContext  // 声明接收context(MyContext)
   this.context // 读取context中的value数据
   ```

   二种方式: 函数组件与类组件都可以

   ```jsx
   <MyContext.Consumer>
       {
           value => ( // value就是context中的value数据
               要显示的内容
           )
       }
   </MyContext.Consumer>
   ```

在应用开发中一般不用context, 一般都它的封装react插件



# 组件优化

## Component 有2个问题

1. 只要执行setState(),即使不改变状态数据，组件也会重新render()
2. 只当前组件重新render()，就会自动重新render子组件 ==> 效率低

## 效率高的做法

只有当组件的state或props数据发生改变时才重新render()

## 原因

Component中的shouldComponentUpdate()总是返回true

## 解决办法

1. 重写shouldComponentUpdate()方法

   比较新旧state或props数据, 如果有变化才返回true，如果没有返回false

   ```jsx
   shouldComponentUpdate(nextProps,nextState){
       console.log(this.props,this.state); //目前的props和state
       console.log(nextProps,nextState); //接下要变化的目标props，目标state
       return !this.state.carName === nextState.carName
   }
   ```

2. 使用 **PureComponent**

   PureComponent重写了shouldComponentUpdate()，只有state或props数据有变化才返回true

   注意: 

   ​      只是进行state和props数据的浅比较，如果只是数据对象内部数据变了，返回false  

   ​      不要直接修改state数据，而是要产生新数据

   ```jsx
   import {PureComponent} from 'react'
   export default class Demo extends PureComponent {
       
   }
   ```

项目中一般使用PureComponent来优化



# render props

Vue中:  使用**slot 插槽技术**, 也就是通过组件标签体传入结构  <AA><BB/></AA>

React中:

​    使用children props: 通过组件标签体传入结构

​    使用render props: 通过组件标签属性传入结构, 一般用render函数属性

重点代码在 class A 中

```jsx
import { Component } from 'react'

export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				<A render={(name)=><C name={name}/>}/>
			</div>
		)
	}
}

class A extends Component {
	state = {name:'tom'}
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{this.props.render(name)}
			</div>
		)
	}
}

class B extends Component {
	render() {
		console.log('B--render');
		return (
			<div className="b">
				<h3>我是B组件,{this.props.name}</h3>
			</div>
		)
	}
}

```



# 错误边界

- 错误边界：用来捕获后代组件错误，渲染出备用页面

- 只能捕获后代**组件生命周期**产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

```jsx
state = {
    hasError:'' //用于标识子组件是否产生错误
}

// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}

render() {
    return (
        <div></div>
        {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
    )
}
```



# 组件通信方式总结

1. props

   - children props
   - render props

2. 消息订阅-发布：

   pubs-sub

3. 集中式管理：

   redux

4. conText

   生产者-消费者模式
