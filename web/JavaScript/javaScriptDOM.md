# DOM

Document Object Model：文档对象模型 



# 查找HTML元素

1. 根据 **Id** 查找

   ```javascript
   document.getElementById()
   ```

2. 根据 **标签** 查找

   ```javascript
   document.getElementByTagName()
   ```

3. 根据 **类名** 查找

   ```javascript
   document.getElementByClassName()
   ```



# 改变HTML元素

1. innerHTML

   ```javascript
   element.innerHTML = "你好"
   ```



# HTML元素的增、删、改

1. createElement

   ```javascript
   document.createElement(element)
   ```

2. removeChild

   ```javascript
   document.removeChild(element)
   ```

3. appendChild

   ```javascript
   document.appendChild(element)
   ```

4. replaceChild

   ```javascript
   document.replaceChild(element)
   ```

5. write

   ```javascript
   document.write(text)
   ```



# 事件

1. onclick

   ```javascript
   document.getElementById().onclick = function() {}
   ```



# 匹配元素

## `closest(selectors)`

[Element.closest()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest "MDN") 方法用来获取：匹配特定选择器且离当前元素最近的==**祖先元素**==（也可以是当前元素本身）。如果匹配不到，则返回 `null`

| 方法                 | 方向 | 匹配数量 | 包含自身检查 | 返回类型        |
| :------------------- | :--- | :------- | :----------- | :-------------- |
| `closest()`          | 向上 | 第一个   | 是           | Element 或 null |
| `querySelector()`    | 向下 | 第一个   | 否           | Element 或 null |
| `querySelectorAll()` | 向下 | 所有     | 否           | NodeList        |
| `parentElement`      | 向上 | 直接父级 | 否           | Element 或 null |

1. **单向查找**：只从当前元素开始**向上**（向父级方向）查找
2. **首次匹配**：返回**第一个**（最近的）匹配到的祖先元素
3. **单结果返回**：即使DOM树上方有多个元素满足条件，也只返回最近的那个
4. **自包含检查**：会先检查当前元素本身是否匹配

```jsx
<div id="app">
    <section class="user-profile">
        <div class="avatar-container">
            <img src="avatar.jpg" class="avatar">
        </div>
    </section>
</div>


const avatar = document.querySelector('.avatar');

// 使用不同类型的选择器
avatar.closest('img');              // 返回 avatar 自己
avatar.closest('.avatar-container'); // 返回父 div
avatar.closest('section');          // 返回 section 元素
avatar.closest('#app');             // 返回 id="app" 的 div
avatar.closest('[class]');          // 返回最近的带有 class 属性的元素
```



**长列表事件委托**

```tsx
const handleClick = (event: React.MouseEvent) => {
    const listItem = (event.target as HTMLElement).closest('li')
    if (listItem) {
        const { orderId } = listItem.dataset
    }
}

<ul
    role="list"
    onClick={(event) => handleClick(event)}
>
    <li
        className="w-full active:opacity-70"
        key={index}
        data-orderId={orderId}
    ></li>
</ul>
```

