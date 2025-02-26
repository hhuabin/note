# 范围内的数

让 x 始终居与 [0, 100] 之间

x 默认取值 x ，当 x < 0 取 0 ，当 x > 100 取 100 ，

```javascript
/**
 * 把一个值限制在一个上限和下限 ([min, max]) 之间
 * @param { number } num 需要处理的值
 * @param { number } min 区间最小值
 * @param { number } max 区间最大值
 * @returns { number }
 */
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max)
```

