

# 阻止默认行为

在触摸事件（如 `touchstart`、`touchmove`）或滚动事件（如 `wheel`）中，浏览器需要知道是否可以立即执行默认行为（比如滚动页面）。**如果事件处理函数会调用 `preventDefault()` 来阻止默认行为**，浏览器就必须等到 JavaScript 执行完毕后再决定是否允许页面滚动。这个等待会导致性能瓶颈，特别是在滚动时，可能会导致页面卡顿



## `event.preventDefault()`

```typescript
/**
 * 阻止默认事件
 * @param event 事件
 * @param shouldStopPropagation 停止事件传播
 */
const preventDefault = (event: Event, shouldStopPropagation = false) => {
    // 是否可以取消，如scroll事件不可取消
    if (event.cancelable !== false) {
        event.preventDefault()
    }
    if (shouldStopPropagation) {
        event.stopPropagation()
    }
}
```



## passive

`passive` 是一个事件监听器选项，用于指示浏览器该事件处理函数不会调用 `event.preventDefault()`。通过将事件监听器标记为 `passive`，浏览器可以提前知道事件不会调用 `preventDefault()`，从而 **立即执行默认行为**（如滚动），从而提升页面响应速度，尤其是在移动设备上

对于滚动事件，设置 `passive: true` 可以大大提高页面的滚动性能

```javascript
element.addEventListener('touchmove', handleTouchMove, { passive: true });
```

- **`passive: true`**：表示事件处理函数不会调用 `event.preventDefault()`。当设置为 `true` 时，浏览器可以**立即执行默认行为**（比如页面滚动）而不需要等待事件处理函数。
- **`passive: false`**：表示事件处理函数可能会调用 `event.preventDefault()` 来阻止默认行为。此时，浏览器会等待事件处理函数执行完毕后再决定是否执行默认行为（如滚动）

---

**禁止同时使用 `passive: true` 和 `preventDefault()`**，选一个使用吧。建议使用`{ passive: true }`

当你需要调用 `event.preventDefault()` 来阻止默认行为时，不能使用 `{ passive: true }`，因为它表示你不会调用 `preventDefault()`。如果**同时使用 `passive: true` 和 `preventDefault()`，浏览器会抛出警告**

 :bell: ：`React` 合成事件一般会加上 `passive: true`，所以可以不用调用 `event.preventDefault()`

