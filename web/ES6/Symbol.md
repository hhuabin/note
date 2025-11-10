# Symbol

**`Symbol()`** 构造函数返回一个 **symbol** 类型的值，但是它并不完全支持构造函数的语法，因为它不支持 `new Symbol()` 语法，也无法被子类化

- **唯一性**：每个通过 `Symbol()` 创建的符号值都是唯一的
- **不可变性**：符号的值不能改变
- **不可枚举**：符号不会出现在对象的属性枚举中



## 构造函数

它不支持 `new Symbol()` 语法

```javascript
Symbol()
Symbol(description)

const symbol1 = Symbol();
const symbol2 = Symbol(42);
```



## Symbol 的特点

1. **唯一性** 每次调用 `Symbol()` 都会返回一个独一无二的值，即使描述相同，它们也是不同的。

   ```javascript
   const sym1 = Symbol('desc');
   const sym2 = Symbol('desc');
   
   console.log(sym1 === sym2);  // false
   ```

2. **描述信息** 可以为 `Symbol` 提供一个描述字符串，但它不会影响符号的唯一性，它仅用于调试和打印符号值时的显示。

   ```javascript
   const sym = Symbol('This is a symbol');
   console.log(sym.toString());  // Symbol(This is a symbol)
   ```

3. **不可变性** 一旦创建，符号值无法被修改。

   ```javascript
   const sym = Symbol('immutable');
   // sym = Symbol('new value');  // 报错：Assignment to constant variable
   ```

4. **不可枚举性** 符号键不会出现在 `for...in`、`Object.keys()`、`JSON.stringify()` 等方法中，这使得符号非常适合用作对象的私有属性。

   ```javascript
   const sym = Symbol('private');
   const obj = {
       [sym]: 'secret',
       name: 'Alice',
   };
   
   console.log(Object.keys(obj));  // ['name']
   console.log(JSON.stringify(obj));  // {"name":"Alice"}
   console.log(Object.getOwnPropertySymbols(obj));  // [Symbol(private)]
   
   console.log(obj[sym]);  // 'secret'
   ```



## 常见的内置 `Symbol`

JavaScript 提供了一些预定义的符号，可以用来实现特殊功能或与语言内部机制交互。

1. **`Symbol.iterator`**

   **用于定义对象的迭代器**。数组、字符串、Set、Map 等数据结构都有实现迭代器，这使得它们可以使用 `for...of` 进行遍历。

   ```javascript
   javascript复制代码const obj = {
     values: [1, 2, 3],
     [Symbol.iterator]: function* () {
       for (let value of this.values) {
         yield value;
       }
     }
   };
   
   for (let value of obj) {
     console.log(value);  // 1 2 3
   }
   ```

2. **`Symbol.hasInstance`**

   用于自定义 `instanceof` 操作符的行为。

   ```javascript
   class MyClass {
       static [Symbol.hasInstance](instance) {
       	return instance instanceof Array;
       }
   }
   
   console.log([] instanceof MyClass);  // true
   ```

3. **`Symbol.toStringTag`**

   **用于自定义对象的 `toString()` 方法返回的标签**。通常在 `Object.prototype.toString()` 内部使用。

   ```javascript
   const obj = {
   	[Symbol.toStringTag]: 'MyCustomObject'
   };
   
   console.log(Object.prototype.toString.call(obj));  // [object MyCustomObject]
   ```

4. **`Symbol.for()` 和 `Symbol.keyFor()`**

   - `Symbol.for()` 用于注册和获取全局共享的符号。
   - `Symbol.keyFor()` 用于查找一个全局符号的键名。

   ```javascript
   // 使用 Symbol.for 注册全局符号
   const globalSym = Symbol.for('sharedSymbol');
   
   // 使用 Symbol.keyFor 获取符号的描述
   console.log(Symbol.keyFor(globalSym));  // 'sharedSymbol'
   
   // 使用 Symbol.for 创建相同的符号，返回的是相同的值
   const sameGlobalSym = Symbol.for('sharedSymbol');
   console.log(globalSym === sameGlobalSym);  // true
   ```



## 结合使用

`Symbol` 与其他数据结构结合使用非常强大，特别是在处理“私有”数据时。

```javascript
const privateData = Symbol('private');

class User {
  constructor(name, age) {
    this.name = name;
    this[privateData] = age;
  }

  getAge() {
    return this[privateData];
  }
}

const user = new User('Alice', 25);
console.log(user.getAge());  // 25
console.log(user[privateData]);  // undefined, can't access directly
```