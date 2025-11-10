# 对象类型

- `{}`：object
- JSON：JSON
- 字符串对象： Record<string, string>



# 基本类型

- 类型断言

  ```typescript
  <string>someValue
  ```

  ```typescript
  someValue as string
  ```
  
- 非空断言

  **感叹号 (`!`) 的作用**：告诉 TypeScript 编译器“我知道这个值不会是 `null` 或 `undefined`，请不要为此发出类型错误的警告”

  ```typescript
  document.getElementById('root')!
  ```


- 数组类型

  ```typescript
  export type Answer = Array<{
  	readonly name: string;
  	readonly age: number;
  }>
  ```
  
  数组单个类型获取
  
  ```typescript
  type AnswerItem = Answer[number]
  const answerItem = {
      name: 'bin';
  	age: 18;
  }
  ```
  
  注意这里不要使用 `lineGroup[0].items`
  
  ```typescript
  [] as typeof lineGroup[0]["items"]
  ```



# 高级类型

## 交叉类型(&)

`C` 类型同时包含了 `A` 和 `B` 的属性，因此 `person` 必须满足 `A` 和 `B` 的结构才能通过类型检查

- 如果 `A` 和 `B` 有相同的属性，则它们的类型必须一致，否则会报错
- `&`可以用于`interface`中，但是`interface`更推荐使用`extends`做继承
- `&`支持`interface`和`type`混合

```typescript
type A = {
	name: string;
};

type B = {
	age: number;
};

type C = A & B;

// 使用 C 类型的示例
const person: C = {
    name: 'Alice',
    age: 30,
};
```



## 联合类型(|)

当A属性存在时，B属性也一定会存在

```typescript
type DependentProps = 
  | { A?: undefined; B?: undefined }  // A 和 B 都不存在
  | { A: string; B: string };         // A 和 B 都存在
```

```typescript
interface WithAB {
  A: string;
  B: string;
}

interface WithoutAB {
  A?: undefined;
  B?: undefined;
}

type DependentProps = WithAB | WithoutAB;
```



# 接口(`interface`)和类型别名(`type`)

```typescript
interface ClockInterface {
    currentTime: Date;
}
```

一个接口可以继承多个接口，创建出多个接口的合成接口

```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}
```



##　`interface`、`type`差异

1. **`interface`：**
   - 主要用于定义对象的结构，即属性和方法。
   - **支持继承，可以继承其他接口**。
   - **可以被类实现（implements）**。
   - 不能描述基本类型（例如：`number`，`string`）和联合类型（例如：`string | number`）
2. **`type`：**
   - 可以用来定义对象、联合类型、交叉类型等复杂类型。
   - **支持基本类型和联合类型**。
   - **不支持继承和实现**。

一般来说，如果你只需要描述对象的结构，**官方推荐使用 `interface`**。但如果你需要更复杂的类型定义，例如联合类型、交叉类型等，或者需要使用基本类型，那么就可以使用 `type`。在实际使用中，两者可以根据需求交替使用。

1. 其一，接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名。 在下面的示例代码里，在编译器中将鼠标悬停在`interfaced`上，显示它返回的是`Interface`，但悬停在`aliased`上时，显示的却是对象字面量类型。

   ```typescript
   type Alias = { num: number }
   interface Interface {
       num: number;
   }
   declare function aliased(arg: Alias): Alias;
   declare function interfaced(arg: Interface): Interface;
   ```

2. 另一个重要区别是**类型别名不能被`extends`和`implements`**（自己也不能`extends`和`implements`其它类型）。 因为软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。

3. 另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。





# `implements`、`instanceof`、`keyof`类型保护

##　`instanceof`

```typescript
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}


// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```

## `keyof`

可以说明是一个对象的键值

```typescript
interface Person {
    name: string;
    age: number;
}
let personProps: keyof Person; // 'name' | 'age'
```

```typescript
for (const key in user) {
            if (Object.prototype.hasOwnProperty.call(user, key)) {
                user[key as keyof User].name = bin
            }
    }
```



# 泛型

1. 泛型接口

   ```typescript
   interface GenericIdentityFn<T> {
       (arg: T): T;
   }
   ```

   ```typescript
   let myIdentity: GenericIdentityFn<number> = identity;
   ```

2. 泛型类型

   ```typescript
   type Tree<T> = {
       value: T;
       left: Tree<T>;
       right: Tree<T>;
   }
   
   type Props<T extends OrderItem> = {
   	orders: Array<T>;
   }
   ```

   ```typescript
   export interface OrderItem {
   	readonly name: string;
   }
   
   type Props<T> = {
   	orders: Array<T>;
   }
   
   function OrderList<T extends OrderItem>(props: Props<T>) {}
   const OrderList = <T extends OrderItem>(props: Props<T>) => {{}
   ```
   
3. 泛型函数

   ```typescript
   function identity<T>(arg: T): T {
       return arg;
   }
   ```

4. Map泛型

   ```typescript
   interface Map<T> {
       [key: string]: T;
   }
   ```


## 定义泛型

在函数中，如果我们需要**从函数的 参数 中自动推导出函数 返回值 的类型**，我们需要将参数定义为 `T` ，然后从参数中提取 类型 组成结果

```typescript
export const runTasksWithLimitSettled = <T extends (() => Promise<any>)[]>(
    // 保持传入参数的“元组精度”并允许 as const 修饰的只读数组被正确推导，使用 tasks: T 的话，结果会被推导为宽泛数组
    tasks: readonly [...T],
    limit: number,
): Promise<{[K in keyof T]: T[K] extends () => Promise<infer R> ? TaskResult<R> : never}>
```

- `readonly [...T]`：保持传入参数的“元组精度”并允许 as const 修饰



# 函数

**函数默认值**

```javascript
// 默认值
// 默认值可以让你在属性为 undefined 时使用缺省值：
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
// 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。
```



