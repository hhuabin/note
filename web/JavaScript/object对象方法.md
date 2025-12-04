# Object.assign()

**`Object.assign()`** 静态方法将一个或者多个*源对象*中所有可枚举的自有属性复制到*目标对象*，并返回修改后的目标对象

```javascript
Object.assign(target, ...sources)
```

- `target`：需要应用源对象属性的目标对象，修改后将作为返回值
- `sources`：一个或多个包含要应用的属性的源对象
- 返回值：修改后的目标对象

---

```javascript
const obj = { a: 1 };
const copy = Object.assign(obj, {b: 2});  // 浅拷贝

console.log(copy); // { a: 1, b: 2 }
console.log(obj); // { a: 1, b: 2 }
```

- copy是浅复制



# Object.defineProperty()

**`Object.defineProperty()`** 静态方法会直接在一个对象上定义一个新属性，或修改其现有属性，并返回此对象

```javascript
Object.defineProperty(obj, prop, descriptor)
```

- obj：要定义属性的对象
- prop：一个字符串或Symbol，指定了要定义或修改的属性键
- descriptor：要定义或修改的属性的描述符
- 返回值：传入函数的对象，其指定的属性已被添加或修改

```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false,
});

object1.property1 = 77;
// Throws an error in strict mode

console.log(object1.property1);
// Expected output: 42
```



# Object.keys()

**`Object.keys()`** 静态方法返回一个由给定对象自身的可枚举的字符串键**属性名**组成的数组

```javascript
Object.keys(obj)
```

- obj：一个对象
- 返回值：一个由给定对象自身可枚举的字符串键属性键组成的数组

```javascript
const object1 = {
    a: 'somestring',
    b: 42,
    c: false,
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]
```



# Object.values()

**`Object.values()`** 静态方法返回一个给定对象的自有可枚举字符串键**属性值**组成的数组

```javascript
Object.values(obj)
```

- obj：一个对象
- 返回值：一个包含了给定对象的自有可枚举字符串键属性值的数组

```javascript
const object1 = {
    a: 'somestring',
    b: 42,
    c: false,
};

console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]
```



# Object.entries()

**`Object.entries()`** 静态方法返回一个数组，包含给定对象自有的可枚举字符串键属性的**键值对**

```javascript
Object.entries(obj)
```

- obj：一个对象
- 返回值：一个由给定对象自有的可枚举字符串键属性的键值对组成的**数组**。每个键值对都是一个包含两个元素的数组：第一个元素是属性的键（始终是字符串），第二个元素是属性值

```javascript
const object1 = {
    a: 'somestring',
    b: 42,
};

for (const [key, value] of Object.entries(object1)) {
	console.log(`${key}: ${value}`);
}

// Expected output:
// "a: somestring"
// "b: 42"
```





# Object.hasOwn()

如果指定的对象*自身*有指定的属性，则静态方法 **`Object.hasOwn()`** 返回 `true`。如果属性是继承的或者不存在，该方法返回 `false`

`Object.hasOwn()` 旨在取代`Object.prototype.hasOwnProperty()`

```javascript
Object.hasOwn(obj, prop)
```

- 要测试的 JavaScript 实例对象
- 要测试属性的`String`类型的名称或者`Symbol`
- 返回值：`boolean`

```javascript
const example = {};
Object.hasOwn(example, "prop");   // false——目标对象的属性 'prop' 未被定义
```

