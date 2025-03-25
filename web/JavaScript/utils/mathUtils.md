# 区间内的值

让 x 始终居与 [0, 100] 之间

x 默认取值 x ，当 x < 0 取 0 ，当 x > 100 取 100 ，

```javascript
/**
 * @description 获取一个区间内的值
 * @param { number } num 需要处理的值
 * @param { number } min 区间最小值
 * @param { number } max 区间最大值
 * @returns { number }
 */
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)
```



# 区间随机整数

```typescript
/**
 * @description 获取一个区间内的随机整数
 * @param { number } min 区间最小整数
 * @param { number } max 区间最大整数
 * @returns { number } 区间内的随机整数
 */
export const randomIntInRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
```

