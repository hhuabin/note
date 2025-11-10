# 常用配置

1. **模块导入规则**

   第一组：内置模块

   ```javascript
   import path from 'path'
   ```

   第二组：外部模块（第三方库）

   ```javascript
   import React from 'react'
   ```

   第三组：内部模块（本地模块）

   ```javascript
   import Parent from '../Parent'     // 父级模块
   import utils from './utils'        // 同级模块
   ```

   在组之间强制添加空行

2. **禁止使用var定义变量**

3. **缩进：使用4空格缩进，禁止使用tab缩进**

4. **关键字前后需要添加空格**

   ```typescript
   if () {}
   ```

5. **对象：定义单行对象，属性前后需要有空格**

   ```typescript
   const obj = { a: 1 }
   ```

6. **对象：定义多行的Array或者{}，最后一行需使用`,`结尾**

   ```typescript
   const obj = {
       a: 1,
   }
   ```

7. **行结尾：禁止使用`;`或者空格结尾**

8. **文件：使用`utf-8`编码**

9. **文件：代码之间最多空置2行**

10. **文件：文件需要以空行结尾**

11. **文件：一个文件最大行数为300行**



# React示例

```javascript
module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: false },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'unicode-bom': ['warn', 'never'],                  // must use utf-8
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',      // 避免滥用 any
        '@typescript-eslint/no-inferrable-types': 'off',   // 禁止对推断类型的多余注解
        '@typescript-eslint/consistent-type-imports': ['warn', { 'prefer': 'type-imports' }],      // 强制使用 type imports
        'no-var': ['error'],                               // use const
        'prefer-const': ['error'],                         // not use let
        'indent': ['warn', 4, { 'MemberExpression': 'off' }],      // 4 spaces
        'no-tabs': ['warn'],                                       // disabled tab
        'no-mixed-spaces-and-tabs': ['warn'],                      // disabled mixed
        'keyword-spacing': ['warn', { 'before': true, 'after': true }],                            // add spacing before and after keywords
        'object-curly-spacing': ['warn', 'always'],                // add spacing in object
        'comma-dangle': ['error', 'always-multiline'],             // use , end in object and array
        'semi': ['warn', 'never'],                                 // no end of spacing ;
        'no-trailing-spaces': ['warn', { 'skipBlankLines': false, 'ignoreComments': false }],      // no end of spacing
        'no-multiple-empty-lines': ['warn', { 'max': 2 }],         // max 2 empty lines in file
        'eol-last': ['error', 'always'],                           // file end of empty line
        'max-lines': ['warn', 300],                                // maximum 300 of lines per file
    },
}
```

