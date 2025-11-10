# nextTick

```html
<input type="text"
    maxlength="11"
    :value="phone"
    @input="handleChangePhone($event)"
    @blur="phoneFormat(true)"
    placeholder="请输入手机号码"
>
```

```ts
/**
 * 输入手机号触发，只允许数字输入
 * @param event 
 */
const handleChangePhone = (event: Event) => {
    const phoneValue = (event.target as HTMLInputElement).value
    phone.value = phoneValue
    // 这里必须赋值，nextTick需要在页面更新之后才会执行
    nextTick(() => {
        phone.value = phoneValue.replace(/[\D]+/g, '').trim()
    })
}
```



# v-model

```html
<input
    type="text"
    maxlength="6"
    v-model="code"
    @input="handleChangeCode($event)"
    @blur="codeFormat(true)"
    placeholder="请输入验证码"
    @keyup.enter="handleLogin"
>
```

```ts
/**
 * 输入验证码时触发
 * @param event 
 */
const handleChangeCode = (event: Event) => {
    const codeValue = (event.target as HTMLInputElement).value
    // v-model自带渲染更新。故而不需要使用 nextTick()
    code.value = codeValue.replace(/[\D]+/g, '').trim()
}
```

