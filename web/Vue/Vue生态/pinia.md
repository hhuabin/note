[pinia官网](https://pinia.vuejs.org/core-concepts "pinia")

# Pinia

## 安装 pinia

```shell
yarn add pinia
# 或者使用 npm
npm install pinia
```



## 使用 pinia

1. 创建一个 pinia 实例 (根 store) 并将其传递给应用

   ```typescript
   import { createApp } from 'vue'
   import { createPinia } from 'pinia'
   import App from './App.vue'
   
   const pinia = createPinia()
   const app = createApp(App)
   
   app.use(pinia)
   app.mount('#app')
   ```

2. pinia 定义

   - defineStore(string, object)
     - string：Store 的唯一 ID
     - `defineStore()` 返回值：最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾

   ```typescript
   import { defineStore } from "pinia";
   
   export const useMainStore = defineStore('main', {
       // 跨页面的 state 必须使用 Storage 保存
       state: () => ({
           phone: localStorage.getItem('yctnft_phone') || '',
       }),
       getters: {
           isLogin: (state): boolean => {
               return state.phone? true : false
           },
       },
       actions: {
           saveLoginInfo(phone: string) {
               this.phone = phone
               localStorage.setItem('yctnft_phone', phone)
           },
           removeLoginInfo() {
               this.phone = ''
               localStorage.removeItem('yctnft_phone')
           },
       }
   })
   
   ```

3. 在组件中使用 pinia

   ```typescript
   import { useMainStore } from '@/store/index'
   
   export default defineComponent({
   	setup() {
           const store = useMainStore()
           
           const phone = store.phone
           const isLogin = store.isLogin
           store.saveLoginInfo("18402079799")
           store.removeLoginInfo()
       }
   })
   ```



# State

1. **重置 state**

   ```typescript
   const store = useStore()
   
   store.$reset()
   ```

   在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态

   在 store 中，您需要创建自己的 `$reset()` 方法：

   ```typescript
   export const useCounterStore = defineStore('counter', () => {
       const count = ref(0)
   
       function $reset() {
           count.value = 0
       }
   
       return { count, $reset }
   })
   ```

2. **订阅 state**

   1. 默认情况下，*state subscription* 会被绑定到添加它们的组件上 (如果 store 在组件的 `setup()` 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数，以将 *state subscription* 从当前组件中*分离*：

      ```typescript
      const someStore = useSomeStore()
      // 此订阅器即便在组件卸载之后仍会被保留
      someStore.$subscribe(callback, { detached: true })
      ```

   2. 可以使用 watch 进行侦听

      ```typescript
      watch(
          pinia.state,
          (state) => {
              // 每当状态发生变化时，将整个 state 持久化到本地存储。
              localStorage.setItem('piniaState', JSON.stringify(state))
          },
          { deep: true }
      )
      ```



# Getters

1. **访问其他 `getter` 时**，不能定义成箭头函数

   ```typescript
   export const useStore = defineStore('main', {
       state: () => ({
           count: 0,
       }),
       getters: {
           // 类型是自动推断出来的，因为我们没有使用 `this`
           doubleCount: (state) => state.count * 2,
           
           // 这里我们需要自己添加类型(在 JS 中使用 JSDoc)
           // 可以用 this 来引用 getter
           /**
            * 返回 count 的值乘以 2 加 1
            *
            * @returns {number}
            */
           doubleCountPlusOne() {
               // 自动补全 ✨
               return this.doubleCount + 1
           },
       },
   })
   ```

2. **向 getter 传递参数**，返回高阶函数

   ```typescript
   export const useStore = defineStore('main', {
       getters: {
           getUserById: (state) => {
               return (userId) => state.users.find((user) => user.id === userId)
           },
       },
   })
   ```

   请注意，当你这样做时，**getter 将不再被缓存**，它们只是一个被你调用的函数。不过，你可以在 getter 本身中缓存一些结果，虽然这种做法并不常见，但有证明表明它的性能会更好：

   ```typescript
   export const useStore = defineStore('main', {
       getters: {
           getActiveUserById(state) {
               const activeUsers = state.users.filter((user) => user.active)
               return (userId) => activeUsers.find((user) => user.id === userId)
           },
       },
   })
   ```

3. **访问其他 store 的 getter**

   ```typescript
   import { useOtherStore } from './other-store'
   
   export const useStore = defineStore('main', {
       state: () => ({
           // ...
       }),
       getters: {
           otherGetter(state) {
               const otherStore = useOtherStore()
               return state.localData + otherStore.data
           },
       },
   })
   ```



# Action





# 组件外的 使用Store

必须在 `createApp(App).use(pinia)` 之后使用

```typescript
import { useStore } from '@/store/index'
import { createRouter } from 'vue-router'

const router = createRouter({
  // ...
})

// ❌ 由于引入顺序的问题，这将失败
const store = useStore()

router.beforeEach((to, from, next) => {
    // 我们想要在这里使用 store
    if (store.isLoggedIn) next()
    else next('/login')
})

router.beforeEach((to) => {
    // ✅ 这样做是可行的，因为路由器是在其被安装之后开始导航的，
    // 而此时 Pinia 也已经被安装。
    const store = useStore()

    if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```



# Pinia 的类似于 `setup` 的写法

**复杂项目**：对于有复杂状态逻辑和需要灵活组合的项目，`setup` 写法利用 Composition API 的功能，提供了更大的灵活性和模块化能力

更好地支持 TypeScript 的类型推导

```typescript
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
    const count = ref(0);
    const user = ref(null);

    function increment() {
        count.value++;
    }

    function setUser(userData) {
        user.value = userData;
    }

    return { count, user, increment, setUser };
});
```

