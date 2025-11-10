# js文件处理

在 Node.js 环境下，`.js` 文件被视为一个 **模块**。当你通过 `require` 或 `import` 引入 `.js` 文件时，Node.js 会将该文件作为一个独立的模块来加载和执行。Node.js 会为每个模块创建一个独立的作用域和环境，因此模块中的变量和函数不会与其他模块产生冲突。这种模块化方式使得代码更具结构性和可维护性

在 Node.js 中，每个 `.js` 文件在加载时会经历以下处理步骤

1. **包装在模块函数中**：Node.js 将文件内容包装在一个函数中，使每个模块都拥有独立的作用域。这个包装函数的签名类似于：

   ```javascript
   (function(exports, require, module, __filename, __dirname) {
       // 这里是模块的代码
       console.log(arguments);
       const [_exports, _require, _module, filename, dirname] = arguments
       console.log(_exports, _require, _module, filename, dirname)
       
       return module.exports
   });
   ```

   这样，文件内的变量不会污染其他模块，也不会被外部直接访问。

2. **传递模块特有的变量**：

   - `exports`：模块的导出对象，用于暴露模块内的内容。
   - `require`：用于引入其他模块的函数。
   - `module`：当前模块的引用，它有一个 `exports` 属性，通常与 `exports` 一致。
   - `__filename`：当前模块文件的完整路径。
   - `__dirname`：当前模块所在目录的路径。

3. **独立的作用域**：由于 `.js` 文件被包装在函数中，文件内的变量和函数不会与全局作用域冲突，使得各模块之间彼此隔离。

4. **导出与导入**：每个 `.js` 文件可以通过 `module.exports` 或 `exports` 对象导出想要暴露的内容，其他文件可以通过 `require` 来引入和使用

| 参数         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `exports`    | 模块的导出对象，通过它暴露模块内部的变量和函数（exports = module.exports） |
| `require`    | 用于加载并引入其他模块的函数。                               |
| `module`     | 表示当前模块的对象，包含模块的相关信息。`module.exports` 是**最终的导出对象**。 |
| `__filename` | 当前模块文件的绝对路径，包含文件名。                         |
| `__dirname`  | 当前模块文件所在目录的绝对路径，不包含文件名。               |



# js文件

```javascript
console.log(arguments);
const [_exports, _require, _module, filename, dirname] = arguments
console.log(_exports, _require, _module, filename, dirname)

// 默认传进来的 exports === module.exports, this === module.exports module.exports = {}
console.log(exports === module.exports, this === exports);
// 那么就有 this === exports === module.exports = {}
```

```javascript
this.a = 1
exports.b = 2
exports = {
    c: 3
}
module.exports = {
    d: 4
}

console.log(this)       // {a: 1, b: 2}
console.log(exports)    // {c: 3}
console.log(module.exports)  // {d: 4}

// 最后导出的只有 module.exports，即 {d: 4}
```



# require源码

```javascript
// 模拟 require 函数的核心结构
function require(modulePath) {
    // 1. 解析路径，判断模块类型
    const resolvedPath = Module._resolveFilename(modulePath);

    // 2. 检查缓存
    if (Module._cache[resolvedPath]) {
    return Module._cache[resolvedPath].exports;
    }

    // 3. 创建模块对象，并将其缓存
    const module = new Module(resolvedPath);
    Module._cache[resolvedPath] = module;

    // 4. 加载模块（读取并执行代码）
    module.load(resolvedPath);

    // 5. 返回模块的导出内容
    return module.exports;
}

// Module 类的简化版本
class Module {
    constructor(id) {
        this.id = id;
        this.exports = {}; // 导出对象
    }

    // 模拟模块加载方法
    load(filename) {
        const content = fs.readFileSync(filename, 'utf8');

        // 将模块包装在一个函数中
        const wrapper = Module.wrap(content);

        // 执行包装函数，将 this.exports 传递给模块代码
        const compiledWrapper = eval(wrapper);
        
        // 这里定义了exports = module.exports，this = module.export
        compiledWrapper(this.exports, require, this);
    }

    // 包装函数
    static wrap(content) {
    	return `(function (exports, require, module) { ${content} \n})`;
    }

    // 解析模块路径（简化）
    static _resolveFilename(modulePath) {
        // 此处省略复杂的路径解析逻辑
        return modulePath;
    }
}

// 模块缓存
Module._cache = Object.create(null);
```

