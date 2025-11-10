# declare

`declare` 是 TypeScript 中的一个关键字，用于声明变量、函数、类、模块或类型，而不提供具体实现。它的作用是告诉 TypeScript 编译器这些实体的存在（通常是外部或全局的实体），**以便在代码中引用时不会报错**



1. **声明全局变量或类型**

   - 当一个变量或类型在全局环境中可用，但没有明确地在代码中定义时，使用 `declare` 让 TypeScript 知道它的存在。
   - 常用于引入第三方库、全局变量或类型。

   ```typescript
   declare const VERSION: string; // 声明一个全局常量
   console.log(VERSION); // 使用时不会报错
   ```

2. **声明模块**

   - 用于告诉 TypeScript 某个模块的类型定义，但没有提供具体的实现代码。
   - 常用于引入没有类型定义文件的第三方模块。

   ```typescript
   declare module 'my-library' {
       export function doSomething(): void;
   }
   
   import { doSomething } from 'my-library';
   doSomething(); // 不会报错
   ```

3. **声明类型或接口**

   - 用于定义**全局**或模块内的类型。
   - 常用于 `.d.ts` 文件中，声明类型以便整个项目中可用。

   ```typescript
   declare type User = {
       id: number;
       name: string;
   };
   
   const user: User = { id: 1, name: "Alice" };
   ```

4. **声明全局作用域**

   - 用于为整个项目定义全局变量或类型。
   - 使用 `declare global` 来定义全局作用域的内容。

   ```typescript
   declare global {
       interface Window {
           myGlobalVar: string;
       }
   }
   
   window.myGlobalVar = "Hello, world!";
   ```

5. **扩展已有类型**

   - 使用 `declare` 来为已有的模块、全局对象或接口添加额外的属性。

   ```typescript
   declare module 'express' {
       interface Request {
           user?: { id: number; name: string };
       }
   }
   ```