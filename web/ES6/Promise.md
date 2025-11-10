# PromiseConstructor

```typescript
interface PromiseConstructor {
    
    new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    
    all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
    
    race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number]>>;
    
    reject<T = never>(reason?: any): Promise<T>;
    
    resolve<T>(value: T | PromiseLike<T>): Promise<Awaited<T>>;
}
```

- all：接收包含n个 Promise 的数组，返回一个新的 Promise，只有所有的 Promise 都成功才成功, 只要有一个失败了就直接失败
- race：接收包含n个 Promise 的数组，返回一个新的 Promise，第一个完成的 Promise 的结果状态就是最终的结果状态
- reject：返回一个失败的 Promise 对象
- resolve：返回一个成功/失败的 Promise 对象

Promise有三种状态：pending、resovled、rejected



# Promise

1. 基础用法

   ```javascript
   new Promise((resolve, reject) => {
       // 这里执行同步代码，同步部分只能执行 resolve, reject
    	// 不能返回 return Promise.resolve()
       resolve()
       // 调用resolve, reject后，若是不想代码往下执行。请执行 return
       // 不执行return，代码依然往下继续执行
       return
       setInterval(() => {
           console.log(1111)
       }, 1000)
   })
   .then(value => {
       // 这里执行微任务代码
       console.log(value)
       return Promise.resolve()
   }, resson => {
       // 必须是返回 Promise 状态
       return Promise.reject()
   })
   .catch(error => {
       console.error(error);
   })
   .finally(() => {
       console.log('finally');
   })
   ```

2. 直接调用成功或者失败，用于异步执行（微任务）

   ```javascript
   Promise.resolve()
   .then(() => {
   	console.log(1)
   })
   
   // reject下面必须有 reason 或者 catch 接收，不然会报错
   Promise.reject()
   .catch(() => {
   	console.log(2)
   })
   ```

3. 嵌套用法

   ```javascript
   const axios = () => {
       return new Promise((resolve, reject) => {
           resolve(1)
       })
   };
   
   // 用法一，同步使用
   new Promise((resolve, reject) => {
   	resolve(axios())
   })
   .then((value) => {
   	console.log("success", value);
   })
   .catch(err => {
   	console.error(err);
   });
   
   // 用法二，在 .then 使用
   new Promise((resolve, reject) => {
   	resolve()
   })
   .then(() => {
   	return axios()
   })
   .then((value) => {
   	console.log("success", value);
   })
   .catch(err => {
   	console.error(err);
   });
   ```

4. 阻断 .then 的调用：返回一个 pendding 状态的 Promise 对象中断 Promise 链

   ```javascript
   new Promise((resolve, reject) => {
   	resolve()
   })
   .then(() => {
   	console.log("1")
   })
   .then(() => {
   	console.log("2")         // 只会输出 1 2
   	return new Promise(() => {})   // 返回一个 pendding 状态的 Promise 对象
   })
   .then(() => {
   	console.log("3")
   })
   .catch(err => {
   	console.error(err);
   })
   ```

5. 异步等待 Promise

   ```javascript
   // 创建一个 Promise 对象
   const promise = new Promise((resolve, reject) => {
       // 这里可以执行异步操作，例如发送请求或执行一些耗时的操作
       // 在这个示例中，我们使用 setTimeout 模拟一个异步操作
       setTimeout(() => {
           // 异步操作完成后，调用 resolve 表示成功，可以将结果传递给 .then
           resolve("操作成功");
       }, 2000); // 假设需要 2 秒才能完成
   });
   
   // 在 .then 中处理异步操作的结果
   promise.then(result => {
       console.log(result); // 在这里处理异步操作成功后的结果
   });
   ```

   



# async await

await：**同步**获取 Promise 结果

1. await 必须放在 async 函数中。async 函数中可以没有 await

2. async 函数的返回值是 Promise 对象，Promise 对象的结果由 async 函数执行的返回值决定

   ```javascript
   const axios = async () => {
   	return 1            // 成功
   	// return Promise.resolve(1)   // 成功
   	// throw "err"      // 失败
   }
   
   axios()
   .then(res => {
   	console.log(res);
   })
   .catch(err => console.error(err))
   ```

3. await 表达式

   -  await 右侧的表达式一般为 Promise 对象，但也可以是其它的值
   - 如果表达式是 Promise 对象，await 返回的是 Promise 成功的值
   - 如果表达式是其它值, 直接将此值作为 await 的返回值

   ```javascript
   const axios = () => {
       return new Promise((resolve, reject) => {
           resolve(1)
   		// reject("err")
   		// throw "err"
       })
   };
   
   (async () => {
   	try {
   		const result = await axios()
   		console.log(result);
   	} catch(err) {
   		console.error(err);
   	}
   })()
   ```

   

   