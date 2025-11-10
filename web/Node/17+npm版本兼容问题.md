node.js V17版本中发布的OpenSSL3.0，而OpenSSL3.0对允许算法和密钥大小增加了严格的限制

解决办法：

`set NODE_OPTIONS=--openssl-legacy-provider` 是设置 `NODE_OPTIONS` 环境变量的命令，用于在 Node.js 运行时启用 OpenSSL 的旧版提供程序

1. 方式1，单次启动：计算机的`cmd` 下执行

   ```shell
   SET NODE_OPTIONS=--openssl-legacy-provider && npm run serve
   ```

2. 方式2：在 package.json 中把scripts下的 serve 改成如下

   ```shell
   SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve
   ```




- 设置`NODE_OPTIONS`

   ```shell
   SET NODE_OPTIONS=--openssl-legacy-provider
   ```

- `NODE_OPTIONS` 设置恢复为默认值，`NODE_OPTIONS` 变量将会被清空，恢复为默认值。

   ```shell
   set NODE_OPTIONS=
   ```
   
   
