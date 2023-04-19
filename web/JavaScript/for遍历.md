# for in

循环遍历的值都是数据结构的键值，会访问原型的数据

```javascript
for (let key in object) {
	console.log(key);
}
```



# for of

for of 是 ES6 中新增加的语法，用来循环获取一对键值对中的值，不会访问原型

一个数据结构只有部署了 Symbol.iterator 属性, 才具有 iterator接口可以使用 for of循环。故而，**普通{} 对象不能被 for of 遍历**

部署了 Symbol.iterator 属性的对象

- 数组 Array
- Map
- Set
- String
- arguments对象
- Nodelist对象, 就是获取的dom列表集合

```javascript
for (let element of array) {
  	console.log(element);
}

// 让对象可以使用 for of循环
let obj = {a: '1', b: '2', c: '3', d: '4'}
for (let o of Object.keys(obj)) {
    console.log(o) // a,b,c,d
}
```

