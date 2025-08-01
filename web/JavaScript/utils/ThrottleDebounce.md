# 防抖节流工具函数

```typescript
export default class ThrottleDebounce {
    // 非组件函数使用时使用, 此时 timerId 在全局生效，全局只能执行一个 debounce
    // private static timerId: NodeJS.Timeout | null = null
    // private static lastTime = Date.now()

    /**
     * @description 防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @param { boolean } immediate 立即执行
     * @returns { Function } debounced防抖函数
     */
    public static debounce = <T>(callback: (...args: Array<T>) => void, delay = 500, immediate = false) => {
        // 一个函数绑定一个 timerId 可以分开执行
        /**
         * 在 React 中，不使用 useRef 的话
         * 组件的每次状态更新，都会被重置 timerId 为 null，导致上一个还未发生的 timerId 无法被 clear
         */
        let timerId: NodeJS.Timeout | null = null
        const debounced = (...args: Array<T>) => {
            if (timerId) clearTimeout(timerId)
            if (immediate) {
                const callNow = !timerId
                if (callNow) callback(...args)
                timerId = setTimeout(() => {
                    timerId = null
                }, delay)
            } else {
                timerId = setTimeout(() => {
                    callback(...args)
                    // 在 React 函数组件中，this 通常没有明确的意义，此处省略处理 this 的逻辑
                    // callback.call(this, ...args)
                    timerId = null
                }, delay)
            }
        }

        // 取消防抖执行，可在组件卸载时执行
        debounced.cancel = () => {
            if (timerId) {
                clearTimeout(timerId)
                timerId = null
            }
        }

        return debounced
    }

    /**
     * @description 函数节流：一个函数执行完后只有大于设定时间才会再次执行第二次  (节约浏览器资源)
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @returns { Function } throttled节流函数
     */
    public static throttle = <T>(callback: (...args: Array<T>) => void, delay = 200) => {
        let lastTime = Date.now()
        return (...args: Array<T>) => {
            const nowTime = Date.now()
            if (nowTime - lastTime > delay) {
                callback(...args)
                // callback.apply(this, args)
                lastTime = nowTime
            }
        }
    }
}
```



## 在react中使用

 :bell:  在React中通过，每次更新state都会触发函数的重新执行，如`debounce()`会被重新执行，返回新的函数，这样会造成两个问题

1. `timerId`将会被赋值为`null`。如当前`timerId=15`，重新执行函数`timerId=null`，`if (timerId)`不是`true`导致不会执行`clearTimeout(15)`，`timerId=15`的定时器将会被执行，而新`timerId`的定时器也会被执行。导致`timerId=15`定时器防抖失败。

   解决办法：可以用下面的代码的`useRef`解决。

2. 旧的函数因为闭包问题可能会造成内存泄漏。故而需要使用`useCallback`缓存起来

   解决办法：`useCallback(ThrottleDebounce.debounce(() => {}， 1000), [dependencies])`，`dependencies`：防抖函数使用到的依赖数组，不写会取旧值

解决办法有：

1. 使用`useRef`缓存`timerId`，保证`timerId`不会被重新定义为`null`
2. 使用`useCallback`缓存`ThrottleDebounce.debounce()`，确保函数不会被重新创建
3. `ThrottleDebounce`类一定要使用`useRef`，不然一定会造成防抖失败

```typescript
import { useRef } from 'react'

export default class ThrottleDebounce {
    // 非组件函数使用时使用, 此时 timerId 在全局生效，全局只能执行一个 debounce
    // private static timerId: NodeJS.Timeout | null = null
    // private static lastTime = Date.now()

    /**
     * @description 防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @param { boolean } immediate 立即执行
     * @returns { Function } debounced防抖函数
     * @example const debounced = useCallback(ThrottleDebounce.debounce(() => {}, 1000), [dependencies])
     * @tips 使用 useCallback 缓存函数避免内存泄漏
     */
    public static debounce = <T>(callback: (...args: Array<T>) => void, delay = 500, immediate = false) => {
        // 一个函数绑定一个 timerId 可以分开执行
        /**
         * 在 React 中，不使用 useRef 的话
         * 组件的每次状态更新，都会被重置 timerId 为 null，导致上一个还未发生的 timerId 无法被 clear
         */
        // let timerId: NodeJS.Timeout | null = null
        const timerId = useRef<NodeJS.Timeout | null>(null)
        const debounced = (...args: Array<T>) => {
            if (timerId.current) clearTimeout(timerId.current)
            if (immediate) {
                const callNow = !timerId.current
                if (callNow) callback(...args)
                timerId.current = setTimeout(() => {
                    timerId.current = null
                }, delay)
            } else {
                timerId.current = setTimeout(() => {
                    callback(...args)
                    // 在 React 函数组件中，this 通常没有明确的意义，此处省略处理 this 的逻辑
                    // callback.call(this, ...args)
                    timerId.current = null
                }, delay)
            }
        }

        // 取消防抖执行，可在组件卸载时执行
        debounced.cancel = () => {
            if (timerId.current) {
                clearTimeout(timerId.current)
                timerId.current = null
            }
        }

        return debounced
    }

    /**
     * @description 函数节流：一个函数执行完后只有大于设定时间才会再次执行第二次  (节约浏览器资源)
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @returns { Function } throttled节流函数
     * @example const debounced = useCallback(ThrottleDebounce.throttle(() => {}, 1000), [dependencies])
     * @tips 使用 useCallback 缓存函数避免内存泄漏
     */
    public static throttle = <T>(callback: (...args: Array<T>) => void, delay = 200) => {
        // let lastTime = Date.now()
        const lastTime = useRef(0)
        return (...args: Array<T>) => {
            const nowTime = Date.now()
            if (nowTime - lastTime.current > delay) {
                callback(...args)
                // callback.apply(this, args)
                lastTime.current = nowTime
            }
        }
    }
}

```

```typescript
const searchSchool = ThrottleDebounce.debounce<string>((key = searchKey) => {
    console.log("搜索中...");
}, 200)
```





# 非立即执行防抖函数

```typescript
/**
 * 防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
 * @param { Function } callback 回调函数
 * @param {number } delay 延迟时间
 * @returns { Function } debounced防抖函数
 */
public static debounce = <T>(callback: (...args: Array<T>) => void, delay = 500) => {
    let timerId: number | null = null
    return (...args: Array<T>) => {
        if (timerId) clearTimeout(timerId)
        timerId = setTimeout(() => {
            // callback.call(this)
            callback(...args)
            timerId = null
        }, delay)
    }
}
```

