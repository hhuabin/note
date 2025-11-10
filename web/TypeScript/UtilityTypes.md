**内置的工具类型**[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)



# `Awaited<T>`

获取 Promise 解析类型

```typescript
type A = Awaited<Promise<string>>
// type A = string

type B = Awaited<Promise<Promise<number>>>
// type B = number

type C = Awaited<boolean | Promise<number>>
// type C = number | boolean
```



# 可选参数`Partial<T>`

`Partial` 是 TypeScript 提供的一个内置类型工具，用于**将对象类型中的所有属性变为可选**（`optional`）

```typescript
interface UserInfo {
    name: string;
    age: number;
}

let userInfo: UserInfo = {
    name: '';
    age: '';
}

const updateUserInrfo = (info: Partial<UserInfo>) => {
	userInfo = {...userInfo, ...info}
}

changeUserInrfo({name: 'bin'})
```



# 必填参数`Required<T>`

`Required` 是 TypeScript 提供的一个内置类型工具，用于**将对象类型中的所有可选属性变为必填**（`required`）

```typescript
interface UserInfo {
    name?: string;
    age?: number;
}

type CompleteUserInfo = Required<UserInfo>;

// 则
CompleteUserInfo = {
    name: string;
    age: number;
}
```

# `Readonly<T>`

所有属性变为只读

```typescript
Readonly<{a: number}> => {readonly a: number}
```



# `Record<K, T>`

`Record` 是一个工具类型，用于构造一个对象类型，其中所有的**属性键都是特定的类型**，并且所有的**属性值也都是特定的类型**

```typescript
Record<Keys, Type>
```

- `Keys`：一个属性键类型（通常是字符串、字符串字面量类型或联合类型）
- `Type`：属性值的类型

```typescript
type Scores = Record<string, number>;

const playerScores: Scores = {
    Alice: 100,
    // Carol: '300', // 错误：'300' 不是 number 类型
};
```





# 选择`Pick<T, K>`

`Pick` 是一个工具类型，用于从现有类型中挑选（或选择）某些属性，创建一个**新类型**。这个新类型只包含被选中的属性

```typescript
Pick<Type, Keys>
```

- `Type`：你要从中挑选属性的对象类型
- `Keys`：要挑选的属性的键（`key`），可以是一个或多个属性的联合类型

```typescript
interface UserInfo {
    id: number;
    name: string;
    age: number;
}

// 使用 Pick 只挑选 id 和 name 属性
type BasicUserInfo = Pick<UserInfo, 'id' | 'name'>;

const user: BasicUserInfo = {
    id: 1,
    name: 'Alice',
    // age: 30,     // 错误：'age' 属性在 BasicUserInfo 中不存在
};
```

```typescript
interface UserPreview extends Pick<UserInfo, 'id' | 'name'> {
    // 可以在此添加额外属性（如果需要）
}
```



# `Omit<T, K>`

排除部分属性

```typescript
type A = Omit<{a:1,b:2}, 'a'>
// A = {b: 2}

type B = Omit<{a:1,b:2}, 'a' | 'b'>
// B = {}
```



# `Exclude<T, U>`

从**联合类型**中排除

```typescript
type T0 = Exclude<'a' | 'b' | 'c', 'a'>
// type T0 = 'b' | 'c'

type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;
// type T1 = 'c'

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };
 
type T3 = Exclude<Shape, { kind: 'circle' }>
=>
type T3 = {
    kind: 'square';
    x: number;
} | {
    kind: 'triangle';
    x: number;
    y: number;
}
```



# `Extract<T, U>`

从联合类型中提取

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
// type T0 = 'a'

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };
 
type T2 = Extract<Shape, { kind: 'circle' }>
=>
type T2 = {
    kind: 'circle';
    radius: number;
}
```



# `NonNullable<T>`

排除 `null` 和 `undefined`

```typescript
type T1 = NonNullable<string[] | null | undefined>
// type T1 = string[]
```



# `Parameters<T>`

从一个函数类型 `T` 中提取其参数的类型，并将它们组成一个**元组类型（Tuple Type）**

```typescript
declare function f1(arg: { a: number; b: string }): void

type T0 = Parameters<() => string>
// type T0 = []

type T2 = Parameters<<T>(arg: T) => T>
// type T2 = [arg: unknown]
    
type T3 = Parameters<typeof f1>
type T3 = [arg: {
    a: number;
    b: string;
}]

type T4 = Parameters<any>
// type T4 = unknown[]
```



# `ConstructorParameters<T>`

与 `Parameters<T>` 类似，但专门用于**构造函数**。它提取构造函数类型的参数类型，组成一个元组类型

```typescript
class User {
    constructor(
        public id: number,
        public name: string,
        public isAdmin: boolean = false
    ) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// type UserConstructorParams = [id: number, name: string, isAdmin?: boolean]
```



# `ReturnType<T>`

获取**函数**返回值类型

```typescript
type T0 = ReturnType<() => string>
// type T0 = string

type T2 = ReturnType<<T>() => T>
// type T2 = unknown
```



# `InstanceType<T>`

获取**类实例**类型

```typescript
type T0 = InstanceType<typeof C>
// type T0 = C

type T1 = InstanceType<typeof Date>
// type T1 = Date
```



# `NoInfer<T>`

**阻止对所包含类型的推断**。除了阻断推理之外，`NoInfer<Type>`与`Type`完全相同

```typescript
function createStreetLight<C extends string>(
    colors: C[],
    defaultColor?: NoInfer<C>,    // defaultColor 的类型必须用前面 colors 推断出来的 C，而不能反向改变它
) {
    // ...
}
createStreetLight(['red', 'yellow', 'green'], 'red');   // ✅ C 推断为 'red' | 'yellow' | 'green'
createStreetLight(['red', 'yellow', 'green'], 'blue');  // ❌ 'blue' 不是 C
```

**没有 `NoInfer`** → 参数之间互相影响，`C` 可能被扩大成 `string`。

**加上 `NoInfer`** → 只根据 `colors` 推断 `C`，`defaultColor` 只能是这个集合里的值。



# 推断`infer`

`infer R` 是 TypeScript 类型系统中的一个关键字，用于在 **条件类型**中进行类型“**推断**”

```typescript
T extends SomeType<infer R> ? R : Fallback
```

- `infer R` 表示：**如果 T 能匹配 `SomeType<...>`，就从中提取出类型变量 R。**否则使用 `Fallback` 类型。

1. 提取 Promise 的值类型

   ```typescript
   type UnwrapPromise<T> = T extends Promise<infer R> ? R : T
   
   type A = UnwrapPromise<Promise<string>>  // string
   type B = UnwrapPromise<number>           // number
   ```

2. 提取函数返回值

   ```typescript
   type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never
   
   type F = () => number
   
   type Result = ReturnTypeOf<F> // number
   ```

3. 提取数组元素类型

   ```typescript
   type ElementType<T> = T extends (infer U)[] ? U : T
   
   type A = ElementType<string[]>   // string
   type B = ElementType<number[]>   // number
   type C = ElementType<boolean>    // boolean
   ```



# `This`

## `ThisParameterType<T>`

- **作用**：提取函数类型里 **`this` 参数**的类型。
- **用法场景**：需要知道函数绑定的 `this` 是什么。

```typescript
function say(this: { name: string }, msg: string) {
    console.log(this.name + ': ' + msg);
}

type T = ThisParameterType<typeof say>;
// { name: string }
```



## `OmitThisParameter<T>`

- **作用**：从函数类型里移除 `this` 参数。
- **用法场景**：比如想把有 `this` 的函数转成普通函数。

```typescript
function say(this: { name: string }, msg: string) {
    console.log(this.name + ': ' + msg);
}

type Fn = OmitThisParameter<typeof say>;
//    ^ (msg: string) => void

const fn: Fn = say.bind({ name: 'Tom' });
fn('hello'); // OK
```



## `ThisType<T>`

- **作用**：并不是一个真正的类型，而是 **对象字面量上下文里的 `this` 标注**。
- **用法场景**：常用于定义对象 API，告诉 TS “在这个对象的方法里 `this` 应该是什么类型”。

```typescript
type MyObject = {
    name: string;
    greet(): void;
} & ThisType<{ name: string }>;

const obj: MyObject = {
    name: 'Alice',
    greet() {
        console.log(this.name); // this 被推断为 { name: string }
    },
};
```

