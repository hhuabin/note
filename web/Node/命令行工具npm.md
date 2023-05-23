查看node版本

```
node --version
```

查看全局包

```
npm list -g --depth 0
```

加入生产依赖

```
npm i 包名[@version] --save(-S) [-g]
```

加入开发依赖

```
npm i 包名[@version] --save-dev(-D)
```

生成报告

```
npm run build --report
```

查看包的当前版本号

```
npm view 包名 version
```

查看包的所有版本号

```
npm view 包名 versions
```

装最新版本的包

```
npm install <package-name>@latest
```

