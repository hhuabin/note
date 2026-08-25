# 原型

在 JavaScript 中，每个对象都有一个指向另一个对象的链接，这个链接就是对象的原型。当你访问一个对象的属性时，如果对象本身没有这个属性，JavaScript 引擎会沿着原型链向上查找直到找到相应的属性或到达原型链的末端（Object.prototype）

1. **显示原型（Prototype）：** 每个函数都有一个 `prototype` 属性，它指向一个对象，这个对象就是该函数的原型。当你使用 `new` 关键字创建一个实例时，这个实例对象会继承其构造函数的原型对象上的属性和方法。

2. **隐式原型（Implicit Prototype）：** 在 JavaScript 中，每个对象（除了一些基本对象，比如 `Object.prototype`）都有一个隐式原型指针，这个指针指向它的构造函数的原型对象，即 `[[Prototype]]`。你可以使用 `__proto__` 属性（尽管不是标准的方法，但在许多现代浏览器中支持）来访问这个隐式原型

3. 对象的隐式原型 === **构造函数**的显示原型

   ```javascript
   var myFunction = new Function()
   console.log(myFunction.__proto__ === Function.prototype);    // true
   ```

---

1. 获取原型：`Object.getPrototypeOf()`

   ```javascript
   function Person(name) {
   	this.name = name;
   }
   
   const person = new Person('Alice');
   const personPrototype = Object.getPrototypeOf(person);
   
   console.log(personPrototype === Person.prototype); // Output: true
   console.log(personPrototype === person.__proto__); // Output: true
   ```



# 原型链

当访问对象的属性或方法时，JavaScript 引擎首先检查对象本身是否有该属性或方法。如果没有，它会沿着原型链向上查找，直到找到匹配的属性或方法，或者到达原型链的末端（Object.prototype）

原型链是 JavaScript 实现**继承的基础**，允许对象通过原型链继承属性和方法，使得代码更加灵活和高效

1. 原型链的末端

   ```javascript
   console.log(Object.prototype)                  // {}
   console.log(Object.prototype.__proto__)        // null
   ```

2. 一个对象的原型并不总是 `Object.prototype`

   ```javascript
   const myDate = new Date();
   let object = myDate;
   
   do {
       object = Object.getPrototypeOf(object);
       console.log(object);
   } while (object);
   
   // Date.prototype
   // Object { }
   // null
   ```

   这段代码创建了 `Date` 对象，然后遍历了它的原型链，记录并输出了原型。从中我们知道 `myDate` 的原型是 `Date.prototype` 对象