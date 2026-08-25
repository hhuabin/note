# constructor

```typescript
new (message?: string, options?: ErrorOptions): Error;

new Error("message", {cause: unknown})
```

- message (可选) 人类可读的错误信息。
- options (可选) 一个包含以下属性的对象：
  - cause (可选) 指示错误的具体原因，反映在 cause 属性中。当捕获并重新抛出带有更具体或有用的错误消息的错误时，可以使用此属性传递原始错误。

以下属性仅火狐浏览器兼容（不建议使用）

- fileName (可选) 引发此错误的文件路径，反映在 fileName 属性中。默认为调用 Error() 构造函数的代码所在文件的名称。
- lineNumber (可选) 引发错误的文件中的行号，反映在 lineNumber 属性中。默认为包含 Error() 构造函数调用的行号。



# 属性

```javascript
cause
Error.prototype.message
Error.prototype.name
Error.prototype.toString()
```





# 错误的类型

- Error: 所有错误的父类型

- RangeError: 数据值不在其所允许的范围内

- ReferenceError: 引用的变量不存在

- SyntaxError: 语法错误

- TypeError: 数据类型不正确的错误

## EvalError

- 本对象代表了一个关于 eval() 全局函数的错误。此异常不再会被 JavaScript 抛出，但是 EvalError 对象仍然存在，以保持兼容性。

## RangeError

- RangeError 对象表示一个特定值不在所允许的范围或者集合中的错误。

## ReferenceError

- ReferenceError（引用错误）对象代表当一个不存在（或尚未初始化）的变量被引用时发生的错误。

## SyntaxError

- SyntaxError（语法错误）对象代表尝试解析不符合语法的代码的错误。当 Javascript 引擎解析代码时，遇到了不符合语法规范的标记（token）或标记顺序，则会抛出 SyntaxError。

## TypeError

- TypeError（类型错误）对象通常（但并不只是）用来表示值的类型非预期类型时发生的错误。

## URIError

- URIError 对象用来表示以一种错误的方式使用全局 URI 处理函数而产生的错误。