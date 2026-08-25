# `console`

##　`info`基本数据类型

```javascript
console.log('')
console.info('')
console.debug('')

console.warn('')
console.error('')
console.clear('')      // 清空消息
```



## `table`数组

二位数组内，用来打印数组更加直观

```javascript
console.table([])
```



## `dir`对象结构

打印对象

1. 可将函数以对象结构打印出来
2. 打印DOM结构

```javascript
console.dir()
```



## `group`分组

将分组内的`console.log()`收集起来，放在一起。方便调试

```javascript
console.group('id') / console.groupCollapsed('id')  // 开始收集该 id 的打印
...
console.log('1')
...
console.groupEnd()    // 结束收集
```



## `time`计时

```javascript
console.time('id')
// TODO anything
console.timeEnd('id')    // 打印间隔时间，可以用来统计代码执行之间之类
```



## `count`计数

```javascript
console.count(value)      // 打印 value 的同时会将次数也打印出来，从 1 开始

console.countReset(value) // 重置次数为 1
```



## `trace`

打印堆栈信息，可打印函数的深层调用

```javascript
function func() {
    console.trace()
}
```



## `assert`断言

```javascript
console.assert()
```



## 样式

给打印添加样式。样式用 `css` 写法

```javascript
const style = 'color: red;'

console.log('%cHello World', style)
```

