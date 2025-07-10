# grid

当 HTML 元素的 `display` 属性设置为 `grid` 或 `inline-grid` 时，它就会成为网格容器

```css
.grid-container {
	display: grid;
    // display: inline-grid;
}
```

- `column-gap`：网格列间隙

  ```css
  .grid-container {
      display: grid;
      column-gap: 50px;
  }
  ```

- `row-gap`：网格行间隙

  ```css
  .grid-container {
      display: grid;
      row-gap: 50px;
  }
  ```

- `grid-gap`：`column-gap`和`row-gap`的简写

  ```css
  .grid-container {
      display: grid;
      grid-gap: 50px 100px;
  }
  
  // 或者
  .grid-container {
      display: grid;
      grid-gap: 50px;
  }
  ```

   

# `grid-template-columns`、`grid-template-rows`

## `grid-template-columns`、`grid-template-rows`

**设置模板的行列数目**

fr：浮动宽度

1. 指定列数，及列宽度

   ```css
   // 两列，每列宽100px
   grid-template-columns: 100px 100px;
   
   // 三列，每列宽100px
   grid-template-columns: 100px 100px 100px;
   
   // 三列，每列等宽
   grid-template-columns: 1fr 1fr 1fr;
   
   // 三列，中间列占比50%
   grid-template-columns: 1fr 2fr 1fr;
   ```

2. repeat函数

   ```css
   // 两列，每列等宽
   grid-template-columns: repeat(2, 1fr);
   ```

3. 自动布局

   ```css
   // 最小宽100px, 最大1fr
   // 以最小100px尽可能的向上布局
   grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
   ```

   | 关键词        | 会折叠空列         | 最终是否铺满整行 | 推荐场景     |
   | ------------- | ------------------ | ---------------- | ------------ |
   | `auto-fit` ✅  | ✅ 会自动“压缩”空列 | ✅ 会铺满整行     | ✅ 推荐使用   |
   | `auto-fill` ❌ | ❌ 会保留空列       | ❌ 可能留白       | 特殊布局需求 |



## `grid-auto-columns`、`grid-auto-rows`

设置行列的单元大小

`grid-auto-columns` 用于设置 **隐式创建的网格列**（即超出 `grid-template-columns` 定义的列）的默认大小。即`grid-template-columns`未指定的列宽

`grid-auto-rows` 用于设置 **隐式创建的网格行**（即超出 `grid-template-rows` 定义的列）的默认大小

可选值：

- `grid-auto-columns: 100px;`：所有隐式列宽固定为 100px
- `grid-auto-columns: 20%;`：隐式列占容器宽度的 20%
- `grid-auto-columns: min-content;`：列宽 = 该列所有单元格中 **最大内容宽度**（不换行时的完整宽度）。
- `grid-auto-columns: auto;`：默认值，列宽由浏览器决定（通常类似 `max-content`，但受 `min-width`/`max-width` 影响）
- 

```css
// 第一、二行列宽100px，第三列及以后宽200px
.grid-container {
    display: grid;
    grid-template-columns: 100px 100px;
    grid-auto-columns: 200px;
}
```



# 网格占比

```css
// 从第一列开始，第三列结束
grid-column-start: 1;
grid-column-end: 3;

// 简写
grid-column: 1 / 3;
```

```css
// 从第一行开始，第三行结束
grid-rows-start: 1;
grid-rows-end: 3;

// 简写
grid-rows: 1 / 3;
```



# repeat()

```css
repeat(count, value)
```

创建重复的网格轨道（列或行）。可以定义固定的重复次数，也可以结合 `auto-fit` 或 `auto-fill` 来实现自适应

- `auto-fit`：在容器中尽可能地填满列，当列的宽度超过容器宽度时，列会收缩
- `auto-fill`：始终填满网格容器，即使容器中有多余的空间，也不会改变列数，会留空格
- `minmax(200px, 1fr)`：定义列的最小值和最大值。在这个例子中，列的最小宽度为 `200px`，最大宽度为 `1fr`
