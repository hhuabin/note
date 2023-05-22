# addEventListener

```javascript
element.addEventListener(event, function, useCapture=false);
```

- element：要添加事件监听器的目标对象，可以是 DOM 元素、文档对象或窗口对象。

  ```javascript
  const button = document.querySelector('.button');
  
  // 添加 click 事件监听器
  button.addEventListener('click', (event) => {});
  ```

- 第一个参数是事件的类型（比如 "click" 或 "mousedown"）。

- 第二个参数是当事件发生时我们需要调用的函数。可以是匿名函数，但匿名函数无法通过 `removeEventListener` 移除

- 第三个参数是布尔值，指定使用事件冒泡还是事件捕获。此参数是可选的。

  默认值是 `false`，将使用冒泡传播，如果该值设置为 `true`，则事件使用捕获传播。

**注意：**请勿对事件使用 "on" 前缀；请使用 "click" 代替 "onclick"。



# removeEventListener

通过 `addEventListener` 添加的事件处理程序只能使用 `removeEventListener` 并传入与添加时**相同的参数**来移除。这意味着，如果添加时使用的是**匿名函数无法移除**

```javascript
element.removeEventListener("click", function, useCapture);
```