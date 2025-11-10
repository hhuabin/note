# + - × ÷四则运算

1. `+`、`-`  要求这两个数都是长度，`+`、`-` 要加前后空格

   ```css
   width: calc(100% - 20px);
   ```

2. 除法`/`要求第二个数字是无单位的

   ```css
   width: calc(20px / 2);
   ```

3. 乘法`*`要求其中一个数是无单位的

   ```css
   width: calc(50px * 5);
   ```

4. 除法`/`要求第二个数字是无单位的

   ```css
   width: calc(50px / 5);
   ```



# calc

1. 可以嵌套

   ```css\
   width: calc( 100% / calc(100px * 2) );
   ```

2. 使用变量

   ```css
   :root {
     --main-width: 200px;
   }
   width: calc(var(--main-width) * 2);
   ```

3. 可以使用各种单位（如 `px`、`em`、`rem`、`%` 等）进行计算。

   ```css
   width: calc(50% + 20px / 2 - 10%);
   ```



# css 变量

```css
--length: 200px;
height: var(--length);
```

