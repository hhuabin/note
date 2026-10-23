# `Map`



## `Map` 和 `Object` 的主要区别

1. 迭代

   `Map` 是可迭代对象，所以它可以直接使用 **`for... of`** 迭代

   `Object` 没有实现迭代协议，因此对象默认情况下不能直接通过 JavaScript 的 **`for...of`** 语句进行迭代

2. 性能：

   `Map`：在涉及频繁添加和删除键值对的场景中表现更好

   `Object`：未针对频繁添加和删除键值对进行优化

3. 序列化和解析：

   `Map`：没有对序列化或解析的原生支持

   `Object`：原生支持使用 `JSON.stringify()` 序列化和反序列化

| 操作类型     | 对象(`Object`) | `Map`    | 说明                   |
| :----------- | :------------- | :------- | :--------------------- |
| **插入速度** | 快             | **更快** | Map 的插入性能通常更好 |
| **查找速度** | 快             | **更快** | 特别是大数据量时       |
| **删除速度** | 慢             | **快**   | 对象删除属性性能较差   |
| **迭代速度** | 慢             | **快**   | Map 有专用迭代方法     |
| **内存占用** | **较低**       | 较高     | Map 通常占用更多内存   |

- **Map** 通常比对象**占用更多内存**，特别是在存储大量数据时
- **小规模数据、简单用例**：对象性能足够好，且更节省内存
- **大规模数据、复杂操作**：Map在增删查改各方面表现更优

选择时应该基于具体的使用场景和需求，而不是单纯追求最高性能。



## 构造函数

```javascript
new Map()
new Map(iterable)

const map2 = new Map([
    ['name', 'Alice'],
    ['age', 25],
]);
```

- `iterable`：可选

  一个元素是键值对的数组或其他可迭代对象。（例如，包含两个元素的数组，如 `[[ 1, 'one' ],[ 2, 'two' ]]`。）每个键值对都被添加到新的 `Map` 中



## 实例属性

1. `Map.prototype.size`：返回 `Map` 中键值对的数量

    ```typescript
    readonly size: number;
    ```

    ```javascript
    console.log(map.size);  // 2
    ```





## 常用方法

1. `get(key)`：根据键获取值。如果键不存在，返回 `undefined`

   ```typescript
   get(key: K): V | undefined;
   ```

   ```javascript
   console.log(map.get('name'));  // 'Alice'
   console.log(map.get('age'));   // 30
   ```

2. `has(key)`：判断 `Map` 中是否存在某个键，返回 `true` 或 `false`

    ```typescript
    has(key: K): boolean;
    ```

    ```javascript
    console.log(map.has('name'));  // true
    console.log(map.has('address'));  // false
    ```

3. `Map.prototype.set(key, value)`：向 `Map` 中添加一个键值对，如果键已存在，更新其对应的值

   ```typescript
   set(key: K, value: V): this;
   ```

   ```javascript
   map.set('name', 'Alice');
   map.set('age', 30);
   ```

4. `Map.prototype.keys()`

   返回一个新的迭代器对象，其包含 `Map` 对象中所有元素的键，以插入顺序排列

   ```typescript
   /**
    * Returns an iterable of keys in the map
    */
   keys(): MapIterator<K>;
   ```

   ```javascript
   map.keys()         // {}
   ```

5. `Map.prototype.values()`

   返回一个新的迭代对象，其中按插入顺序包含 `Map` 对象中每个元素的值

   ```typescript
   /**
    * Returns an iterable of values in the map
    */
   values(): MapIterator<V>;
   ```

   ```javascript
   map.values()       // {}

6. `Map.prototype.entries()`

   返回一个新的迭代器对象，其包含 `Map` 对象中所有键值对 `[key, value]` 二元数组，以插入顺序排列

   ```typescript
   /**
    * Returns an iterable of key, value pairs for every entry in the map.
    */
   entries(): MapIterator<[K, V]>;
   ```

   ```javascript
   map.entries()      // {}
   ```

7. `Map.prototype.delete(key)`：删除指定的键值对

   ```typescript
   delete(key: K): boolean;
   ```

   ```javascript
   map.delete('name');
   console.log(map.has('name'));  // false
   ```

8. `Map.prototype.clear()`：清空所有的键值对

   ```typescript
   clear(): void;
   ```

   ```javascript
   map.clear();
   console.log(map.size);  // 0
   ```

9. `Map.prototype.forEach` 遍历

   以插入顺序为 `Map` 对象中的每个键值对调用一次 `callbackFn`。如果为 `forEach` 提供了 `thisArg` 参数，则它将作为每一次 callback 的 `this` 值

   ```typescript
   forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
   ```



## 遍历 `Map`

1. `forEach()`: 通过回调函数遍历所有键值对。

   ```javascript
   map.forEach((value, key) => {
   	console.log(key, value);
   });
   ```

2. `for...of`: 使用 `for...of` 遍历键值对。可以通过 `Map` 提供的迭代器获取。和`Object`一样

   - `map.keys()` 获取所有的键。
   - `map.values()` 获取所有的值。
   - `map.entries()` 获取所有的键值对。

   ```javascript
   for (const [key, value] of myMap) {
   	console.log(`${key} = ${value}`);
   }
   
   for (const key of myMap.keys()) {
   	console.log(key);
   }
   
   for (let [key, value] of map.entries()) {
   	console.log(key, value);
   }
   ```