# while

1. **while循环中不能使用异步函数**，会造成死循环

   在 JavaScript 中，`while` 循环本身并不能直接处理异步函数，因为它是一个同步的控制结构。这意味着如果你在 `while` 循环中调用异步函数，循环不会等待异步函数完成，而是会立即继续下一次迭代

   解决办法：使用 `async` 和 `await`。可以将 `while` 循环放在一 `async` 函数中，并在循环内部使用 `await` 来处理异步操作。这种方法可以使循环在每次迭代中等待异步操作完成

   ```javascript
   async function checkCondition() {
       // 模拟一个异步操作，例如从服务器获取数据
       return new Promise((resolve, reject) => {
           setTimeout(() => {
          		resolve('2'); // 模拟条件变化
           }, 1000); // 1秒后条件变化
       });
   }
   
   async function main() {
       let end = "1";
   
       while (end !== "2") {
           console.log(end);
   
           // 这里我们等待异步操作完成
           end = await checkCondition();
           if (end === "2") {
               console.log("Condition met, exiting loop");
               break; // 条件满足时退出循环
           }
       }
       console.log("Loop ended");
   }
   ```

   