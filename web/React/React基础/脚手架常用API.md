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

## 3. Ref Hook

