# Table

```html
<table>
    <tr>
        <th>表头1</th>
        <th>表头2</th>
    </tr>
    <tr>
        <td>数据1</td>
        <td>数据2</td>
    </tr>
</table>
```

## 主要元素

1. **`<table>`**: 定义表格容器
2. **`<tr>`**: 定义表格行 (table row)
3. **`<td>`**: 定义表格数据单元格 (table data)
4. **`<th>`**: 定义表头单元格 (table header)，通常加粗居中显示



## 高级元素和属性

### 表格分组

```html
<table>
    <thead> <!-- 表头部分 -->
        <tr><th>姓名</th><th>年龄</th></tr>
    </thead>
    <tbody> <!-- 表格主体 -->
        <tr><td>张三</td><td>25</td></tr>
        <tr><td>李四</td><td>30</td></tr>
    </tbody>
    <tfoot> <!-- 表尾部分 -->
        <tr><td>总计</td><td>2人</td></tr>
    </tfoot>
</table>
```



### 合并单元格

- `colspan`: 水平合并单元格
- `rowspan`: 垂直合并单元格

```html
<tr>
    <td colspan="2">跨两列</td>
</tr>
<tr>
    <td rowspan="2">跨两行</td>
    <td>数据</td>
</tr>
```



### 表格边框

```css
table {
    border: 1px solid #333;
    border-collapse: collapse;  /* 合并边框 */
    width: 100%;
}

td, th {
    border: 1px solid #ddd;    /* 单元格边框 */
}
```

