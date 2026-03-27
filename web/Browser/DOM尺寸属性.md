# DOM 尺寸与位置属性总结

1. **元素尺寸（width / height）**
2. **元素位置（offset / client / scroll）**
3. **视口相关（viewport）**
4. **综合 API（getBoundingClientRect）**



## 1.元素尺寸

### :star: client 系列（content + padding）

| 属性           | 含义         | 包含内容          | 不包含             |
| -------------- | ------------ | ----------------- | ------------------ |
| `clientWidth`  | 元素内容宽度 | content + padding | border / scrollbar |
| `clientHeight` | 元素内容高度 | content + padding | border / scrollbar |

### :star: offset 系列（布局尺寸）

| 属性           | 含义               | 包含内容                               |
| -------------- | ------------------ | -------------------------------------- |
| `offsetWidth`  | 元素占据的实际宽度 | content + padding + border + scrollbar |
| `offsetHeight` | 元素占据的实际高度 | content + padding + border + scrollbar |

### :star: scroll 系列（滚动内容尺寸）

| 属性           | 含义                         |
| -------------- | ---------------------------- |
| `scrollWidth`  | 内容实际宽度（包括溢出部分） |
| `scrollHeight` | 内容实际高度（包括溢出部分） |

```typescript
if (el.scrollHeight > el.clientHeight) {
    // 有滚动
}
```



## 2.元素位置相关属性

### offset 系列（相对 offsetParent）

| 属性           | 含义                         |
| -------------- | ---------------------------- |
| `offsetTop`    | 相对 offsetParent 的顶部距离 |
| `offsetLeft`   | 相对 offsetParent 的左侧距离 |
| `offsetParent` | 最近的定位祖先元素           |

### :star: scroll 系列（滚动距离）

| 属性         | 含义         |
| ------------ | ------------ |
| `scrollTop`  | 垂直滚动距离 |
| `scrollLeft` | 水平滚动距离 |



## 3.视口（Viewport）相关

| 属性                                   | 含义                   |
| -------------------------------------- | ---------------------- |
| `window.innerWidth`                    | 视口宽度（包含滚动条） |
| `window.innerHeight`                   | 视口高度               |
| `document.documentElement.clientWidth` | 不含滚动条的视口宽度   |



## 4.getBoundingClientRect

```typescript
const rect = element.getBoundingClientRect()
```

| 属性     | 含义                            |
| -------- | ------------------------------- |
| `width`  | 元素宽度（含 padding + border） |
| `height` | 元素高度                        |
| `top`    | 距离视口顶部                    |
| `left`   | 距离视口左侧                    |
| `right`  | `left + width`                  |
| `bottom` | `top + height`                  |
| `x`      | 等同于 left                     |
| `y`      | 等同于 top                      |



## 5.核心对比总结表

| 属性                  | 包含 padding | 包含 border | 包含滚动内容 | 相对谁 |
| --------------------- | ------------ | ----------- | ------------ | ------ |
| clientWidth           | ✅            | ❌           | ❌            | 自身   |
| offsetWidth           | ✅            | ✅           | ❌            | 自身   |
| scrollWidth           | ✅            | ❌           | ✅            | 自身   |
| getBoundingClientRect | ✅            | ✅           | ❌            | 视口   |