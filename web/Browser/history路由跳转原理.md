# 原理

**参考即可，不全是 popstate 的功劳**

window.history 的方法：

- **back**
- **forward**
- **go**
- **pushState**
- **replaceState**



1. 当活动的历史记录发生变化会触发 popstate 事件
2. 通过拦截 popstate 实现页面不刷新
3. 而后改变组件渲染

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>h5 router</title>
</head>
<body>
  <ul>
    <li><a href="/">/</a></li>
    <li><a href="/page1">page1</a></li>
    <li><a href="/page2">page2</a></li>
	<div id="hash">切换哈希</div>
	<div id="history">切换路由page3</div>
  </ul>
  <div class='content-div'></div>
  <script>
	/**
	 * 当活动的历史记录发生变化会触发 popstate 事件
	 * 通过拦截 popstate 实现页面不刷新
	 * 而后改变组件渲染
	 * 即为历史路由基本原理
	 */

	class RouterClass {
		constructor(path) {
			this.routes = {}        // 记录路径标识符对应的cb
			history.replaceState({ path }, null, path)
			this.routes[path] && this.routes[path]()
			window.addEventListener('popstate', e => {
				console.log(e, ' --- e')
				const path = e.state && e.state.path
				this.routes[path] && this.routes[path]()
			})
		}
		
		/**
		 * 初始化
		 */
		static init() {
			window.Router = new RouterClass(location.pathname)
		}
		
		/**
		 * 记录path对应cb
		 * @param path 路径
		 * @param cb 回调
		 */
		route(path, cb) {
			this.routes[path] = cb || function() {}
		}
		
		/**
		 * 触发路由对应回调
		 * @param path
		 */
		go(path) {
			history.pushState({ path }, null, path)
			this.routes[path] && this.routes[path]()
		}
	}


	RouterClass.init()
	const ul = document.querySelector('ul')
	const ContentDom = document.querySelector('.content-div')
	const changeContent = content => ContentDom.innerHTML = content

	Router.route('/', () => changeContent('默认页面'))
	Router.route('/page1', () => changeContent('page1页面'))
	Router.route('/page2', () => changeContent('page2页面'))

	ul.addEventListener('click', e => {
	if (e.target.tagName === 'A') {
		e.preventDefault()
		Router.go(e.target.getAttribute('href'))
	}
	})

	const ahistory = document.getElementById("history")
	ahistory.addEventListener("click", () => {
		history.pushState({
			path: "/page3"
		}, null, "/page3")
		const ContentDom = document.querySelector('.content-div')
		ContentDom.innerHTML = "/page3"
		// history.replaceState({}, null, "/page1")
		console.log(history);
	})
	const hash = document.getElementById("hash")
	hash.addEventListener("click", () => {
		window.location.hash = "#/page1"
	})

  </script>
</body>
</html>

```



