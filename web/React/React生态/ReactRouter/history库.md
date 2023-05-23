**在 React Router 版本 6 中，不再直接依赖于 `history` 库。相反，React Router v6 使用了自己的内部路由器，并且不再需要单独引入 `history` 库进行路由管理。**

`history` 对象类型

```typescript
interface History {
	length: number;
	action: Action;
	location: Location;
	push(path: Path, state?: State): void;
	replace(path: Path, state?: State): void;
	go(n: number): void;
	goBack(): void;
	goForward(): void;
	block(prompt?: string | boolean | TransitionPromptHook): UnregisterCallback;
	listen(listener: LocationListener): UnregisterCallback;
	createHref(location: LocationDescriptorObject): Href;
}
```



# history 库的运行流程

```flow
listen=>start: listen 监听
callback=>end: 事件回调

listen(right)->callback
```



```flow
navigate=>start: push、replace、原生事件监听

block=>condition: 是否调用过history.block?
string=>condition: 入参为字符串？
modol=>condition: 弹框确认跳转？
isfalse=>condition: 入参为false?

prevent=>operation: 阻止导航
execute=>operation: 执行导航
execute2=>operation: 执行导航
update=>operation: 更新状态、触发事件
update2=>operation: 更新状态、触发事件
callback=>end: 事件回调

navigate->block(yes)->string(yes)->modol(yes)->execute->update->callback

string(no)->isfalse(yes)->prevent
isfalse(no)->execute
modol(no)->prevent

block(no)->execute2(right)->update2(right)->callback
```

## history.block 原理解析

各类的 history(browserHistory、hashHistory等) 都会在内部创建 `transitionManager`

```javascript
const transitionManager = createTransitionManager()
```

- 对于 `history.push`、`history.replace` 方法：

  其会在真正跳转前调用 `transitionManager.confirmTransitionTo` 方法进行跳转确认，`confirmTransitionTo` 中封装了上面流程图的基本逻辑。详细代码有点长，懒得写。

- 对于浏览器的“前进”或“后退”按钮跳转：

  事实上，单击“前进”或“后退”按钮，只能监听到 `popstate`、`hashchange` 事件，但是此时浏览器的地址栏已经改变了。监听到跳转之后需要对地址栏做人工回复。在此情况下，可调用 `revertPop` 方法进行地址回复。
