

# BrowserRouter 源码

```javascript
import React from 'react';
import { createBrowserHistory } from 'history';

class BrowserRouter extends React.Component {
    history = createBrowserHistory();

    render() {
        return <router history={this.history} children={this.props.children}/>
    }
}

export default BrowserRouter;
```

把 history 对象传下去



# history 监听

感知路由变化由history负责

```javascript
this.unlisten = props.history.listen(location => {
    this.setState({})
})
```



# 提供初始 Context 

```javascript
import { createContext } from 'mini-create-react-context'

const createNameContext = name => {
	const context = createContext();
	context.displayName = name;
	return context;
};

const context = createNameContext("Router")
export default context
```
