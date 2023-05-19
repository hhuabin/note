[craco官网](https://craco.js.org/docs/getting-started/)

`craco` 和 `react-app-rewired`（以下简称 `rewired`）都是用于修改 `create-react-app` 的配置的工具，它们的作用类似，但是有以下几点不同：

1. 实现原理不同

   `craco` 使用的是 `create-react-app` 提供的 `Browserslist` 和 `Webpack` 配置，通过封装好的 `create-react-app` 的 `webpack` 配置来修改 Webpack 配置。而 `rewired` 使用的是 `react-scripts` 内置的 `react-app-rewired`，通过直接读取和修改 `webpack.config.js` 文件来修改 Webpack 配置。

2. **配置方式不同**

   `craco` 使用的是 `craco.config.js` 文件来配置，其中包含一个 `webpack` 属性用于修改 Webpack 配置，其它的配置项都通过 `create-react-app` 提供的环境变量进行配置。

   而 `rewired` 则是通过 `config-overrides.js` 文件来配置，其中包含一个 `module.exports` 对象用于修改 Webpack 配置，而且它还支持在项目根目录下创建 `.env` 文件来配置环境变量。

   二者不可搭配使用

3. 插件支持不同

   `craco` 可以很方便地集成许多插件，例如 `craco-less`、`craco-antd`、`craco-alias` 等，通过这些插件可以很方便地进行常用配置。而 `rewired` 则需要手动安装和配置相关的插件，例如 `customize-cra`、`react-app-rewire-alias` 等。

4. 兼容性不同

   `craco` 从 `create-react-app@2.1.0` 开始支持，因此支持的版本范围较新。而 `rewired` 支持的版本范围更广，可以兼容 `create-react-app@1.x` 和 `2.x` 版本。

   总体来说，`craco` 和 `rewired` 都是比较方便的 `create-react-app` 配置工具，但是它们的实现原理、配置方式、插件支持和兼容性等方面有所不同，需要根据具体需求进行选择。



