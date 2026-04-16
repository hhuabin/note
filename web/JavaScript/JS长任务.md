# 长任务`Long Task`

执行时间超过 **50ms** 的 `JavaScript` 任务，就叫长任务（`Long Task`）

任务执行时间 \>50ms → 明显卡顿



## 长任务来源

1. **大循环 / 重计算**

   ```typescript
   while(true) {}
   ```

2. **大量 `DOM` 操作**

   ```typescript
   for (let i = 0; i < 10000; i++) {
       document.body.appendChild(...)
   }
   ```

3. **同步阻塞逻辑**

   如大数组处理

4. **`React / Vue` 渲染过重**

   如一次性渲染超大列表



## 解决办法

1. **任务分片执行**

   ```typescript
   function chunkTask(list) {
       const chunkSize = 100
   
       function run() {
           const chunk = list.splice(0, chunkSize)
   
           chunk.forEach(item => {
               // 处理逻辑
           })
   
           if (list.length > 0) {
               setTimeout(run) // 让出主线程
           }
       }
   
       run()
   }
   ```

2. **`requestIdleCallback`**

   ```typescript
   requestIdleCallback((deadline) => {
       while (deadline.timeRemaining() > 0) {
           // 做一点任务
       }
   })
   ```

   必须在主线程运行（比如要操作 DOM）只能使用`requestIdleCallback`，不能使用 `Web Worker`

   `requestIdleCallback`、`Web Worker`二者区别：

    ✅ **requestIdleCallback 不需要通信（同一线程）**

   **Web Worker 必须通信（跨线程）**

3. **`Web Worker`**

   适用于可以独立运行的代码（不依赖 DOM）

   ```typescript
   const worker = new Worker('worker.js')
   ```

4. **虚拟列表（前端框架）**

   避免一次性渲染 10000 条

