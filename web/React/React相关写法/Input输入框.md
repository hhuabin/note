# Input输入格式控制

```tsx
const handleChangeIdNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idNumValue = event.target.value
    const reg = /[0-9]+|X|x/ig
    const _idNum = idNumValue.match(reg)?.join('') || ''
    setIdNum(_idNum)
    idNumFormat(false, _idNum)
}
```

==Bug：当输入法是拼音的时候，`_idNum`的值是截取之后的数字(相较输入框，字符长度变小了)，但是输入框会记住已输入的拼音，从而拼音会覆盖数字的长度==



# 防止`XSS`诸如攻击

- 使用`escapeHTML`对输入字符串进行过滤

  ```typescript
  // 需要被转义的字符组成的对象 &<>"'`=/
  const escapeChar: Record<string, string> = {
      // 支持 HTML 文本节点
      '&': '&amp;',            // 防止 &lt; 还原成 <
      '<': '&lt;',             // 阻止标签注入
      '>': '&gt;',             // 结束标签
      '"': '&quot;',           // 阻止属性注入
      '\'': '&#039;',          // 阻止属性注入
  
      // 支持 HTML 属性、URL、JS 字符串、CSS 字符串
      '`': '&#x60;',           // 防止模板字符串注入
      '=': '&#x3D;',           // 防止属性注入和结束标签
      '/': '&#x2F;',           // 防止属性注入和结束标签
  }
  
  /**
   * @description HTML 字符串过滤
   * @param { string } str 待过滤的字符串
   * @returns { string } 过滤后的字符串
   */
  export const escapeHTML = (str: string): string => str.replace(/[&<>"'`=/]/g, char => (escapeChar[char] || char))
  
  ```

  





# 中文输入法事件

- `onCompositionStart`：用户开始使用输入法
- `onCompositionUpdate`：用户正在进行组合输入（例如输入拼音时）
- `onCompositionEnd`：用户完成组合输入，输入法提交内容

主要用于处理输入法开始组合输入的情况，比如中文拼音输入法的输入过程

```tsx
const Home: React.FC = () => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isComposition.current) return
        console.log("handleChange", event.target.value)
        setValue(event.target.value)
    }

    const handleCompositionStart = (event: React.CompositionEvent<HTMLInputElement>) => {
        console.log("handleCompositionStart", event)
        isComposition.current = true
    }

    const handleCompositionEnd = (event: React.CompositionEvent<HTMLInputElement>) => {
        isComposition.current = false
        console.log("handleCompositionEnd", event.currentTarget.value)
        setValue(event.currentTarget.value)
    }

    return (
        <input
            onChange={event => handleChange(event)}
            onCompositionStart={event => handleCompositionStart(event)}
            onCompositionEnd={event => handleCompositionEnd(event)}
            type="text"
        />
    )
}
```

用 `isComposition` 判定是否为输入法输入，是则不触发`setValue`



# `type`&`inputMode`

<table>
    <tr style="text-align:center;">
        <td>组合</td> 
        <td>默认弹起键盘</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="text" inputmode="numeric"</td>    
        <td rowspan="3">弹起数字键盘</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="text" inputmode="decimal"</td>  
    </tr>
    <tr>
        <td style="color:deeppink;">type="tel" inputmode="tel"</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="text" inputmode="text"</td>    
        <td rowspan="4">弹起 拼音/英文 输入键盘</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="search" inputmode="search"</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="email" inputmode="email"</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="url" inputmode="url"</td> 
    </tr>
    <tr>
        <td style="color:deeppink;">type="text" inputmode="none"</td>    
        <td rowspan="4">不弹起键盘，自定义键盘</td> 
    </tr>
</table>




# `enterKeyHint`键盘回车键显示

| enterKeyHint参数值 | 移动端键盘右下角文字                                         |
| ------------------ | ------------------------------------------------------------ |
| `enter`            | 回车符                                                       |
| `done`             | "完成" 或 "Done"                                             |
| `go`               | "开始" 或 "Go"                                               |
| `next`             | "下一步" 或 "Next"                                           |
| `previous`         | "上一步" 或 "Prev"                                           |
| `search`           | 搜索图案                                                     |
| `send`             | "发送" 或 "Send"                                             |
| `undefined`        | 默认为 "开始" 或 "Go"<br />当输入框下还有输入框时，显示为"下一步"，点击跳转至下一个输入框 |

```tsx
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        submitMessage()
    }
}

return (
    <input
        enterKeyHint='next'
        onChange={event => handleChangeName(event)}
        onKeyDown={event => handleKeyDown(event)}
    ></input>
)
```