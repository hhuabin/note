# 格式

控制规则是否启用+

| 值        | 含义                                           | 等价写法 |
| --------- | ---------------------------------------------- | -------- |
| `'off'`   | 关闭此规则，不进行检查                         | `0`      |
| `'warn'`  | 违反规则时发出警告（黄色提示，不影响构建）     | `1`      |
| `'error'` | 违反规则时报错（红色提示，通常会导致构建失败） | `2`      |



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
        // React
        'react-refresh/only-export-components': ['warn', { 'allowConstantExport': true }],
        'react-hooks/rules-of-hooks': 'error',                     // 检查 Hook 使用规则
        'react-hooks/exhaustive-deps': 'warn',                     // 检查依赖数组完整性
        // TS
        '@typescript-eslint/no-unused-vars': 'off',                // 允许未使用的变量
        '@typescript-eslint/no-explicit-any': 'warn',              // 避免滥用 any
        '@typescript-eslint/no-inferrable-types': 'off',           // 禁止对推断类型的多余注解
        '@typescript-eslint/consistent-type-imports': ['warn', { 'prefer': 'type-imports' }],      // 强制使用 type imports
        // Eslint
        // JS
        'unicode-bom': ['warn', 'never'],                          // must use utf-8
        'no-var': ['error'],                                       // use const no var
        'no-undef': ['error'],                                     // 禁止使用未定义变量
        'prefer-const': ['error'],                                 // not use let
        'quotes': ['warn', 'single'],                              // use single quotes
        'no-extra-boolean-cast': 'off',                            // allow !! and Boolean()
        'prefer-arrow-callback': 'warn',                           // 回调优先用箭头函数  [1,2].map(x => x*2)
        'no-duplicate-imports': 'warn',                            // 禁止重复 import，不分开导入,  import a, {b} from 'x'
        'no-unused-vars': ['off'],                                 // 允许未使用的变量
        // space
        'comma-spacing': ['warn', { before: false, after: true }], // 逗号后有空格  let a, b;
        'semi-spacing': ['warn', { before: false, after: true }],  // 分号后有空格  let a; let b;
        'space-in-parens': ['warn', 'never'],                      // 括号内无空格  let a = (1 + 2) * 3;
        'space-infix-ops': ['warn'],                               // 运算符两边必须空格  a + b
        'block-spacing': ['warn', 'always'],                       // {} 块内加空格  function() { return 1 }
        'keyword-spacing': ['warn', { 'before': true, 'after': true }],                            // add space before and after keywords
        'key-spacing': ['warn', { 'beforeColon': false, 'afterColon': true, 'mode': 'strict' }],   // : after with one space between object keys and values
        'object-curly-spacing': ['warn', 'always'],                // add space in object
        'space-before-function-paren': ['error', {                 // 函数括号前面添加空格
            'anonymous': 'always',                                 // 匿名函数
            'named': 'never',                                      // 命名函数
            'asyncArrow': 'always'                                 // 异步箭头函数
        }],
        // function
        'no-return-await': ['warn'],                               // return await fetch() -> return fetch()
        'max-depth': ['warn', 4],                                  // 限制函数嵌套层级为 4
        'max-params': ['warn', 4],                                 // 函数参数个数限制为 6
        'func-style': ['warn', 'expression'],                      // 统一使用函数表达式  function f() {} -> const f = function() {}

        // 缩进
        'indent': ['warn', 4, {                                    // indent with 4 spaces
            'MemberExpression': 'off',                             // 忽略链式调用换行时缩进 Promise.then()
            'SwitchCase': 1,                                       // switch case 缩进 1
            'offsetTernaryExpressions': true,                      // 三元表达式的 ? 和 : 相对上层多一个缩进
        }],
        'no-tabs': ['warn'],                                       // disabled tab
        'no-mixed-spaces-and-tabs': ['warn'],                      // disabled mixed
        // file
        'comma-dangle': ['error', 'always-multiline'],             // use , end in object and array
        'semi': ['warn', 'never'],                                 // no end of ;
        'no-trailing-spaces': ['warn', { 'skipBlankLines': false, 'ignoreComments': false }],      // no end of spaces
        'no-multiple-empty-lines': ['warn', { 'max': 2 }],         // max 2 empty lines in file
        'eol-last': ['error', 'always'],                           // file end of empty line
        'max-lines': ['warn', 300],                                // maximum 300 of lines per file
    },
}

```

