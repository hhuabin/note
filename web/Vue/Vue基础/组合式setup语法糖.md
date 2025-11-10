# setup

[官方文档的setup](https://cn.vuejs.org/api/sfc-script-setup.html "script-setup")

在Vue3中可以使用setup语法糖或者类似于Vue2的`export default`

```vue
<script setup lang="ts">

</script>
```

```vue
<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    name: '',
    setup() {
        
        return {}
    }
});
</script>
```



## setup区别

`expose`：用于在 `<script setup>` 语法糖中显式地暴露组件的内部状态和方法，使它们可以被父组件或外部代码访问。这个功能主要用于与外部组件或代码进行交互时，需要公开某些内部状态或方法的场景

**使用`setup`语法糖后，`expose`默认是`{}`，即父组件无法访问字组件内部的方法及变量**

**而`export default`暴露的东西会非常多，不仅包括return返回的东西，还包含`$props`、`$refs`、`$watch`等非常多东西**



## 自定义`expose`

1. 在`setup`语法糖中

   ```vue
   <script setup lang="ts">
   
   defineExpose({
       a,
       b
   })
   </script>
   ```

2. 在`export default`中

   ```vue
   <script lang='ts'>
   import { defineComponent } from 'vue';
   export default defineComponent({
       name: '',
       setup(props, { expose }) {
           
           expose({
               a,
               b
           })
           return {}
       }
   });
   </script>
   ```

   

## 更推荐使用setup

对于 `setup` 语法糖，Vue 编译器可以更好地进行静态分析和优化，减少运行时的开销

对于 `defineComponent`，虽然也有优化，但因为保留了选项式 API 的结构，可能在一些极端情况下（如深度优化和摇树优化）略逊色于 `setup` 语法糖



# defineProps() 和 defineEmits()

`defineProps` 和 `defineEmits` 都是只能在 `<script setup>` 中使用的==**编译器宏**==。**他们不需要导入**，且会随着 `<script setup>` 的处理过程一同被编译掉

可以使用`defineProps()` 和 `defineEmits()`代替`props`和`emit`

```vue
<script setup>
const props = defineProps({
    foo: String
})

const emit = defineEmits(['change', 'delete'])

// setup 代码
</script>
```

```vue
<script setup>
const props = defineProps({
    foo: {
        type: String,
        required: true,
        default: '',
    }
})
</script>
```

针对类型的 props/emit 声明：props 和 emit 也可以通过给 `defineProps` 和 `defineEmits` 传递纯类型参数的方式来声明

```typescript
interface Props {
    msg?: string
    labels?: string[]
}

// 不使用默认值
const props = defineProps<{
    foo: string
    bar?: number
}>()

// 使用默认值，推荐使用这种写法
interface Props {
    msg?: string
    labels?: string[]
}
const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()

// 使用类型声明时的默认 props 值，vue3.5+支持withDefaults
const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
})
```

```vue
const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
}>()

// 3.3+：另一种更简洁的语法
const emit = defineEmits<{
    change: [id: number] // 具名元组语法
    update: [value: string]
}>()
```

其他用法请参考官方文档



# defineOptions

在 `<script setup>` 中，因为它已经简化了组件的结构，`defineOptions` 允许你在使用这种简化语法的同时依然能够配置某些组件选项，比如命名组件、设置继承属性等

```vue
<script setup>
defineOptions({
  name: 'MyCustomComponent', // 组件名称
  inheritAttrs: false // 禁用自动继承属性
});
</script>

<template>
	<div>My custom component content</div>
</template>
```

### 主要配置选项

1. **`name`**: 组件的名称，用于调试、Vue DevTools、以及递归组件引用等场景。

   ```javascript
   defineOptions({
   	name: 'MyComponent'
   });
   ```

2. **`inheritAttrs`**: 决定组件是否会自动继承父组件传递的 `attrs`（非 `props` 属性）。

   ```javascript
   defineOptions({
   	inheritAttrs: false
   });
   ```

3. **`emits`**: 声明组件可以发出的自定义事件。与 `emits` 选项类似，你可以通过 `defineOptions` 来声明该组件可以发出的事件。(**直接使用`defineEmits()`)**即可

   ```javascript
   defineOptions({
   	emits: ['update', 'submit']
   });
   ```

4. **`components`** 和 **`directives`**: 你可以显式声明在模板中使用的局部组件或指令（尽管通常建议通过自动导入或手动导入组件）。

   ```javascript
   defineOptions({
       components: { MyButton },
       directives: { myDirective }
   });
   ```

### 完整示例

```vue
<script setup>
import MyButton from './MyButton.vue';

defineOptions({
  name: 'FormComponent',
  inheritAttrs: false, // 不自动继承父组件的attrs
  components: { MyButton },
  emits: ['submit', 'reset']
});
</script>

<template>
    <form @submit.prevent="$emit('submit')" @reset="$emit('reset')">
        <MyButton>Submit</MyButton>
    </form>
</template>
```