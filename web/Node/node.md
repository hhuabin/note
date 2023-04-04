# exports

在一般情况下

```javascript
exports === module.exports
```

 不同的是，module.exports = {} 可以直接导出对象，而 ~~exports = {}~~ 不可以

原理：

我们本质上用的一直都是 module.exports。

- module是 node 的一个运行变量

```javascript
a = { c: 1 }
b = a
b.c = 2
console.log(a.c);       // 2

// 此时a, b的联系已经断开了
b = {}
b.c = 3
console.log(a.c, b.c);   // 2， 3
```

同上，让 exports = {} 时，exports 与 module.exports的联系已经断开了