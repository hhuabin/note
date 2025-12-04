# 非受控组件

浏览器原生 `form` 有太多默认行为（如 `Enter` 隐式提交、`onsubmit`、`reset`），不建议开发时候使用**非受控组件**。除非功能足够简单，如一个简单的 `search input`

| 默认行为                  | 影响                       |
| ------------------------- | -------------------------- |
| Enter 隐式提交            | 最容易导致“为什么提交了？” |
| submit 默认触发           | 任何提交动作都会触发       |
| button 默认 type=submit   | 点击普通按钮也提交         |
| reset 恢复初始值          | 意外清空 form              |
| form.name 变为全局变量    | 可能覆盖变量、方法         |
| form.elements 自动收集    | 可能覆盖 submit/reset      |
| 单输入自动提交            | 单 input 必定自动提交      |
| input type=image 自动提交 | 含 image 也能提交          |
| file input 的特殊性       | 无法通过 JS 操作           |
| 默认提交刷新页面          | 看起来像“被清空”           |

千万不要乱用，记得过来吗你就用

# `form`

```html
<form action="/api/submit" method="POST">
    <input name="username">
    <button type="submit">提交</button>
</form>

<!-- 提交链接：/api/submit?username= -->
```



| 特性         | **`onsubmit`**                           | **`action`**                  |
| :----------- | :--------------------------------------- | :---------------------------- |
| **类型**     | **事件处理函数**（JavaScript）           | **属性**（HTML）              |
| **作用**     | **提交前执行代码**                       | **指定提交目的地**            |
| **时机**     | 提交发生时，数据发送前                   | 提交发生后，浏览器导航到该URL |
| **返回值**   | `true`（继续提交）或 `false`（阻止提交） | 无返回值                      |
| **默认行为** | 无，需要手动定义                         | 提交到指定URL                 |



## `onsibmit`

1. 使用 `onsibmit`

   ```html
   <!-- onsubmit：告诉表单"提交时做什么" -->
   <form onsubmit="return validateForm()">
   ```

   `return validateForm() `一定要这样子调用，`validateForm` 返回的 `true` 和 `false` 才有用

   不可以使用 `onsubmit="validateForm()"`或`onsubmit="validateForm"`，所以实际开发中更建议使用 `addEventListener`

   - 有括号：调用函数
   - 无括号：引用函数
   - 有return：传递返回值
   - 无return：返回值被丢弃

2. `Enter` 隐式提交

   `form` 表单中`<input type="text">`等可以输入的`input`标签内的 `Enter` 会触发 `onsibmit` 事件。（`textarea`的`Enter`不会触发）

   1. 当表单中只有**一个**可输入的 `input` 标签，会触发 `onsibmit` 事件

      ```html
      <!-- Enter 会触发 onsibmit -->
      <form>
          <input type="text" />
          <button type="button">按钮</button>
      </form>
      
      <!-- Enter 不会触发 onsibmit -->
      <form>
          <input type="text" />
          <input type="text" />
          <button type="button">按钮</button>
      </form>
      ```

   2. `<button type="submit">`表单里面有 `submit` 按钮，会触发 `onsibmit` 事件

      ```html
      <!-- Enter 会触发 onsibmit -->
      <form>
          <input type="text" />
          <input type="text" />
          <button type="submit">按钮</button>
      </form>





### `React` 中的 `onsibmit`

```tsx
<form onSubmit={e => e.preventDefault()} action="/api/test">
    <input name="data" defaultValue="测试数据" />
    <button type="submit">提交测试</button>
</form>
```

`React` 只会在意 `handleSubmit` 中是否调用了 `e.preventDefault()`，`handleSubmit` 是否返回 `false` 不影响表单提交



## `action`

```html
```



## `reset`

表单中的 `reset` 按钮会清空表单输入

```html
<form>
    <!-- 触发 reset -->
    <button type="reset">Reset</button>
    
    <!-- 亲测：以下按钮在javascript中就算配置了 reset 函数，点击触发的也是 form 的 reset -->
    <button type="button" onclick="reset()">重置</button>
</form>
```



# `label`

1. `CSS` 默认样式

   ```css
   /* label 有默认样式 */
   label {
       cursor: pointer; /* 默认显示手型光标 */
       display: inline; /* 默认行内元素 */
       font-weight: normal;
   }
   ```

2. 应用于表单字段，点击标签聚焦输入框（重要特性）

   ```html
   <!-- 点击"用户名"文字也能聚焦到输入框 -->
   <label for="email">邮箱地址：</label>
   <input id="email" type="email">
   
   <!-- 或用包裹形式 -->
   <label>
       邮箱地址：
       <input type="email">
   </label>
   ```

   `React` 中的 `for` 是 `htmlFor`

   ```tsx
   <form onSubmit={handleSubmit}>
       <label htmlFor="email">邮箱地址：</label>
       <input id="email" type="email">
   </form>
   ```

3. 提供额外的点击区域

   ```html
   <!-- ✅ label 提供可点击区域 -->
   <label>
       <input type="radio" name="gender" value="male">
       <span>男性</span>
   </label>
   ```



# 浏览器自动记住账号密码

1. ✅ 必须是 `<form>` 表单 + `type="password"`

   浏览器只会在检测到 **form 提交** + **密码输入框** 时触发提示。

   ```html
   <form action="/login" method="POST">
       <input name="username" type="text" autocomplete="username" />
       <input name="password" type="password" autocomplete="current-password" />
       <button type="submit">登录</button>
   </form>
   ```

2. ✅ input 必须有 **name 属性**

   没有 `name` 的输入，浏览器不会记住。

3. ✅ 正确配置 `autocomplete`

   浏览器靠这个判断字段用途。

   | 场景           | 用户名                    | 密码                              |
   | -------------- | ------------------------- | --------------------------------- |
   | **登录页**     | `autocomplete="username"` | `autocomplete="current-password"` |
   | **注册页**     | `autocomplete="username"` | `autocomplete="new-password"`     |
   | **修改密码页** | old: `current-password`   | new: `new-password`               |

4. ✅ 登录必须通过 `<button type="submit">` 触发表单提交

   如果你用 JS 手动提交而不触发表单事件，有些浏览器不会弹提示。

   ```html
   <button type="submit">登录</button>
   ```