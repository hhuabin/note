# URLSearchParams

[**URLSearchParams**](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams/URLSearchParams "URLSearchParams") 接口定义了一些实用的方法来处理 URL 的查询字符串。



## 构造函数

```javascript
new URLSearchParams()
new URLSearchParams(options)

// 传入字符串
const params1 = new URLSearchParams("foo=1&bar=2");
const params2 = new URLSearchParams("?foo=1&bar=2");
```

创建一个`URLSearchParams`对象，既不是数组也不是伪数组。可用方法有

- `for...of`：遍历

  ```javascript
  for (const [key, value] of mySearchParams) {
  }
  ```

- `get(key)`：获取**第一个**匹配的参数值

  - key：要返回的参数的键名

  ```javascript
  params1.get("foo")
  ```

- `getAll(key)`：获取**所有**匹配的参数值（数组）

  ```javascript
  params.getAll("tag")
  // ["js", "web"]
  ```

- `has(key)`：检查参数是否存在

  ```javascript
  params.has("name")   // true
  ```

- `set(key, value)`：设置参数（覆盖已有值）

  ```javascript
  params.set("name", "Alice")
  ```

  

## 解析路由参数

```javascript
// 历史路由
const mySearchParams = new URLSearchParams(window.location.search)

// 哈希路由
const mySearchParams = new URLSearchParams(window.location.href.split('?')[1])
```


