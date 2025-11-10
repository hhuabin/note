# watch

1. 监视指定的数据，监视多个数据使用`[]`，如`[user, name]`

   ```javascript
   watch(
       user,   // user为响应式数据
       (newValue, oldValue) => {
       	console.log(newValue, oldValue)
       },
       { immediate: true, deep: true }
   )
   ```

   immediate 默认会执行一次watch，deep 深度监视

2. `watchEffect`不需要配置immediate，本身默认就会进行监视,(默认执行一次)

   不需要声明依赖（但会触发一个问题。如果在`watchEffect`里执行`a=b`且`a,b`都为响应式参数，`watchEffect`可能会执行多次，因为，它同时监听了`a和b`。此时使用`watch`不失为一个好的选择）

   ```javascript
   watchEffect(() => {
       // 需要执行的函数
       console.log(user)
   })
   ```

   ### `watchEffect` 与 `watch` 的区别

   | 特点         | `watchEffect`                                | `watch`                                          |
   | ------------ | -------------------------------------------- | ------------------------------------------------ |
   | **依赖声明** | 自动收集依赖，不需要手动声明                 | 需要手动声明依赖                                 |
   | **立即执行** | 创建时立即执行                               | 默认不会立即执行，除非设置 `{ immediate: true }` |
   | **使用场景** | 适用于简化的副作用或依赖追踪，适合简单的逻辑 | 适合对特定的响应式数据进行精确监听               |
   | **传递参数** | 无法获取到当前和前一个值                     | 可以获取到新值和旧值                             |

3. 使用watch监视非响应式的数据需要使用函数

   ```javascript
   watch([()=>user.firstName, ()=>user.lastName, fullName3], () => {
   	console.log('====')
   })
   ```



# 停止监视

`watch`会返回一个函数，执行函数即可

```javascript
const stopWatch = watch(
    age,
    (newValue, oldValue) => {
		console.log(newValue, oldValue)
        if(age > 10) stopWatch()
    },
    { immediate: true, deep: true }
)
```

