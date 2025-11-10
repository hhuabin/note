# Number

- `Number.MAX_VALUE`：能表示的最大正数。

- `Number.MIN_VALUE`：能表示的最小正数即最接近 0 的正数（实际上不会变成 0）。

- `Number.isNaN`：判断传入的值是否为 `NaN`。

- `Number.parseFloat`：与全局函数 `parseFloat()` 相同，函数解析一个参数（必要时先转换为字符串）并返回一个浮点数。

- `Number.parseInt`：与全局函数 `parseInt(string, radix)` 相同，解析一个字符串并返回指定基数的十进制整数

- `Number.prototype.toFixed()`：使用定点表示法来格式化该数值。（保留几位小数）

  ```javascript
  const number = 3.1415926;
  const roundedNumber = number.toFixed(2);
  ```



# Math 对象的方法

- `Math.abs(x)`：返回 x 的绝对值。

- `Math.round(x)`：把 x 四舍五入为最接近的整数。

- `Math.floor(x)`：返回小于等于 x 的最大整数。

- `Math.ceil(x)`：返回大于等于 x 的最小整数。

- `Math.pow(x, y)`：返回 x 的 y 次幂。

- `Math.sqrt(x)`：返回 x 的平方根。

- `Math.random()`：返回一个 0 到 1 之间的随机数，返回值是在区间 [0, 1)

  ```javascript
  // 返回min - max的随机数
  Math.floor(Math.random() * (max - min + 1)) + min;
  ```

- `Math.min(x, y, ...)`：返回传入参数的最小值。

- `Math.max(x, y, ...)`：返回传入参数的最大值。



# 三角函数

- `Math.sin(x)`：返回 x 的正弦值。
- `Math.cos(x)`：返回 x 的余弦值。
- `Math.tan(x)`：返回 x 的正切值。
- `Math.asin(x)`：返回 x 的反正弦值。
- `Math.acos(x)`：返回 x 的反余弦值。
- `Math.atan(x)`：返回 x 的反正切值。



# 其他数学函数

- `Math.log(x)`：返回 x 的自然对数。
- `Math.exp(x)`：返回 e 的 x 次幂。
- `Math.PI`：代表圆周率 π。