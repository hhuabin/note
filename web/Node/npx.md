# npx

`npx` 是一个用于运行 Node 包(package)中的可执行文件的工具。它是 Node.js 版本 5.2.0 以及更高版本中自带的。`npx` 允许你在不全局安装包的情况下运行它们的命令。

`npx` 的主要作用有两个：

1. **运行本地安装的包：** 当你需要运行一个已经安装在项目中的 Node 包的可执行文件时，可以使用 `npx`。这避免了你全局安装一些工具，而是直接从项目的 `node_modules` 中运行。

   ```bash
   npx some-package
   ```

2. **运行远程仓库中的包：** 通过 `npx` 你可以运行远程仓库中的包，而无需手动安装它们。这对于一次性使用的工具非常方便，例如初始化项目或运行脚本。

   ```bash
   npx create-react-app my-react-app
   ```

在上述例子中，`create-react-app` 是一个远程仓库中的工具，`npx` 会在运行时自动下载并执行它，而不需要手动安装。