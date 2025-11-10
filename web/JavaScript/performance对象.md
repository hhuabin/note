# performance

`performance` 是浏览器中的全局对象，提供了一组方法和属性，用于测量页面性能。以下是一些常

用的属性和方法：

1. **`performance.now()`**：
   - 返回自页面加载以来经过的毫秒数，具有高精度（微秒级）。
   - 用于测量代码执行的时间。
2. **`performance.mark(name)`**：
   - 为性能条目创建一个标记（时间戳）。
   - 标记可以用来测量特定代码块的执行时间。
3. **`performance.measure(name, startMark, endMark)`**：
   - 通过两个标记计算出代码块的执行时间。
   - 结果会存储在浏览器的性能条目中。
4. **`performance.getEntriesByType(type)`**：
   - 返回指定类型的所有性能条目，比如 `"navigation"`、`"resource"`。
5. **`performance.clearMarks()`** 和 **`performance.clearMeasures()`**：
   - 用于清除标记和测量数据。



## performance.timing

`performance.timing` 是一个已经废弃的属性，但在旧项目中仍然使用。它提供了有关页面加载的详细时间信息。以下是 `performance.timing` 中的一些重要属性：

1. **`navigationStart`**：导航开始的时间戳，即用户点击链接或输入 URL 开始加载页面的时间。
2. **`unloadEventStart`**：前一个页面的 `unload` 事件开始的时间戳。
3. **`unloadEventEnd`**：前一个页面的 `unload` 事件结束的时间戳。
4. **`redirectStart`** 和 **`redirectEnd`**：重定向开始和结束的时间戳。
5. **`fetchStart`**：浏览器准备好使用 HTTP 请求抓取文档的时间戳。
6. **`domainLookupStart`** 和 **`domainLookupEnd`**：DNS 查询开始和结束的时间戳。
7. **`connectStart`** 和 **`connectEnd`**：TCP 连接开始和结束的时间戳。
8. **`requestStart`**：浏览器向服务器发出请求的时间戳。
9. **`responseStart`**：浏览器开始接收服务器响应的时间戳。
10. **`responseEnd`**：浏览器接收完整的服务器响应的时间戳。
11. **`domLoading`**：DOM 开始加载的时间戳。
12. **`domInteractive`**：DOM 结构完全解析的时间戳。
13. **`domContentLoadedEventStart`** 和 **`domContentLoadedEventEnd`**：`DOMContentLoaded` 事件开始和结束的时间戳。
14. **`loadEventStart`** 和 **`loadEventEnd`**：`load` 事件开始和结束的时间戳。

---

**`performance.timing` 的应用**

通过这些时间戳，开发者可以计算出网页加载的各个阶段所消耗的时间，从而找到性能瓶颈。例如：

- **DNS 查询时间** = `domainLookupEnd` - `domainLookupStart`
- **TCP 连接时间** = `connectEnd` - `connectStart`
- **请求-响应时间** = `responseEnd` - `requestStart`
- **DOM 解析时间** = `domInteractive` - `domLoading`
- **页面加载时间** = `loadEventEnd` - `navigationStart`

尽管 `performance.timing` 已被弃用，新项目应使用 `PerformanceNavigationTiming` 接口（通过 `performance.getEntriesByType('navigation')` 获得）来获取类似的数据。



## performance.getEntriesByType('navigation')

`performance.getEntriesByType('navigation')` 是 Web 性能 API 的一部分，用于获取页面导航性能的详细信息。与 `performance.timing` 类似，但提供了更精确、更全面的性能数据。

**使用方法**

你可以通过调用 `performance.getEntriesByType('navigation')` 来获取页面导航相关的性能条目。返回值是一个 `PerformanceNavigationTiming` 对象的数组，一般情况下，数组中只有一个元素，因为大多数页面只有一个导航条目。

**示例代码**

```javascript
setTimeout(() => {
    const navigationEntries = performance.getEntriesByType('navigation')
    const navTiming = navigationEntries[0] as PerformanceNavigationTiming      // 通常只有一个导航条目
    console.log(navTiming)
    console.log('DOMContentLoaded:', navTiming.domContentLoadedEventEnd - navTiming.startTime + 'ms')
    console.log('OnLoadTime:', navTiming.loadEventEnd - navTiming.startTime + 'ms')
}, 100)
```

---

**`PerformanceNavigationTiming` 对象的属性**

`PerformanceNavigationTiming` 对象包含了多种与页面导航和加载相关的性能指标。以下是一些常用的属性：

1. **`startTime`**：导航开始的时间戳，一般为 0，因为它是相对于该条目的开始时间而言的。
2. **`duration`**：完整导航过程的持续时间，即 `loadEventEnd - startTime`。
3. **`fetchStart`**：浏览器开始获取资源的时间戳。
4. **`domainLookupStart`** 和 **`domainLookupEnd`**：DNS 查询的开始和结束时间戳。
5. **`connectStart`** 和 **`connectEnd`**：TCP 连接的开始和结束时间戳。
6. **`secureConnectionStart`**：如果使用 HTTPS，表示 SSL 握手开始的时间戳。
7. **`requestStart`**：浏览器发出请求的时间戳。
8. **`responseStart`** 和 **`responseEnd`**：浏览器开始接收和接收完服务器响应的时间戳。
9. **`domLoading`**、**`domInteractive`**、**`domContentLoadedEventStart`**、**`domContentLoadedEventEnd`**：这些与 DOM 解析相关的时间戳。
10. **`loadEventStart`** 和 **`loadEventEnd`**：页面 `load` 事件的开始和结束时间戳。
11. **`type`**：导航的类型，可以是 `"navigate"`（标准导航）、`"reload"`（重新加载）、`"back_forward"`（浏览器前进或后退）、`"prerender"`（页面预渲染）。
12. **`redirectCount`**：重定向次数。

**实际应用**

使用 `performance.getEntriesByType('navigation')` 你可以更精确地分析页面加载的各个阶段，这对优化网页性能非常有帮助。例如，你可以：

- 监控 DNS 查询时间、连接时间、响应时间等。
- 计算 DOM 完全解析和页面完全加载所需的时间。
- 分析 HTTPS 握手的时间开销。
- 分析重定向次数及其对性能的影响。

这一方法更现代且精确，建议在新项目中使用，而不是依赖已被弃用的 `performance.timing`。



# DCL、FP、FCP、L、LCP

**DCL**：初始 HTML 文档完全加载和解析完成时触发

**FP**：浏览器首次绘制任何视觉内容的时间点

**FCP**：用户首次看到页面上任何有意义内容的时间点

**L(onload)**：页面及所有资源完全加载完成的时间点

**LCP**：页面上最大内容元素渲染完成的时间点



## DCL（DOMContentLoaded）

**含义**：`DOMContentLoaded` 事件是浏览器在初始的 HTML 文档完全加载和解析完成时触发的事件，而不需要等待样式表、图片和子框架等其他资源的加载

**时间点**：文档结构解析完成，DOM 树构建完成，此时可以安全地操作 DOM 元素

**用途**：通常用于在文档结构完全可用时执行脚本，如初始化 UI 组件、绑定事件处理程序等

```javascript
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM 已完全加载和解析");
    // 在这里可以安全地操作 DOM 元素
});
```



## FP（First Paint）

**含义**：First Paint 是指浏览器首次绘制任何视觉内容到屏幕上的时间点。这个内容可以是背景色、边框等，即使页面内容还不完全可见

**时间点**：**页面开始显示内容**，通常是非常早的时间点

**用途**：表示用户首次看到页面有视觉反馈的时间，帮助评估页面响应速度的初步体验



## FCP（First Contentful Paint）

**含义**：First Contentful Paint 是用户首次看到页面上任何有意义的内容（如文本、图片、SVG 等）的时间点。它标志着页面开始呈现有意义的内容

**时间点**：**页面上开始渲染实际内容的时间点**

**用途**：帮助评估用户首次看到实际内容的时间，通常用于评估页面加载初期的用户体验



## L（Onload Event(window.onload)）

在网页开发中，`onload` 事件指的是当整个网页及其所有资源（如图片、脚本、样式表等）完全加载完毕后触发的事件。这个事件用于在页面和所有依赖的资源加载完成后执行 JavaScript 代码。

**`onload` 事件的关键点**

1. **事件触发时机**：
   - `onload` 事件会在整个页面及所有相关资源（包括图片、样式表、脚本、iframe 等）加载完成后触发。这意味着在这个事件触发时，用户可以完全访问和操作页面上的所有内容
2. **用途**：
   - 常用于在页面完全加载后执行某些操作，如初始化脚本、设置事件监听器、收集页面加载统计等
3. **事件处理**：
   - 可以将 `onload` 事件处理程序附加到各种元素上，包括 `window` 对象、图片、iframe 等

```javascript
window.addEventListener('load', function() {
    console.log('页面已完全加载！');
    // 在此执行初始化操作或其他操作
});
```



## LCP（Largest Contentful Paint）

**含义**：Largest Contentful Paint 代表用户看到页面上最大的内容元素（如图像、块级文本等）完全渲染的时间点。它衡量了页面主要内容的渲染时间

**时间点**：**最大内容元素渲染完成的时间点**，通常在 FCP 之后发生

**用途**：评估用户看到页面上主要内容的时间，优化 LCP 可以显著提升用户对页面加载速度的感知

**监听LCP的方式**



## 各单位理想时间

| 指标    | 理想时间  | 最大允许时间 |
| ------- | --------- | ------------ |
| **DCL** | 1秒以内   | 不超过2秒    |
| **FP**  | 1秒以内   | 不超过2秒    |
| **FCP** | 1.8秒以内 | 不超过2.5秒  |
| **L**   | 2.5秒以内 | 不超过4秒    |
| **LCP** | 2.5秒以内 | 不超过4秒    |



# 性能监控

```tsx
useEffect(() => {
    // 性能监控
    console.log("import.meta.env", import.meta.env.MODE)
    if (import.meta.env.MODE === 'production') return

    // LCP监听
    const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lcpEntry = entries[entries.length - 1]
        console.log('LCP: ', lcpEntry.startTime, 'ms')
    })
    observer.observe({ type: 'largest-contentful-paint', buffered: true })

    // Onload Event
    setTimeout(() => {
        const paintEntries = performance.getEntriesByType('paint')
        const navigationEntries = performance.getEntriesByType('navigation')

        const navTiming = navigationEntries[0] as PerformanceNavigationTiming      // 通常只有一个导航条目
        console.log(navTiming)
        console.log('DOMContentLoaded: ', navTiming.domContentLoadedEventEnd - navTiming.startTime, 'ms')

        paintEntries.forEach((entry) => {
            if (entry.name === 'first-paint') {
                console.log('FP: ', entry.startTime, 'ms')
            } else if (entry.name === 'first-contentful-paint') {
                console.log('FCP: ', entry.startTime, 'ms')
            }
        })
        console.log('OnLoadTime: ', navTiming.loadEventEnd - navTiming.startTime, 'ms')
    }, 200)

    return () => {
        // 移除PerformanceObserver监听
        observer.disconnect()
    }
}, [])
```

