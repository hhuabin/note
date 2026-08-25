# try catch

```typescript
try {
    tryStatements
} catch [(exceptionVar)] {
    catchStatements
} finally {
    finallyStatements
}
```

- `tryStatements`：要执行的语句

- `catchStatements`：`try` 块抛出异常后执行的语句

  `exceptionVar`：可选，用于保存关联的 `catch` 块所捕获到的异常。如果 `catch` 块不使用异常的值，你可以省略 `exceptionVar` 及其周围的括号

- `finallyStatements`：在控制流退出 `try...catch...finally` 结构之前执行的语句。这些语句无论是否抛出或捕获异常都会执行

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



##　异步　try catch

`try catch`不能捕获异步的错误。比如`Promise.catch()`的错误。此时就不能使用`try catch`

```typescript
try {
    new Promise((reslove, reject) => {
        reject()
    })
    .catch(() => {
        throw new Error()
    })
} catch {
    // 此处不能捕获 Promise.catch 的错误
}
```





## 嵌套 try 块

```javascript
try {
    try {
        throw new Error("oops");
    }
    catch (ex) {
        console.error("inner", ex.message);
        throw ex;
    }
    finally {
        console.log("finally");
        // return
    }
}
catch (ex) {
	console.error("outer", ex.message);
}

// Output:
// "inner" "oops"
// "finally"
// "outer" "oops"
```

