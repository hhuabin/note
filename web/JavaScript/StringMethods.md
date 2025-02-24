# indexOf

1. 查找字符串中某一字符从头开始第一次出现的索引，没有返回 -1

```javascript
const str = "Hello world!"
console.log(str.indexOf("o")) //4
```

2. 查找字符串中某一字符从指定位置开始第一次出现的索引，没有返回 -1

```javascript
c str = "Hello world! wo shi ooo"
console.log(str.indexOf("o",8)) //14
```



# substring

用于提取字符串的一部分，它接受两个参数，分别是起始索引（包括）和结束索引（不包括），然后返回一个新的字符串

`substring()` **不会修改原始字符串**，而是返回一个新字符串

1. 基础用法

   ```javascript
   substring(indexStart)
   substring(indexStart, indexEnd)
   ```

   ```javascript
   const str = "Hello, World!";
   const result = str.substring(0, 5);
   console.log(result); // 输出 "Hello"
   ```

与 `slice` 的区别：

- 如果参数是负数或者第一个参数大于第二个参数，`substring` 会将这两个参数交换，然后执行提取操作。
- 如果任一参数为负数或大于字符串的长度，它们会被视为 0。



# slice

用于提取字符串的一部分，它接受两个参数，分别是起始索引（包括）和结束索引（不包括），然后返回一个新的字符串

`slice()` **不会修改原始字符串**，而是返回一个新字符串

1. 基础用法，start、end可以是负数，负数从末尾开始算

   ```javascript
   string.slice(start[, end])
   ```

2. 只接受一个start参数

   ```javascript
   "abcd".slice(-2)       // cd
   ```




# replace

```javascript
replace(pattern, replacement)
```

**原始字符串不会被改变**

返回：**`replace()`** 方法返回一个**新字符串**，其中一个、多个或所有匹配的 `pattern` 被替换为 `replacement`

`pattern` 可以是字符串或**`RegExp`**，`replacement` 可以是字符串或一个在每次匹配时调用的函数。如果 `pattern` 是字符串，则只会替换第一个匹配项，需要全部替换可使用`replaceAll`

```javascript
var str = "aaa"
str.replace(/a/g, 'A')     // AAA
console.log(str)           // aaa
```





# match

返回所有查找的关键字的数组 

```javascript
str.match(regexp)
```

- `str`: 要搜索的字符串。
- `regexp`: 一个正则表达式对象或一个正则表达式字符串，用于指定要查找的模式。
- `match()` 方法返回一个包含匹配结果的数组，如果没有匹配到，则返回 `null`。



