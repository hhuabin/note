# flex

默认值：

```css
flex: 0 1 auto;
```

- none：`flex: 0 0 auto;`
- 1：`flex: 1 1 0%;`



## flex-grow

**`flex-grow`：** 控制项目的放大比例。默认值为 0，即不放大。如果所有项目的 `flex-grow` 都为 1，则它们会等分剩余空间

```css
flex-grow: 1;
```

## flex-shrink

**`flex-shrink`：** 控制项目的缩小比例。默认值为 1，即可以缩小。如果所有项目的 `flex-shrink` 都为 0，则它们不会缩小

```css
flex-shrink: 0;
```

## flex-basis

**`flex-basis`：** 定义了在分配多余空间之前，项目占据的主轴空间。可以设置具体的长度值或百分比

```css
flex-basis: 200px;
```



# order

`order` 值必须是数字，默认值是 0

`order` 属性可以改变 flex 项目的顺序

```html
<div class="flex-container">
    <div style="order: 3">1</div>
    <div style="order: 2">2</div>
    <div style="order: 4">3</div> 
    <div style="order: 1">4</div>
</div>
```



# flex-direction

`flex-direction` 是 Flexbox 布局中用于设置主轴的方向的属性。它决定了 Flex 容器内 Flex 项目的排列方式

- **`row`：** 默认值。主轴为水平方向，项目水平排列
- **`row-reverse`：** 主轴为水平方向，项目水平反向排列
- **`column`：** 主轴为垂直方向，项目垂直排列
- **`column-reverse`：** 主轴为垂直方向，项目垂直反向排列



# flex-wrap

`flex-wrap` 是 Flexbox 布局中用于控制项目是否换行的属性。它决定了 Flex 容器内的 Flex 项目是在单行还是多行上进行排列

- **`nowrap`：** 默认值。所有 Flex 项目都在一行上排列，可能导致溢出
- **`wrap`：** Flex 项目将在多行上排列，根据需要换行
- **`wrap-reverse`：** Flex 项目将在多行上排列，但反向换行



# justify-content

- **`flex-start`：** 默认值，项目位于容器的开头
- **`flex-end`：** 项目位于容器的结尾
- **`center`：** 项目位于容器的中心
- **`space-between`：** 项目平均分布在容器内，首尾项目分别位于容器的开头和结尾
- **`space-around`：** 项目平均分布在容器内，项目之间有相等的空间，同时首尾项目到容器边缘的距离是其他项目之间的一半
- **`space-evenly`：** 项目平均分布在容器内，包括首尾项目到容器边缘的距离
- **`stretch`：** 默认值。如果项目未设置固定尺寸，它将被拉伸以填充整个容器



# justify-items

- **`start`：** 网格项沿主轴起始位置对齐
- **`end`：** 网格项沿主轴结束位置对齐
- **`center`：** 网格项沿主轴居中对齐
- **`stretch`：** 默认值。网格项沿主轴拉伸以填充网格容器
- **`auto`：** 网格项的对齐方式由其自身的 `align-self` 属性决定



# justify-self





# align-content

- **`stretch`：** 默认值。网格行将沿着交叉轴被拉伸以填充网格容器
- **`start`：** 网格行沿着交叉轴的起始位置对齐
- **`end`：** 网格行沿着交叉轴的结束位置对齐
- **`center`：** 网格行沿着交叉轴的中心位置对齐
- **`space-between`：** 网格行平均分布在网格容器内，首尾行分别位于容器的起始和结束位置
- **`space-around`：** 网格行平均分布在网格容器内，行之间有相等的空间，同时首尾行到容器边缘的距离是其他行之间的一半
- **`space-evenly`：** 网格行平均分布在网格容器内，包括首尾行到容器边缘的距离



# align-items

- **`stretch`：** 默认值。项目将被拉伸以填充整个交叉轴
- **`flex-start`：** 项目沿着交叉轴的起始位置对齐
- **`flex-end`：** 项目沿着交叉轴的结束位置对齐
- **`center`：** 项目沿着交叉轴的中心位置对齐
- **`baseline`：** 项目沿着它们的基线对齐



# align-self

`align-self` 属性将覆盖容器的 align-items 属性所设置的默认对齐方式

```html
<div style="align-items: flex-start">
    <div>1</div>
    <div>2</div>
    <div style="align-self: center">3</div>
    <div>4</div>
</div>
```

