# 判断数据类型

1. 判断数字：

   ```javascript
   typeof num === 'number'
   ```

2. 判断字符串：

   ```javascript
   typeof str === 'string'
   ```

3. 判断布尔值：

   ```javascript
   typeof bool === 'boolean'
   ```

4. 判断数组：

   ```javascript
   Array.isArray(arr)
   
   arr instanceof Array
   ```

5. 判断对象（不包括数组）：

   ```javascript
   typrof []        // 'object'
   typeof obj === 'object' && !Array.isArray(obj)
   ```

6. 判断函数：

   ```javascript
   typeof func === 'function'
   ```

7. 判断 null：

   ```javascript
   typeof null   // 'object'
   
   obj === null
   ```

8. 判断 undefined：

   ```javascript
   typeof variable === 'undefined'
   ```

9. 判断日期对象：

   ```javascript
   variable instanceof Date
   ```

10. 判断正则表达式：

    ```javascript
    variable instanceof RegExp
    ```

11. 判断 Symbol：

    ```javascript
    typeof symbol === 'symbol'
    ```

这些方法可以帮助你根据需要判断不同的数据类型。需要注意的是，在JavaScript中，`typeof` 操作符对于函数返回的是 `'function'`，而对于 `null` 返回的是 `'object'`，这是一个历史遗留问题。因此，在判断 `null` 时，最好使用 `obj === null` 的方式。





# typeof

typeof 可以判断以下数据类型

1. number                         返回 `"number"`
2. string                             返回 `"string"`
3. boolean                         返回 `"boolean"`
4. object                             返回 `"object"`
5. function                         返回 `"function"`
6. undefined                      返回 `"undefined"`
7. symbol                            返回 `"object"`



# instanceof

instanceof 可以在 typeof 之外的

1. 自定义实例

   ```javascript
   class Person {}
   const person = new Person();
   console.log(person instanceof Person); // true
   ```

2. `Array`、`Date`、`RegExp`

   ```javascript
   const arr = [1, 2, 3];
   console.log(arr instanceof Array); // true
   ```

3. **继承关系中的实例**

   ```javascript
   class Animal {}
   class Dog extends Animal {}
   const dog = new Dog();
   console.log(dog instanceof Animal); // true
   ```

4. **原始数据类型**

   ```javascript
   const num = 42;
   console.log(num instanceof Number); // false
   ```

需要注意的是，`instanceof` 的结果取决于原型链上是否存在特定构造函数。如果你的代码中使用了自定义类或内置构造函数，`instanceof` 可以帮助你判断对象的类型。但对于原始数据类型，最好使用其他方式进行判断，如 `typeof`。



# Object.prototype.toString.call()

```javascript
let arr = [1,2,3,4];
console.log(Object.prototype.toString.call(arr) === "[object Array]");
```

