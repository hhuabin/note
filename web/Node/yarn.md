# yarn安装使用

**使用node安装**

```shell
npm install --global yarn
```

**查看yarn版本**

```shell
yarn --version
```



# 镜像源

1. 查看当前镜像

   ```bash
   yarn config get registry
   ```

2. 打开终端或命令行，运行以下命令来配置 npm 使用淘宝镜像：

   ```bash
   yarn config set registry https://registry.npm.taobao.org
   
   yarn config set registry https://registry.npmmirror.com
   ```

3. 恢复为原来的镜像源

   ````bash
   yarn config set registry https://registry.yarnpkg.com
   ````




**初始化项目**

```shell
yarn init
```

**安装包**（根据项目中的 `package.json` 文件安装所有依赖包）

```shell
yarn install
```

**添加包**（默认加在生产环境）

```shell
yarn [global] add package-name@version [--save / -S]
```

**开发依赖**

```shell
yarn add package-name (--dev / -D)
```

**卸载包**

```shell
yarn remove package-name
```

**更新包**

```shell
yarn upgrade                                  // 将所有的依赖包更新到符合package.json文件中指定版本范围的最新版本
yarn upgrade package-name                     // 将特定包更新到符合package.json文件中指定版本范围的最新版本
yarn upgrade package-name@latest              // 将指定包更新至最新版本，并同步修改package.json文件
```

**查看指定包版本**

```shell
yarn info <package-name> version              // 查看指定包的版本
yarn info <package-name> versions             // 查看指定包的所有版本
```

**清除缓存**

```bash
yarn cache clean
```

**暴露webpack配置**，==不可回退==

```bash
yarn eject
```



## package version

**package版本号自动更新**

```bash
yarn version --patch --no-git-tag-version
```

- `package.json` 和 `yarn.lock` 的版本号更新。
- **不会** 生成 Git commit 或 tag

| 参数                   | 作用                                             |
| :--------------------- | :----------------------------------------------- |
| `--patch`              | 将版本号的 **补丁号** +1（如 `1.0.0` → `1.0.1`） |
| `--minor`              | 更新次版本号（如 `1.0.0` → `1.1.0`）             |
| `--major`              | 更新主版本号（如 `1.0.0` → `2.0.0`）             |
| `--no-git-tag-version` | 禁止自动创建 Git commit 和 tag                   |

```typescript
"major": "yarn version --major --no-git-tag-version",
"minor": "yarn version --minor --no-git-tag-version",
"patch": "yarn version --patch --no-git-tag-version"

"build": "tsc && yarn patch && vite build",      // 打生产包自动更新小版本号
```



# Webpack(Vite自动忽略)

**生产环境打包命令**（craco）

```json
"build": "react-scripts build"

"build": "craco build"
```

```bash
yarn run build
```



**开发环境打包命令**（Webpack）

1. 使用`dotenv`(推荐)

   ```bash
   yarn add dotenv-cli --dev
   ```

   ```json
   "build:dev": "dotenv -e .env.development react-scripts build"
   
   "build:dev": "dotenv -e .env.development craco build"
   ```

   ```bash
   yarn run build:dev
   ```

   此时会有一个问题，`process.env.NODE_ENV`的值仍然是`"production"`，因为运行的是`craco build`，只是把.env.development文件加载进去了。.env.development的环境变量会生效，但是在 craco 运行的项目中，.env.development不能改变`NODE_ENV`的值，即一定要是`"production"`，不然会报 craco-less错误

2. 使用`env.cmd`

   ```bash
   yarn add env-cmd --dev
   ```

   ```json
   "build:dev": "env-cmd -f .env.development react-scripts build"
   
   "build:dev": "env-cmd -f .env.development craco build"
   ```
   
   ```bash
   yarn run build:dev
   ```
   
   此时会有一个问题，`process.env.NODE_ENV`的值仍然是`"production"`，因为运行的是`craco build`，只是把.env.development文件加载进去了。.env.development的环境变量会生效，但是在 craco 运行的项目中，.env.development不能改变`NODE_ENV`的值，即一定要是`"production"`，不然会报 craco-less错误
