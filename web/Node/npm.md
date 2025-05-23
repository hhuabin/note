**查看node版本**

```shell
node --version
node -v
```

**查看npm版本**

```shell
npm -v
```



# 镜像源

1. 查看当前镜像

   ```bash
   npm config get registry
   ```

2. 打开终端或命令行，运行以下命令来配置 npm 使用淘宝镜像：

   ```bash
   npm config set registry https://registry.npm.taobao.org/
   
   ## 阿里云维护的一个国内 npm 镜像源，也是原淘宝镜像的升级版本，用于加速 npm 包的下载
   npm config set registry https://registry.npmmirror.com
   ```

3. 恢复为原来的镜像源

   ````bash
   npm config set registry https://registry.npmjs.org/
   ````




**初始化项目**

```shell
npm init
```

**查看全局包**

```shell
npm list -g --depth 0
```

**加入生产依赖**

```shell
npm i package-name[@version] --save(-S) [-g]
```

**加入开发依赖**

```shell
npm i package-name[@version] --save-dev(-D)
```

**生成报告**(vue)

```json
"build": "vue-cli-service build --report",
```

```shell
npm run build
```

**查看包的当前版本号**

```shell
npm view package-name version
```

**查看包的所有版本号**

```shell
npm view package-name versions
```

**装最新版本的包**

```shell
npm install package-name@latest
```

**更新包**

```shell
npm update                                 // 依据package.json进行更新，并同步更新package-lock.json文件
npm update package-name                    // 将特定包更新到符合package.json文件中指定版本范围的最新版本
npm update package-name@latest             // 将指定包更新至最新版本，并同步修改package.json文件
npm update package-name[@version]        // 更新指定包
```

**清除缓存**

```bash
npm cache clean --force
```



## package version

**package版本号自动更新**

```bash
npm version major --no-git-tag-version
```

- 更新 `package.json` 中的 `version` 字段
- 同步更新 `package-lock.json` 中的版本号（`package-lock.json`是`npm`的锁定文件，不会被yarn处理）
- **不会** 生成 Git commit 或 tag

| 参数                   | 作用                                             |
| :--------------------- | :----------------------------------------------- |
| `patch`                | 将版本号的 **补丁号** +1（如 `1.0.0` → `1.0.1`） |
| `minor`                | 更新次版本号（如 `1.0.0` → `1.1.0`）             |
| `major`                | 更新主版本号（如 `1.0.0` → `2.0.0`）             |
| `--no-git-tag-version` | 禁止自动创建 Git commit 和 tag                   |

```typescript
"major": "npm version major --no-git-tag-version",
```



# Vue

**生产环境打包命令**

```json
"build": "vue-cli-service build",
```

```bash
npm run build
```

**开发环境打包命令**

```json
"test": "vue-cli-service build --mode development",
```

在 Vue CLI 中的 `vue-cli-service build --mode development` 实际上是利用了 Vue CLI 内置的 `mode` 参数，该参数用于指定不同的构建模式，对应不同的环境配置

```bash
npm run test
```



**serve**

```bash
npm install -g serve
```

```bash
serve -s build
```

