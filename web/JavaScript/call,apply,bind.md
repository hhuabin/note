# 区别

`call`, `apply`, 和 `bind` 是 JavaScript 中用于改变函数执行上下文（即 `this` 关键字的指向）的方法。它们之间的区别主要在于它们的**调用方式和参数传递方式**

1. `call`接收的是参数列表
2. `apply`接收的是数组
3. `bind`返回一个函数



# call

- `call` 方法允许你在调用函数的同时，显式地指定函数执行时的上下文（`this`）以及传入函数的参数。
- `call` 方法的语法是 `function.call(thisArg, arg1, arg2, ...)`.
- 第一个参数 `thisArg` 是要将函数绑定到的对象，后续的参数 `arg1`, `arg2`, ... 是传递给函数的参数

```javascript
const obj = { name: 'John' };

function greet(message) {
    console.log(message + ', ' + this.name);
}

greet.call(obj, 'Hello'); // 输出: Hello, John
```



## 手写call函数

```javascript
Function.prototype.myCall = function(context, ...args) {
    // 如果传入的上下文为空，则默认为全局对象（在浏览器中为 window）
    context = context || window;

    // 将当前函数设置为传入的上下文对象的方法
    context.fn = this;

    // 调用函数，并传入参数
    const result = context.fn(...args);

    // 删除添加的属性
    delete context.fn;

    // 返回函数执行结果
    return result;
};
```

```javascript
function greet(name) {
	return `Hello, ${name}! I'm ${this.job}.`;
}

const person = {
	job: 'a developer'
};

console.log(greet.myCall(person, 'John')); // 输出: Hello, John! I'm a developer.
```



# apply

- `apply` 方法与 `call` 方法类似，也允许你显式地指定函数执行时的上下文（`this`）以及传入函数的参数，但参数是以**数组形式传入**的。
- `apply` 方法的语法是 `function.apply(thisArg, [argsArray])`.
- 第一个参数 `thisArg` 是要将函数绑定到的对象，第二个参数 `argsArray` 是一个包含要传递给函数的参数的数组

```javascript
const obj = { name: 'John' };

function greet(message) {
    console.log(message + ', ' + this.name);
}

greet.apply(obj, ['Hello']); // 输出: Hello, John
```



## 手写apply函数

```javascript
Function.prototype.myApply = function(context, argsArray) {
    // 如果传入的上下文为空，则默认为全局对象（在浏览器中为 window）
    context = context || window;

    // 将当前函数设置为传入的上下文对象的方法
    context.fn = this;

    // 调用函数，并传入参数数组
    const result = context.fn(...argsArray);

    // 删除添加的属性
    delete context.fn;

    // 返回函数执行结果
    return result;
};
```

```javascript
function greet(name, age) {
	return `Hello, ${name}! I'm ${this.job} and I'm ${age} years old.`;
}

const person = {
	job: 'a developer'
};

console.log(greet.myApply(person, ['John', 30])); // 输出: Hello, John! I'm a developer and I'm 30 years old.
```



# bind

- `bind` 方法与 `call` 和 `apply` 不同，它不会立即调用函数，而是**返回一个新函数**，新函数的 `this` 关键字被绑定到指定的对象，并且部分参数也被预置。
- `bind` 方法的语法是 `function.bind(thisArg[, arg1[, arg2[, ...]]])`.
- 第一个参数 `thisArg` 是要将函数绑定到的对象，后续的参数 `arg1`, `arg2`, ... 是预置给函数的参数

```javascript
const obj = { name: 'John' };

function greet(message) {
    console.log(message + ', ' + this.name);
}

const boundGreet = greet.bind(obj);
boundGreet('Hello'); // 输出: Hello, John
```



## 手写bind函数

```javascript
Function.prototype.myBind = function(context, ...args1) {
    const that = this;
    return function(...args2) {
		return that.call(context, ...args1, ...args2);
    };
};
```

```javascript
function greet(name) {
	return `Hello, ${name}! I'm ${this.job}.`;
}

const person = {
	job: 'a developer'
};

const boundGreet = greet.myBind(person, 'John');
console.log(boundGreet()); // 输出: Hello, John! I'm a developer.
```

