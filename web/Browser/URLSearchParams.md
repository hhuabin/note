# URLSearchParams

**`URLSearchParams`** 接口定义了一些实用的方法来处理 URL 的查询字符串。



## 构造函数

```javascript
new URLSearchParams()
new URLSearchParams(options)
```

```javascript
const mySearchParams = new URLSearchParams(window.location.search)
```

```javascript
for (const [key, value] of mySearchParams) {
}
```



## get()

**`URLSearchParams`** 接口的 **`get()`** 方法返回第一个与查询参数对应的值

```javascript
get(name)
```

- name：要返回的参数的键名