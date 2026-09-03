# ref

## 获取组件

```vue
<template>
    <ChildComponent ref="childRef" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChildComponent from './ChildComponent.vue';

const childRef = ref<InstanceType<typeof ChildComponent> | null>(null);

onMounted(() => {
    if (childRef.value) {
        childRef.value.customMethod();  // 调用子组件的自定义方法
    }
});
</script>
```

