# 依赖注入

能提供类似于React的`Context API`的效果

**防止意外更改**：使用依赖注入时要小心，因为数据是共享的，任何修改都会影响到其他依赖此数据的组件



# provide

```typescript
function provide<T>(key: InjectionKey<T> | string, value: T): void
```

```javascript
<script setup>
import { ref, provide } from 'vue'

// 提供静态值
provide('path', '/project/')

// 提供响应式的值
const count = ref(0)
provide('count', count)

</script>
```



# inject

```typescript
// 没有默认值
function inject<T>(key: InjectionKey<T> | string): T | undefined

// 带有默认值
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

// 使用工厂函数
function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): T
```

```javascript
<script setup>
import { inject } from 'vue'

// 注入不含默认值的静态值
const path = inject('path')

// 注入响应式的值
const count = inject('count')

// 注入一个值，若为空则使用提供的默认值
const bar = inject('path', '/default-path')

// 注入一个值，若为空则使用提供的函数类型的默认值
const fn = inject('function', () => {})

// 注入一个值，若为空则使用提供的工厂函数
const baz = inject('factory', () => new ExpensiveObject(), true)

// 子组件可以直接修改 count 的属性
const incrementCount = () => {
	count.value += 1;
};
</script>
```



## 控制修改权限

```javascript
<script setup>
import { ref, readonly, provide } from 'vue'

// 提供响应式的值
const sharedData = ref('Hello from parent!');

// 提供一个封装的更新方法
const updateSharedData = (newData) => {
    if (typeof newData === 'string') { // 可添加条件来控制更新逻辑
        sharedData.value = newData;
    }
};

// 将 sharedData 包装成只读的对象
provide('readonlySharedData', readonly(sharedData))
provide('updateSharedData', updateSharedData);

</script>
```

```javascript
<script setup>
import { ref, inject } from 'vue'

const readonlySharedData = inject('readonlySharedData');
const updateSharedData = inject('updateSharedData');

</script>
```



或者使用`computed`

```javascript
<script setup>
import { ref, computed, provide } from 'vue'

	const sharedData = ref('Hello from parent!');

    // 提供一个只读的计算属性
    const readonlySharedData = computed(() => sharedData.value);

    provide('readonlySharedData', readonlySharedData);

</script>
```

