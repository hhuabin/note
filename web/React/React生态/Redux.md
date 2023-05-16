# react-redux + @reduxjs/toolkit

**Redux 可以理解为是 `reducer` 和 `context` 的集合体**

```
npm install @reduxjs/toolkit react-redux
```

在启动文件传 store

```typescript
// index.tsx
import store from "./store/store"
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        {/* 路由模式 */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
```



store/store.ts

```typescript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/counterSlice'
import usersReducer from './slice/usersSlice'

const store = configureStore({
	reducer: {
		counter: counterReducer,
		users: usersReducer,
	},
})
export default store

// 声明 state, dispath 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

store/slice/countersSlice.ts

```typescript
import { createSlice } from '@reduxjs/toolkit'
import { type } from 'os'

export const counterSlice = createSlice({
	// 用来自动生成 action 中的 type
	name: 'counter',
	// state 初始值
	initialState: {
		countNumber: 0,
	},
	reducers: {
		increment: (state) => {
			state.countNumber += 1
		},
		decrement: (state) => {
			state.countNumber -= 1
		},
		incrementByAmount: (state, action) => {
			state.countNumber += action.payload
		},
	},
})

// 切片对象会自动生成 action
// actions 存储的是 slice 自动生成 action 创建器（一个函数）
// action 对象的结构：{type: "counter/increment"}...，payload：函数的参数
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

store/slice/usersSlice.ts

```typescript
import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
	// 用来自动生成 action 中的 type
	name: 'users',
	// state 初始值
	initialState: {
		name: "",
	},
	reducers: {
		changeName: (state, action) => {
			state.name = action.payload
		},
	},
})

export const { changeName } = usersSlice.actions

export default usersSlice.reducer
```

在组件中调用

```tsx
import { useAppDispatch, useAppSelector } from '../../hooks/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/slice/counterSlice'
import { RootState } from '../../store/store'

export default function Redux() {

	// const count = useAppSelector(state => state.counter.countNumber)
	const count = useAppSelector((state: RootState) => state.counter.countNumber)
 	const dispatch = useAppDispatch()

	return (
		<div>
			<div>
				<button
					aria-label="Increment countNumber"
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<span>{count}</span>
				<button
					aria-label="Decrement countNumber"
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
		</div>
	)
}
```

关于简化 typescript，可以定义一个 hooks/store.ts 文件

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

以后使用 useDispatch， useSelector 直接引用该文件的 **useAppDispatch**， **useAppSelector**即可，state, dispatch则无需声明类型了。



可以**使用 store 封装高阶组件**，经过封装后，props 里面携带了 store 的相关东西，但不建议这样使用，容易摸不着头脑，过于简化的代码反而不便于阅读维护。有时候分清 props 和 store 更好维护。

```tsx
import { connect } from 'react-redux'

interface StateProps {
  isOn: boolean
}

interface DispatchProps {
  toggleOn: () => void
}

interface OwnProps {
  backgroundColor: string
}

type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState) => ({
  isOn: state.isOn,
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
}

const MyComponent = (props: Props) => (
  <div style={{ backgroundColor: props.backgroundColor }}>
    <button onClick={props.toggleOn}>
      Toggle is {props.isOn ? 'ON' : 'OFF'}
    </button>
  </div>
)

// Typical usage: `connect` is called after the component is defined
export default connect<StateProps, DispatchProps, OwnProps>(
  mapState,
  mapDispatch
)(MyComponent)
```





# 旧版Redux

Redux 三大元素

- **store**
- **reducer**
- **action**



## 基础使用 redux

```
npm install redux
```



store 的基础方法

- store.subscribe：检测redux中状态的变化，通常放在**根目录下**
- store.getState：获取状态
- store.dispatch：分发任务给 reducer



store.js

1. 引入redux中的createStore函数，创建一个store

2. createStore调用时要传入一个为其服务的reducer

3. 暴露store对象

   ```javascript
   //引入createStore，专门用于创建redux中最为核心的store对象
   import {createStore} from 'redux'
   //引入为Count组件服务的reducer
   import countReducer from './count_reducer'
   //暴露store
   export default createStore(countReducer)
   ```

reducer.js：reducer的本质是一个函数，接收：preState,action，返回加工后的状态

- reducer 维护的状态是 initState

```javascript
//初始化人的列表
const initState = [{id:'001',name:'bin',age:18}]
export default function reducer(preState=initState,action){
	const {type,data} = action
    switch (type) {
		case ADD_PERSON: //若是添加一个人
            // return 的数据不能与原来的一样（首先地址值不能一样），不然不会触发页面更新。push等方法慎用
			return [data,...preState]
		default:
			return preState
	}
}
```

action.js：返回一个 {type:INCREMENT,data} 对象即可

```javascript
export const createIncrementAction = data => ({type:ADD_PERSON, data})
// data: {id:'002',name:'bin',age:18}
```



UI 组件调用 redux 方法

```javascript
// 修改 state
store.dispatch(createIncrementAction(value*1))
// 获取 state
store.getState()
```



## 异步 action

1. action 返回一个异步函数

   ```javascript
   export const createIncrementAsyncAction = (data,time) => {
       // 自动有个 dispatch 参数
   	return (dispatch)=>{
   		setTimeout(()=>{
               // 异步action中一般有同步action
   			dispatch(createIncrementAction(data))
   		},time)
   	}
   }
   ```

2. 暴露的 store 需要引入一个异步中间件

   ```javascript
   import {createStore,applyMiddleware} from 'redux'
   import thunk from 'redux-thunk'
   
   export default createStore(countReducer,applyMiddleware(thunk))
   ```



# React-Redux

旨在将UI组件与store分开，不要过多引入store

```
npm install react-redux
```

## React-Redux 基础使用

**redux 相关文件不需要修改**

1. 修改UI组件成容器组件，UI组件无需引入 store 了。

2. store 的相关东西会通过**父组件传入**容器组件中，再通过 **connect** 方法传入UI 组件的 props 中

   connect(mapStateToProps, mapDispatchToProps)(Component)

   - mapStateToProps

     mapStateToProps函数返回的是一个对象；

     返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value

   - mapDispatchToProps

     mapDispatchToProps函数返回的是一个对象；

     返回的对象中的key就作为传递给UI组件props的key，value就作为传递给UI组件props的value

   ```jsx
   //引入connect用于连接UI组件与redux
   import {connect} from 'react-redux'
   //引入action
   import {
   	createIncrementAction,
   	createDecrementAction,
   	createIncrementAsyncAction
   } from '../../redux/count_action'
   
   //定义UI组件
   class Count extends Component {
       
       incrementIfOdd = ()=>{
   		const {value} = this.selectNumber
   		if(this.props.count % 2 !== 0){
   			this.props.jia(value*1)
   		}
   	}
       
       render() {
           return (
               <div>
                   <h1>当前求和为：{this.props.count}</h1>
               </div>
           )
       }
   }
   
   //使用connect()()创建并暴露一个Count的容器组件
   export default connect(
   	// mapStateToProps 函数返回的是一个对象；
       // state 总状态对象
   	state => ({count:state}),
   
   	// mapDispatchToProps 的一般写法
   	dispatch => ({
   		jia:number => dispatch(createIncrementAction(number)),
   		jian:number => dispatch(createDecrementAction(number)),
   		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
   	})
   
   	// mapDispatchToProps 的简写
   	/* {
   		jia:createIncrementAction,
   		jian:createDecrementAction,
   		jiaAsync:createIncrementAsyncAction,
   	} */
   )(Count)
   ```

3. Provider

   删除 index.js 的监听 store 变化的代码片段，引入 Provider，监听代码被封装在 connect 方法中了

   ```jsx
   import React from 'react'
   import ReactDOM from 'react-dom'
   import App from './App'
   import store from './redux/store'
   // Provider 会自动把 store 传递给需要的组件
   import {Provider} from 'react-redux'
   
   ReactDOM.render(
   	<Provider store={store}>
   		<App/>
   	</Provider>,
   	document.getElementById('root')
   )
   ```

   

# 多个 state

store.js：需要使用 combineReducers 进行合并

```javascript
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware,combineReducers} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './reducers/count'
//引入为Count组件服务的reducer
import personReducer from './reducers/person'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'

//汇总所有的reducer变为一个总的reducer
const allReducer = combineReducers({
	count:countReducer,
	person:personReducer
})

//暴露store
export default createStore(allReducer,applyMiddleware(thunk))
```

访问 state ：state.rens,state.he

容器组件：

```jsx
// Person(UI组件)
export default connect(
	state => ({count:state.count,person:state.person}),//映射状态
	{jiaYiRen:createAddPersonAction}//映射操作状态的方法
)(Person)
```

# redux 开发工具

```javascript
npm i redux-devtools-extension
```

在 store.js 中使用

```javascript
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

//暴露store 
export default createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
```



