# webpack打包过程

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。它从项目的入口文件开始，递归地构建一个依赖关系图 (Dependency Graph)，将项目中的模块按特定规则进行打包。下面是 Webpack 打包过程的简要描述：

### 1. **初始化 (Initialization)**

- **读取配置**: Webpack 从配置文件 (如 `webpack.config.js`) 读取配置，合并从 CLI 传递的参数。
- **创建编译器实例**: 根据配置生成一个 `Compiler` 实例，并初始化一系列的插件 (Plugins)。
- **插件启动**: 通过 `Compiler` 对象调用插件的 `apply` 方法，插件通过挂载钩子函数参与到 Webpack 构建流程的各个阶段。

### 2. **编译 (Compilation)**

- **确定入口**: 从配置的入口文件开始 (`entry`)，递归分析和处理依赖。
- **模块解析**: **使用 `Loader` 将文件转换成模块**。Webpack 会根据配置的 `module.rules` 中的 Loader，对不同类型的文件进行处理，比如将 TypeScript 转换为 JavaScript，将 Less 转换为 CSS 等。
- **生成依赖关系图**: 每一个模块可能依赖其他模块，这样就构成了一个依赖关系图。Webpack 递归地解析每个模块的依赖，直到所有依赖都解析完毕。



# loader和plugin

- **loader**：==webpack 只能理解 JavaScript 和 JSON 文件==，这是 webpack 开箱可用的自带能力。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中
- **plugin**：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：==打包优化，资源管理，注入环境变量==
