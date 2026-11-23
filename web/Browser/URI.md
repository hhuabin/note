# `URI`

**统一资源标识符**（`URI`）用于标识 `Web` 上的“资源”。它只要求“能唯一标识一个资源”，不要求说明如何访问它。`URI` 的通用结构是 `scheme:[//authority]path[?query][#fragment]`

`URI` 分为两类：

-   `URL`：不仅标识资源，还说明**如何定位/获取**它（有访问机制）
-   `URN`（`Uniform Resource Name`）：只标识资源名称，不说明位置，如 `urn:isbn:0451450523`





## `encodeURI()` 和 `decodeURI()`

[encodeURI ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI "encodeURI ")：主要用于对**整个 `URL`** 进行编码，保留一些特殊字符的原始含义，适用于**编码完整的 `URL`*

`encodeURI` 会替换所有的字符，但不包括以下字符，即使它们具有适当的 `UTF-8` 转义序列：

| 类型         | 包含                                          |
| :----------- | :-------------------------------------------- |
| 保留字符     | `;` `,` `/` `?` `:` `@` `&` `=` `+` `$`       |
| 非转义的字符 | 字母 数字 `-` `_` `.` `!` `~` `*` `'` `(` `)` |
| 数字符号     | `#`                                           |

`encodeURI` 自身无法产生能适用于 `HTTP GET` 或 `POST` 请求的 `URI`，例如对于 `XMLHTTPRequests`，因为 `"&"`,` "+"`, 和 `"="` 不会被编码，然而在 `GET` 和 `POST` 请求中它们是特殊字符。然而[`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)这个方法会对这些字符编码





## `encodeURIComponent` 和 `decodeURIComponent()`

[encodeURIComponent ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent "encodeURIComponent ")：主要用于对 `URL` 中的**单个查询参数**进行编码，对所有非字母数字字符进行编码，适用于编码查询参数

`encodeURIComponent` 转义除了 `A-Z a-z 0-9 - _ . ! ~ * ' ( )` 外的所有字符

```javascript
var set1 = ";,/?:@&=+$";          // 保留字符
var set2 = "-_.!~*'()";           // 不转义字符
var set3 = "#";                   // 数字标志
var set4 = "ABC abc 123";         // 字母数字字符和空格

console.log(encodeURI(set1));     // ;,/?:@&=+$       （没有编码）
console.log(encodeURI(set2));     // -_.!~*'()        （没有编码）
console.log(encodeURI(set3));     // #                （没有编码）
console.log(encodeURI(set4));     // ABC%20abc%20123   (空格被编码为 %20)

console.log(encodeURIComponent(set1));    // %3B%2C%2F%3F%3A%40%26%3D%2B%24    （编码了）
console.log(encodeURIComponent(set2));    // -_.!~*'()                         （没有编码）
console.log(encodeURIComponent(set3));    // %23                               （编码了）
console.log(encodeURIComponent(set4));    // ABC%20abc%20123                    (空格被编码为 %20)
```

