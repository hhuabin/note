# **Rollup 的主要特性**

1. **原生支持 ES 模块（ESM）**
   - Rollup 完全基于 ES Module 规范设计，能更好地利用静态分析的能力，生成结构清晰且高效的打包文件。
   - 适合打包现代 JavaScript 库，支持 Tree Shaking 和模块优化。
2. **Tree Shaking**
   - Rollup 的 Tree Shaking 功能可以自动移除未使用的代码，减少最终打包文件的体积，提升运行性能。
3. **灵活的输出格式**
   - 支持多种模块格式输出，例如：
     - **ES Module (`esm`)**
     - **CommonJS (`cjs`)**
     - **IIFE (Immediately Invoked Function Expression)** 等。
   - 适用于多种场景，包括前端项目、Node.js 应用和库开发。
4. **插件生态**
   - Rollup 提供强大的插件系统，支持代码转译（如 Babel）、样式处理（如 PostCSS）、代码压缩、动态加载等功能。
   - 官方和社区都有丰富的插件库（如 `@rollup/plugin-node-resolve`、`rollup-plugin-terser`）。
5. **输出文件的高度优化**
   - 生成的代码非常简洁，可读性强，尤其适合用来构建 JavaScript 库