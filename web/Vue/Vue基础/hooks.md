# 组合函数

[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html "vue")

在多个组件中**复用相同的逻辑**，我们可以把这个逻辑以一个组合式函数的形式提取到外部文件中

```javascript
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
    // 被组合式函数封装和管理的状态
    const x = ref(0)
    const y = ref(0)

    // 组合式函数可以随时更改其状态。
    function update(event) {
        x.value = event.pageX
        y.value = event.pageY
    }

    // 一个组合式函数也可以挂靠在所属组件的生命周期上
    // 来启动和卸载副作用
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    // 通过返回值暴露所管理的状态
    return { x, y }
}
```

```vue
<script setup>
import { useMouse } from './mouse.js'

const { x, y } = useMouse()
</script>

<template>Mouse position is at: {{ x }}, {{ y }}</template>
```



# 异步的Hook

```javascript
// useFetchData.js
import { ref } from 'vue';

export function useFetchData(url) {
    const data = ref(null);       // 存储数据
    const isLoading = ref(false);  // 加载状态
    const error = ref(null);       // 错误信息

    // 异步函数：请求数据
    const fetchData = async () => {
        isLoading.value = true;
        error.value = null;          // 重置错误

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data'); // 自定义错误信息
            data.value = await response.json();
        } catch (err) {
            error.value = err.message; // 捕获错误信息
        } finally {
            isLoading.value = false;   // 请求结束后重置加载状态
        }
    };

    fetchData(); // 立即执行一次请求，也可以在onMounted中请求

    // 返回值供组件使用
    return {
        data,
        isLoading,
        error,
        fetchData,   // 返回手动触发的函数
    };
}
```

```vue
<script setup>

const { data: data1, isLoading: isLoading1, error: error1 } = useFetchData('https://api.example.com/data1');
    
const { data: data2, isLoading: isLoading2, error: error2 } = useFetchData('https://api.example.com/data2');

</script>
```

或者接收多个urls，即可发送多个请求，将多个请求返回的data包装在数组中

```javascript
export function useFetchMultipleData(urls) {
    const data = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
}
```



## 响应式Hook

可以使用响应式的`ref`、`reactive`配合`watch`或`watchEffect`实现

```javascript
import { ref, watch } from 'vue';

// params为响应式数据
export function useFetchData(params) {
    const data = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchData = async () => {
        isLoading.value = true;
        error.value = null;

        const url = `${params.url}?query=${params.query}&page=${params.page}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data');
            data.value = await response.json();
        } catch (err) {
               error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    watch(
        () => [params.url, params.query, params.page],
        () => {
            fetchData();
        },
        { immediate: true }
    );

    return {
        data,
        isLoading,
        error
    };
}
```

```vue
<script setup>

const params = reactive({
    url: 'https://api.example.com/search',
    query: '',
    page: 1
});

const { data, isLoading, error } = useFetchData(params);

</script>
```



