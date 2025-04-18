# Partial

`Partial` 是 TypeScript 提供的一个内置类型工具，用于**将对象类型中的所有属性变为可选**（`optional`）

```typescript
interface UserInfo {
    name: string;
    age: number;
}

let userInfo: UserInfo = {
    name: "";
    age: "";
}

const updateUserInrfo = (info: Partial<UserInfo>) => {
	userInfo = {...userInfo, ...info}
}

changeUserInrfo({name: "bin"})
```



# Required

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



# Record

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





# Pick

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
interface UserPreview extends Pick<UserInfo, "id" | "name"> {
    // 可以在此添加额外属性（如果需要）
}
```

