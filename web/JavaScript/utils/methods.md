# 范围内的数

让 x 始终居与 [0, 100] 之间

x 默认取值 x ，当 x < 0 取 0 ，当 x > 100 取 100 ，

```javascript
获取中间数值
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

clamp(0, x, 100)
```

