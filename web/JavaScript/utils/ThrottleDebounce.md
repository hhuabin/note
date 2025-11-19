# 防抖节流工具函数

```typescript
/**
 * @Author: bin
 * @Date: 2025-02-26 21:05:44
 * @LastEditors: bin
 * @LastEditTime: 2025-11-13 09:40:53
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ThrottleDebounce {
    // 非组件函数使用时使用, 此时 timerId 在全局生效，全局只能执行一个 debounce
    // private static timerId: NodeJS.Timeout | null = null
    // private static lastTime = Date.now()

    /**
     * @description 非 React 防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @param { boolean } immediate 立即执行
     * @returns { Function } debounce 防抖函数
     * @example const debounced = useCallback(ThrottleDebounce.debounce(() => {}, 1000), [dependencies])
     */
    public static debounce = <T extends (...args: any[]) => void>(callback: T, delay = 500, immediate = false) => {
        // 一个函数绑定一个 timerId 可以分开执行
        // 在 React 中，debounce 的每次状态更新，timerId 都会被重置为 null，导致上一个还未发生的 timerId 无法被 clear
        let timerId: ReturnType<typeof setTimeout> | null = null
        const debounced = (...args: Parameters<T>) => {
            console.group('debounced')
            console.log(`定时器值为 ${timerId}`)
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
                    console.log(`%ctimerId: ${timerId} 执行了`, 'color: red; font-weight: bold;')
                    timerId = null
                }, delay)
            }
            console.log(`定时器 ${timerId} 创建了`)
            console.groupEnd()
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
     * @description 非 React 函数节流：一个函数执行完后只有大于设定时间才会再次执行第二次  (节约浏览器资源)
     * @param { Function } callback 回调函数
     * @param { number } delay 延迟时间
     * @returns { Function } throttled节流函数
     * @example const throttle = useCallback(ThrottleDebounce.throttle(() => {}, 1000), [dependencies])
     */
    public static throttle = <T extends (...args: any[]) => void>(callback: T, delay = 200) => {
        let lastTime = Date.now()
        return (...args: Parameters<T>) => {
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

```typescript
const searchSchool = ThrottleDebounce.debounce((key = searchKey) => {
    console.log("搜索中...");
}, 200)
```



## 在react中使用

 :bell:  普通的防抖节流工具函数在React中通过，组件每次**状态更新**都会触发函数的重新执行，如`debounce()`会被重新执行，返回新的函数，这样会造成两个问题

1. `timerId`将会被赋值为`null`。如当前`timerId=15`，重新执行函数`timerId=null`，`if (timerId)`不是`true`导致不会执行`clearTimeout(15)`，`timerId=15`的定时器不会被清除所以一定会被执行，而新`timerId`的定时器也会被执行。导致`timerId=15`定时器防抖失败。
2. 旧的函数因为闭包问题可能会造成内存泄漏

解决办法有：

1. 使用`useCallback`缓存`ThrottleDebounce.debounce()`，确保函数不会被重新创建。此时依赖数组必须为空，才能确保不会有状态更新

   ```typescript
   const debounced = useCallback(ThrottleDebounce.debounce(() => {}, 1000), [])
   ```

   这样又会造成一个问题，由于`useCallback`长期不更新，所以防抖函数会一直取闭包的状态值`state`。里面的状态将不会有更新，除非使用函数式更新

2. `hooks` 缓存 `timerId`

   终极方案

   ```typescript
   /**
    * @Author: bin
    * @Date: 2025-11-12 19:20:27
    * @LastEditors: bin
    * @LastEditTime: 2025-11-13 09:56:45
    */
   /* eslint-disable @typescript-eslint/no-explicit-any */
   import { useCallback, useEffect, useRef } from 'react'
   
   /**
    * @description React Hooks 版安全防抖函数： 一个需要频繁触发的函数，在规定时间内触发，只让最后一次生效，前面的不生效
    * @param { Function } callback 需要防抖执行的函数
    * @param { number } delay 延迟时间（默认 500ms）
    * @param { boolean } immediate 立即执行
    * @returns 稳定引用的 [debounce, cancel]
    * @example const [debounce, cancel] = useDebounce(() => {})    use this, 跟随所有状态更新执行，避免闭包问题
    * @example const [debounce, cancel] = useDebounce(useCallback(() => {}, []), 1000)
    * @tips 组件有非常多频繁的状态更新（如定时状态更新），可以使用 useCallback 优化，依赖数组必须包含防抖函数中用到的
    * 优点：callback 里的 state 几乎没有闭包问题
    * 缺点：debounce 依赖数组只有 delay 和 immediate 只要这两个不更新，不管组件其他状态如何更新，返回的 debounce 永远都是稳定依赖
    */
   export const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay = 500, immediate = false) => {
   
       const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
       const callbackRef = useRef<T>(callback)
   
       useEffect(() => {
           // 避免闭包问题，始终引用最新 callback
           callbackRef.current = callback
       }, [callback])
   
       useEffect(() => {
           return () => {
               if (timerIdRef) clearTimeout(timerIdRef.current!)
           }
       }, [])
   
       // 创建防抖函数
       const debounce = useCallback((...args: Parameters<T>) => {
           console.group('debounce')
           console.log(`定时器值为 ${timerIdRef.current}`)
           if (timerIdRef) clearTimeout(timerIdRef.current!)
           if (immediate) {
               const callNow = !timerIdRef
               if (callNow) callbackRef.current(...args)
               timerIdRef.current = setTimeout(() => {
                   timerIdRef.current = null
               }, delay)
           } else {
               timerIdRef.current = setTimeout(() => {
                   callbackRef.current(...args)
                   // 在 React 函数组件中，this 通常没有明确的意义，此处省略处理 this 的逻辑
                   // callbackRef.current.call(this, ...args)
                   console.log(`%ctimerId: ${timerIdRef.current} 执行了`, 'color: red; font-weight: bold;')
                   timerIdRef.current = null
               }, delay)
           }
           console.log(`定时器 ${timerIdRef.current} 创建了`)
       }, [delay, immediate])
   
       // 取消防抖执行
       const cancel = useCallback(() => {
           if (timerIdRef.current) {
               clearTimeout(timerIdRef.current)
               timerIdRef.current = null
           }
       }, [])
   
       return [debounce, cancel]
   }
   
   /**
    * @description React Hooks 版安全函数节流：一个函数执行完后只有大于设定时间才会再次执行第二次  (节约浏览器资源)
    * @param { Function } callback 需要节流的函数
    * @param { number } delay 间隔时间（默认 500ms）
    * @returns { Function } throttle节流函数
    * @example const throttle = useThrottle(() => {}, 1000)    use this, 跟随所有状态更新执行，避免闭包问题
    * @example const throttle = useThrottle(useCallback(() => {}, []), 1000)
    * @tips 组件有非常多频繁的状态更新（如定时状态更新），可以使用 useCallback 优化，依赖数组必须包含防抖函数中用到的
    * 优点：callback 里的 state 几乎没有闭包问题
    * 缺点：throttle 依赖数组只有 delay ，只要 delay 不更新，不管组件其他状态如何更新，返回的 throttle 永远都是稳定依赖
    */
   export const useThrottle = <T extends (...args: any[]) => void>(callback: T, delay = 200) => {
       const lastExecRef = useRef(0)
       const callbackRef = useRef(callback)
   
       useEffect(() => {
           // 避免闭包问题，始终引用最新 callback
           callbackRef.current = callback
       }, [callback])
   
       // 创建节流函数
       const throttle = useCallback((...args: Parameters<T>) => {
           const now = Date.now()
           if (now - lastExecRef.current >= delay) {
               lastExecRef.current = now
               callbackRef.current(...args)
           }
       }, [delay])
   
       return throttle
   }
   
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
    let timerId: ReturnType<typeof setTimeout> | null = null
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

