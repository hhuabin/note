# gzip

`gzip` 通常用于对 **服务器返回的数据** 进行压缩



## 原理

`gzip` 是一种文件压缩格式与工具，它使用一种基于 **LZ77** 和 **Huffman 编码** 算法的无损压缩技术来减小文件的体积。其主要目的是减少数据传输量，尤其是在 HTTP 请求的响应过程中，**显著加快网页加载速度**



## 使用场景

`gzip` 通常用于压缩以下类型的内容：

- **文本类文件**：如 HTML、CSS、JavaScript、XML、JSON 等，因为这些文件中通常有很多重复的字符或结构，可以有效压缩。
- **非压缩的图像**：如 SVG（文本格式），但对于已经压缩的图像（如 PNG、JPEG、GIF），`gzip` 效果不明显，因为它们已经通过更高效的图像压缩算法压缩过。

**`gzip` 不适合的场景**

- **已压缩文件**：如 ZIP、MP3、JPEG 等文件，这些文件已经过压缩处理，再使用 `gzip` 压缩几乎不会产生额外效果，反而可能会略微增大文件体积。
- **小文件**：非常小的文件（如几百字节的文件），`gzip` 压缩的效果有限，甚至可能因为元数据的添加导致文件增大



## 优势

- **节省带宽**：通过压缩数据，服务器与客户端之间的传输数据量显著减少。
- **加快页面加载速度**：文件越小，网络传输时间越短，尤其对网页中的文本文件（如 HTML、CSS、JavaScript）压缩效果尤为明显。
- **减少服务器负载**：虽然压缩和解压缩需要额外的 CPU 开销，但通常这会比数据传输节省更多时间



# `gzip` 在 HTTP 中的应用

在 HTTP 协议中，`gzip` 常被用来压缩服务器返回的内容，减少网络带宽的消耗，加速页面加载。其工作流程如下：

1. **客户端请求压缩**： 当客户端（浏览器）发出请求时，它会在请求头中加入 `Accept-Encoding`，表明它能够处理哪些类型的压缩。例如：

   ```http
   Accept-Encoding: gzip, deflate, br
   ```

2. **服务器响应压缩内容**： 服务器检测到客户端支持 `gzip` 后，会对响应内容进行压缩，并在响应头中注明使用了 `gzip` 压缩：

   ```http
   Content-Encoding: gzip
   ```

3. **客户端解压**： 客户端收到压缩后的数据后，会根据 `Content-Encoding: gzip` 头部信息解压数据，并展示解压后的内容



# Nginx配置

1. **打开 Nginx 配置文件**

   在终端中，打开 Nginx 的主配置文件，通常在 `/etc/nginx/nginx.conf` 路径下。

   ```bash
   sudo vim /etc/nginx/nginx.conf
   ```

2. **配置 `gzip` 压缩**

   找到 `http` 块，并在其中添加或修改以下 `gzip` 配置：

   ```bash
   http {
       # 开启 gzip 压缩
       gzip on;
   
       # 设置最小启用压缩的文件大小，小于 1k 的文件将不压缩
       gzip_min_length 1k;
   
       # 压缩级别，取值范围是 1-9，数字越大压缩率越高，但同时对 CPU 消耗更大
       gzip_comp_level 6;
   
       # 开启 gzip 压缩的 MIME 类型
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;
   
       # 是否对所有请求启用 gzip
       gzip_vary on;
   
       # 禁用对 IE6 进行 gzip 压缩，IE6 存在 gzip 压缩问题
       gzip_disable "msie6";
   
       # 设置是否压缩响应头中含有 "gzip" 的请求
       gzip_proxied any;
   
       # 设置客户端请求是否支持压缩
       gzip_http_version 1.1;
   }
   ```

3. **重启 Nginx**

   保存并退出配置文件后，测试 Nginx 配置是否正确：

   ```bash
   sudo nginx -t
   ```

   如果没有错误，重新加载 Nginx 配置：

   ```bash
   sudo systemctl reload nginx
   ```



# gzip_static

静态压缩

`gzip_static` 是 Nginx 中的一个指令，用于在向客户端提供资源时直接发送 **预先压缩好** 的 `.gz` 文件，而不需要在每次请求时动态压缩文件。这**可以显著提高性能**，因为不需要在每个请求时对文件进行 `gzip` 压缩

---

**处理逻辑：**

1. 当客户端发送请求时，Nginx 会先查看客户端是否支持 `gzip`（通过 `Accept-Encoding` 请求头判断）
2. 如果客户端支持 `gzip`，Nginx 会检查服务器上是否存在相应的 `.gz` 文件
3. 如果存在 `.gz` 文件，Nginx 将直接返回该文件，并设置正确的响应头
4. 如果客户端不支持 `gzip` 或 `.gz` 文件不存在，Nginx 将返回未压缩的文件

---

1. 预压缩文件的生成

   为了使用 `gzip_static`，你需要事先生成 `.gz` 压缩文件。**可以通过命令行工具如 `gzip` 来生成这些文件**：

   ```bash
   gzip -k example.js
   ```

2. 配置 `gzip_static` 的方法

   ```nginx
   http {
       gzip on;                # 开启 gzip 压缩
       gzip_static on;         # 启用 gzip_static 模块
   
       gzip_vary on;           # 向支持 gzip 的客户端发送 Vary 头
       gzip_proxied any;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```
   
   - **`gzip_static on;`**：开启 `gzip_static` 模块。当客户端请求某个文件时，Nginx 会检查是否有相应的 `.gz` 文件并直接返回该文件
   - **`gzip on;`**：确保动态的 gzip 压缩功能依然有效，用于处理那些没有预压缩文件的请求
   - **`gzip_types`**：指定哪些文件类型会使用 gzip 压缩或静态压缩版本
   
   ```nginx
   server {
       location / {
           gzip on;
           gzip_static on;
           gzip_types text/css application/javascript;
           gzip_vary on;
       }
   }
   ```

---

注意事项：

- **手动生成 `.gz` 文件**：启用 `gzip_static` 后，你必须手动生成压缩文件，或者使用自动化构建工具生成
- **客户端支持 `gzip`**：只有在客户端支持 `gzip` 压缩时，Nginx 才会发送 `.gz` 文件；否则，发送未压缩的版本
- **不要使用 `gzip_static on;`和`gzip_static always;` 一起**：`gzip_static always;`将无条件发送`.gz`文件，即使客户端不支持`gzip`，这可能导致客户端无法解压缩文件



# gunzip_module

`gunzip_module` 是 Nginx 的一个内置模块，用于支持 **解压缩 HTTP 响应**。这个模块能够将使用 `gzip` 压缩的 HTTP 响应在服务器端进行解压缩，然后将解压缩后的内容发送给客户端。该模块的常见用途是在客户端不支持 `gzip` 时解压缩响应



## gunzip_module作用

`gunzip_module` 在 Nginx 中用于解压缩由 `gzip` 压缩的 HTTP 响应。与 `gzip` 模块不同，`gunzip_module` 的目的是针对那些不支持 `gzip` 压缩的客户端。在服务器上进行解压缩，以便客户端能够正常接收响应内容



## 使用gunzip_module

要在 Nginx 中使用 `gunzip_module`，首先需要确保 Nginx 编译时启用了该模块。通常，现代版本的 Nginx 已经包含了 `gunzip` 模块，但你可以通过以下命令确认：

```bash
nginx -V
```

如果显示了 `--with-http_gunzip_module`，说明模块已启用



**Nginx 配置示例**

要使用 `gunzip` 模块，你需要在 Nginx 配置文件中启用它：

```nginx
http {
    # 启用 gunzip 模块
    gunzip on;

    # gzip 模块设置
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

- `gunzip on;`：启用 `gunzip` 模块。
- `gzip on;`：启用 `gzip` 压缩模块（它负责将响应压缩后发送到客户端）。
- `gzip_types`：指定哪些 MIME 类型的文件可以进行 `gzip` 压缩