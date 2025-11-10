# 编码

- decodeURI
- decodeURIComponent

---

`encodeURI` 和 `encodeURIComponent` 是 JavaScript 中用于对 URL 进行编码的两个函数。它们之间的区别在于编码的范围和处理方式。

1. `encodeURI` 函数用于对整个 URL 进行编码，但是会保留某些字符，如冒号、斜杠、问号和井号等，用于保持 URL 的结构完整性。它不会对所有特殊字符进行编码。
2. `encodeURIComponent` 函数则用于对 URL 中的查询参数部分进行编码。它会对所有非字母数字字符进行编码，包括冒号、斜杠、问号和井号等。

具体区别可以总结如下：

- `encodeURI` 主要用于对整个 URL 进行编码，保留一些特殊字符的原始含义，适用于**编码完整的 URL**。
- `encodeURIComponent` 主要用于**对 URL 中的查询参数进行编码**，对所有非字母数字字符进行编码，适用于编码查询参数。

下面是一个示例：

```javascript
javascriptCopy codeconst url = 'https://www.example.com/path/?key=value&param=1+2';

console.log(encodeURI(url));
// 输出：https://www.example.com/path/?key=value&param=1+2

console.log(encodeURIComponent(url));
// 输出：https%3A%2F%2Fwww.example.com%2Fpath%2F%3Fkey%3Dvalue%26param%3D1%2B2
```

