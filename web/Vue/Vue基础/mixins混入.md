# 不再使用

==**尽管 `mixins` 在 Vue 2 中非常流行，在Vue3中已经不再推荐使用**==

**建议使用组合函数(Hooks)替代mixins**

缺点有以下：

1. **命名冲突**：如果多个 `mixin` 中的属性、方法或生命周期钩子名称相同，**可能会导致覆盖或混淆**
2. **逻辑来源不清晰**：在大型项目中，多个 `mixin` 的逻辑可能混杂在一起，**使得组件逻辑来源不清晰**，不易维护
3. **调试困难**：当组件与多个 `mixin` 组合使用时，**追踪数据和方法的来源变得困难**



# mixins

一个包含组件选项对象的数组，这些选项都将被混入到当前组件的实例中

Vue 会将 `mixin` 和组件本身的选项进行合并，遵循以下规则：

1. **数据合并**：`data` 会合并，但如果 `data` 属性名称冲突，以组件本身的数据为准
2. **方法合并**：`methods` 方法会合并，但如果方法名称冲突，组件内的方法优先
3. **生命周期钩子合并**：生命周期钩子会合并，`mixin` 中的生命周期钩子会在组件的钩子之前执行

**生命周期钩子示例**：一看就是被hooks替代的命

```javascript
// helloMixin.js
export default {
    mounted() {
        console.log('Mixin mounted');
    }
};

// MyComponent.vue
import helloMixin from './helloMixin';

export default {
    mixins: [helloMixin],
    mounted() {
        console.log('Component mounted');
    }
};


// 最后输出
// Mixin mounted
// Component mounted
```

