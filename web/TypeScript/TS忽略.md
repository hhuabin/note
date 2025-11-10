# ts-ignore

1. 忽略整个文件的ts检查

   在文件的开头添加 `// @ts-ignore` 或`// @ts-nocheck`注释，来忽略整个文件的类型检查

   ```typescript
   // @ts-ignore
   
   ...
   ```

   ```typescript
   // @ts-nocheck
   
   ...
   ```

2. 忽略下一行的`ts`错误

   ```typescript
   // @ts-ignore
   ```

   ```typescript
   const num: number = "123"; // TypeScript会报错，类型不匹配
   
   // @ts-ignore
   const num2: number = "123"; // 使用 @ts-ignore，TypeScript忽略这一行的类型错误
   ```




# eslint

1. 忽略整个文件的 eslint 检查

   `/* eslint-disable */`

2. 忽略下一行检查

   `// eslint-disable-next-line`

3. 忽略该文件关于any的报错

   在文件的**顶部**添加 `eslint-disable` 注释，可以禁用整个文件的 `any` 类型检查

   ```typescript
   /* eslint-disable @typescript-eslint/no-explicit-any */
   
   ...
   ```

   
