# \<a/>

1. 空跳转

   ```html
   <a href="javascript:void(0);"></a>
   ```

   ```html
   <a href="#"></a>
   ```

2. 阻止默认行为

   ````typescript
   event.preventDefault()     // 阻止事件的默认行为
   event.stopPropagation()    // 防止事件冒泡到
   ````

   