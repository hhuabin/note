# try catch

```javascript
try {
   try_statements
}
[catch (exception_var_1 if condition_1) { // non-standard
   catch_statements_1
}]
...
[catch (exception_var_2) {
   catch_statements_2
}]
[finally {
   finally_statements
}]
```

- try_statements 需要被执行的语句。

- catch_statements_1, catch_statements_2 如果在try块里有异常被抛出时执行的语句。

- exception_var_1, exception_var_2 用于保存关联catch子句的异常对象的标识符。
- condition_1 一个条件表达式。
- finally_statements 在try语句块之后执行的语句块。无论是否有异常抛出或捕获这些语句都将执行。



例1，但该写法不符合ECMAscript 规范。

​	在下面的代码中，`try`块的代码可能会抛出三种异常：[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)，[`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError)和[`EvalError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/EvalError)。当一个异常抛出时，控制将会进入与其对应的`catch`语句。如果这个异常不是特定的，那么控制将转移到无条件`catch`子句。

​	当用一个无条件`catch`子句和一个或多个条件语句时，无条件`catch`子句必须放在最后。否则当到达条件语句之前所有的异常将会被非条件语句拦截。

```javascript
try {
    myroutine(); // may throw three types of exceptions
} catch (e if e instanceof TypeError) {
    // statements to handle TypeError exceptions
} catch (e if e instanceof RangeError) {
    // statements to handle RangeError exceptions
} catch (e if e instanceof EvalError) {
    // statements to handle EvalError exceptions
} catch (e) {
    // statements to handle any unspecified exceptions
    logMyErrors(e); // pass exception object to error handler
}
```

例2，符合 ECMAscript 规范。显然更加冗长的，但是可以在任何地方运行

```javascript
try {
  myRoutine();
} catch (e) {
  if (e instanceof RangeError) {
    // statements to handle this very common expected error
  } else {
    throw e;  // re-throw the error unchanged
  }
}
```

