# 防抖节流工具函数

```typescript
export default class ThrottleDebounce {
    // 非组件函数使用时使用, 此时 timerId 在全局生效，全局只能执行一个 debounce
    // private static timerId: NodeJS.Timeout | null = null
    // private static lastTime = Date.now()

    /**
     * 防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @param { boolean } immediate 立即执行
     * @returns { Function } debounced防抖函数
     */
    public static debounce = <T>(callback: (...args: Array<T>) => void, delay = 500, immediate = false) => {
        // 一个函数绑定一个 timerId 可以分开执行
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
     * 函数节流：一个函数执行完后只有大于设定时间才会再次执行第二次  (节约浏览器资源)
     * @param { Function } callback 回调函数
     * @param { Number } delay 延迟时间
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

在React中通过，每次更新state都会触发函数的重新执行，如`debounce()`会不断的返回新的函数，timerId被重新创建，导致功能失效，解决办法有：

1. 可以使用`useRef`缓存timerId，保证不会被重新创建
2. 可以在组件中使用`useCallback`缓存`FunctionUtil.debounce()`

```typescript
import { useRef } from 'react'

export default class ThrottleDebounce {
    // 非组件函数使用时使用, 此时 timerId 在全局生效，全局只能执行一个 debounce
    // private static timerId: NodeJS.Timeout | null = null
    // private static lastTime = Date.now()

    /**
     * 防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
     * @param { Function } callback 回调函数
     * @param {number } delay 延迟时间
     * @param { boolean } immediate 立即执行
     * @returns { Function } debounced防抖函数
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
     * 函数节流：一个函数执行完后只有大于设定时间才会再次执行第二次  (节约浏览器资源)
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @returns { Function } throttled节流函数
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
const searchSchool = FunctionUtil.debounce<string>((key = searchKey) => {
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

