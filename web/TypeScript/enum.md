# 定义枚举

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

**默认值**：默认情况下，它们的值是从 0 开始的索引值，依次递增

```typescript
Direction.Up = 0
Direction.Down = 1
Direction.Left = 2
Direction.Right = 3

let playerDirection: Direction = Direction.Right;    // playerDirection类型可以是 Direction | number
console.log(playerDirection); // 输出：3
```



# 自定义枚举

枚举的元素通常是**数字或字符串等基本类型的值**，尽量避免在枚举中使用对象作为元素

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

let playerDirection: Direction = Direction.Right;
console.log(playerDirection); // 输出：RIGHT
```



