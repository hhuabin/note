使用

```nginx
检查配置文件的正确性
nginx -t

启动 nginx
nginx

停止 nginx
nginx -s stop
nginx -s quit

查看 nginx 进程
ps -ef | grep nginx

重新加载配置文件
nginx -s reload
```



# 本机域名解析

1. 配置本机域名解析

   在`C:\Windows\System32\drivers\etc`下的`hosts`文件

   ```cmd
   C:\Windows\System32\drivers\etc
   ```

   将`127.0.0.1`映射到`localhost`

   ```
   127.0.0.1    localhost
   ```



# server_name

nginx的域名

```nginx
server {
    listen       80;
    server_name  localhost;      # 域名、主机名

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        root   html;     # 匹配到虚拟机根目录的html
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
    	root   html;
    }
}
```

以上将localhost映射到80端口

1. 将`www.huabin.com`映射到80端口上

   ```nginx
   listen       80;
   server_name  www.huabin.com;      # 域名、主机名
   ```

2. 主机名匹配是从上往下单一匹配的，匹配到就结束

   localhost将会映射到80端口而不会到8080

   ```nginx
   server {
   	listen       80;
       server_name  localhost;      # 域名、主机名
       location / {
           root   /bin1;      # 匹配到虚拟机/bin1目录的index.html
           index  index.html index.htm;
       }
   }
   
   server {
   	listen       8080;
       server_name  localhost;      # 域名、主机名
       location / {
           root   /bin2;
           index  index.html index.htm;
       }
   }
   ```

3. 通配符匹配

   ```nginx
   server_name  *.huabin.com;
   ```

   ```nginx
   server_name  www.huabin.*;
   ```

4. 正则匹配

   `server_name` 中的正则表达式必须以 `~` 或 `~*` 开头，否则将被解释为普通字符串

   ```nginx
   server_name  ~^[0-9]+\.huabin\.com$;
   ```



# 跨域

跨域可以在SpringBoot或者Nginx中解决，方法如下

1. SpringBoot

   ```java
   @RestController
   @CrossOrigin(origins = "*")           // 允许其他源访问服务器
   public class MyController {
       @GetMapping("/api/data")
       public ResponseEntity<String> getData() {
           return ResponseEntity.ok("Some data");
       }
   }
   ```

   或者全局配置跨域亦可

2. Nginx

   ```nginx
   server {
       listen 80;
       server_name example.com;
   
       location / {
           add_header 'Access-Control-Allow-Origin' 'https://allowed-origin.com';  # 指定允许的跨域请求源
           add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';  # 指定允许的 HTTP 方法
           add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization'; # 指定允许的请求头
           add_header 'Access-Control-Allow-Credentials' 'true'; # 允许跨域请求发送凭证（如 cookies ）
   
           # 处理预检请求
           if ($request_method = 'OPTIONS') {
               add_header 'Access-Control-Max-Age' 1728000;
               add_header 'Content-Length' 0;
               add_header 'Content-Type' 'text/plain; charset=utf-8';
               return 204;
           }
   
           # 其他配置...
       }
   }
   ```

在不同的地方解决跨域各有优缺点，如下：

**在 Spring Boot 解决跨域问题**：

- 适合需要**细粒度控制**跨域策略的情况，例如基于用户身份或请求内容进行动态配置
- 适合**单一应用**或应用集群场景，不涉及大量的跨域请求
- 适合需要与应用的**安全策略和业务逻辑深度集成**的场景

**在 Nginx 解决跨域问题**：

- 适合需要**高性能**处理大量跨域请求的场景，尤其是需要处理大量 `OPTIONS` 预检请求的情况
- 适合需要在多个应用间**统一管理**跨域策略的场景
- 适合希望通过反向代理服务器来**降低应用服务器压力**的情况

**建议**：对于大多数生产环境，推荐使用 **Nginx 解决跨域问题**，以利用其性能优势和统一管理能力。如果需要更灵活的跨域策略，或者你的应用有特定的动态跨域需求，则可以选择在 **Spring Boot 解决**

