[vue-router官网](https://router.vuejs.org/zh/introduction.html "vue-router")

# vue-router

```typescript
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        router.push(-1)
    }
})
```



# 导航守卫

## 全局前置守卫 router.beforeEach

```typescript
const router = createRouter({ ... })

router.beforeEach((to, from) => {
    // 返回 false 以取消导航
    // return false
    if (to.name !== 'Login' && !isAuthenticated) next({ path: '/login' })
    else next()
})
```



## 组件内的守卫

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`



### beforeRouteEnter

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建

```typescript
beforeRouteEnter(to, from, next) {
    next((vm: any) => {
		// 通过 `vm` 访问组件实例
    })
},
```



PS：不要过度依赖路由守卫，React 并没有路由守卫这个东西，看着差不多用就行了。