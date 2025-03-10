# React比Vue好在哪里

1. **组件化和灵活性**

   **JSX 语法**：React 使用 JSX 语法，将 HTML 和 JavaScript 结合在一起，这种方式允许开发者更紧密地控制组件的结构和逻辑。JSX 提供了更强的灵活性和表达力

   **灵活的组件设计**：React 允许开发者以多种方式创建和管理组件，包括类组件和函数组件（以及 Hooks），这种灵活性适合各种开发风格和需求

2. **虚拟 DOM 和性能优化**

   **虚拟 DOM**：React 使用虚拟 DOM 来高效地更新界面，通过最小化对真实 DOM 的操作来提高性能。虽然 Vue 也使用虚拟 DOM，但 React 在这个方面的性能优化和成熟度得到了广泛认可

   细粒度控制：React 的更新策略和细粒度控制使得开发者可以更精确地优化组件渲染和性能

3. **Hooks 和功能增强**

   **Hooks API**：React 的 Hooks API 提供了一种更简洁的方式来管理组件状态和副作用，使得函数组件变得更加强大和灵活。Hooks 让组件逻辑更加可重用和易于测试

   **Context API**：React 的 Context API 提供了一种更简便的全局状态管理方式，避免了复杂的状态管理库

4. **函数式组件**（优点）

   **简洁性**：函数式组件通常比类组件更简洁，代码更易于阅读和维护。它们仅由一个函数组成，没有复杂的类结构和生命周期方法

   **性能优化**：函数式组件由于没有 `this` 绑定和生命周期方法的复杂性，通常比类组件更轻量。此外，React 的 `React.memo` 可以用来优化函数式组件的性能，避免不必要的重新渲染

   **生命周期简化**：函数式组件中的 `useEffect` Hook 可以代替类组件中的多个生命周期方法，如 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`。这使得处理副作用和生命周期更为简洁

   **类型支持**：在 TypeScript 中，函数式组件的类型定义通常比类组件更简单，类型推断更加直观



# React框架的核心思想

React 框架的核心思想主要包括以下几个方面:

1. **组件化**：构建可复用的 U 组件，并将其组合成复杂的用户界面
2. **虚拟 DOM**：通过虚拟 DOM 提高 DOM 操作的性能，使得 React 的渲染过程高效、快速
3. **单向数据流**：数据在组件间的流动是单向的，父组件通过 props 向子组件传递数据和回调函数，而子组件不能直接修改父组件的状态
4. **声明式编程**：使用声明式的方式来构建UI，简化了开发中的逻辑控制



# 调用setState()

1. **更新状态对象**

   当调用 `setState()` 时，React 会将传入的对象合并到组件当前的状态对象中。这个合并过程是==浅合并（shallow merge）==，即只会替换或添加新属性，而不会深度合并嵌套的对象。

   ```jsx
   this.setState({ count: this.state.count + 1 });
   ```

2. **标记更新队列**

   React 会将该组件标记为需要更新，并将更新请求放入更新队列中。这个过程是异步的，以便在性能上更高效地处理多个更新请求。

3. **调度更新**

   在 React 的事件循环或其他异步事件处理完之后，React 会查看更新队列，并开始处理这些更新请求。React 内部会对多次 `setState` 调用进行合并，以提高性能。

4. **触发重新渲染**

   React 将调用组件的 `render` 方法，生成新的 React 元素树（virtual DOM）。它不会立即直接操作真实 DOM，而是先生成虚拟 DOM 树。

5. **对比新旧虚拟 DOM**

   React 使用其内部的调和算法（Reconciliation）对比新旧虚拟 DOM 树，找出需要更新的部分。这种对比是通过 Diff 算法实现的。

6. **更新真实 DOM**

   根据 Diff 算法的结果，React 只会更新那些真正需要变动的 DOM 元素，而不是重新渲染整个页面。这种方式大大提高了性能。

7. **触发生命周期方法**

   在状态更新和组件重新渲染的过程中，React 会触发相应的生命周期方法（对于类组件）。这些方法包括但不限于：

   - `shouldComponentUpdate(nextProps, nextState)`：用来决定是否需要重新渲染组件。
   - `componentDidUpdate(prevProps, prevState)`：在组件更新后被调用，可以在这里处理副作用。

8. **组件更新完成**

   更新过程完成后，新的 UI 会反映到页面上。

**总结**

调用 `setState` 会引发 React 的一系列更新流程，包括**状态合并**、**更新调度**、**虚拟 DOM 对比**和**真实 DOM 更新**。整个过程设计得非常高效，确保只对必要的部分进行更新，从而提高性能



# React 18 的响应式

在 Vue 3 中，响应式系统是通过 JavaScript 的 `Proxy` 实现的。而在 React 18 中，响应式的实现则依赖于其==自身的状态管理和调度机制==，并没有使用 `Proxy`。React 的核心响应式原理主要依靠以下几个关键概念：

1. **状态管理 (`useState` 和 `useReducer`)**

   React 通过 `useState` 和 `useReducer` hooks 提供了状态管理的能力：

   - `useState` 用于在函数组件中添加本地状态。它返回一个状态变量和一个更新该状态的函数。

   ```jsx
   const [count, setCount] = useState(0);
   ```

   - `useReducer` 提供了一种更复杂的状态管理方式，适用于需要管理复杂状态逻辑的场景。

   ```jsx
   const [state, dispatch] = useReducer(reducer, initialState);
   ```

2. **调度和批量更新**

   React 18 引入了新的并发特性和调度机制，通过优先级调度和批量更新来提升应用性能和响应性。

   - **并发特性**：React 18 支持并发渲染，允许 React 在处理高优先级更新时暂停低优先级的更新。这通过 `Concurrent Mode` 实现，提供了更流畅的用户体验。
   - **批量更新**：React 会自动批量处理在同一个事件循环中发生的多个状态更新，以减少不必要的重新渲染。

3. **Fiber 架构**

   React 16 引入的 Fiber 架构，使得 React 的调度变得更加灵活。Fiber 是一种基于链表的数据结构，允许 React 将渲染工作分割成多个小任务，并在空闲时间内逐步完成。这种机制提高了渲染的效率和响应速度。

4. **合成事件**

   React 使用合成事件系统来处理事件。合成事件是对浏览器原生事件的封装，提供了跨浏览器的一致性和更高效的事件处理。

5. **Hooks 和 Effects**

   React Hooks 提供了在函数组件中使用状态和生命周期等特性的能力。常用的 Hooks 包括：

   - `useState`: 管理组件状态。
   - `useEffect`: 处理副作用，相当于 `componentDidMount`, `componentDidUpdate` 和 `componentWillUnmount` 的结合。

   ```jsx
   useEffect(() => {
       // ComponentDidMount and ComponentDidUpdate
       return () => {
       	// ComponentWillUnmount
       };
   }, [dependencies]);
   ```

6. **Context 和 Custom Hooks**

   React 提供了 `Context` 用于跨组件传递数据，而不需要通过层层传递 `props`。自定义 Hooks 可以复用状态逻辑。

**示例**

一个简单的 React 18 组件使用 `useState` 和 `useEffect` 的例子：

```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
    	document.title = `Count: ${count}`;
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default Counter;
```

在这个例子中，`useState` 用于管理组件的本地状态，`useEffect` 用于处理副作用，比如更新文档标题。

**总结**

React 18 的响应式实现依赖于其**自身的状态管理（如 `useState`, `useReducer`）**，**调度**和**批量更新机制（并发特性，Fiber 架构）**，**合成事件系统**，以及 **Hooks** 和 **Effects** 的组合。虽然没有像 Vue 3 那样使用 `Proxy`，但 React 通过这些机制实现了高效的响应式更新和灵活的状态管理。



# 改变state的方式有哪些

1. **函数组件**：使用 `useState` 和 `useReducer` 来管理状态。
2. **类组件**：使用 `this.setState` 方法更新状态。
3. **Context API**：在组件树中共享状态。
4. **外部状态管理库**：如 **Redux**、MobX、Recoil 等，用于管理应用的全局状态。

`useReducer` Hook 是另一种管理状态的方式，适用于状态逻辑较复杂的场景。它类似于 Redux 的 reducer，使用 `dispatch` 函数来更新状态。

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
    	<div>
        	<p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
        </div>
    );
}
```



# React事件机制和普通HTML事件

React 事件和普通 HTML 事件的主要区别在于，React 事件由 React 自己实现的**合成事件机制(SyntheticEvent)管理**，而不是原生的浏览器事件对象。这个合成事件是一种跨浏览器的包装器，能够为每一个事件提供一致的接口行为。React通过**事件委托和池化**(event delegation and pooling)技术,优化了事件处理的性能
