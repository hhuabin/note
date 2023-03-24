使用

```nginx
检查配置文件的正确性
nginx -t

启动 nginx
nginx

停止 nginx
nginx -s stop

查看 nginx 进程
ps -ef | grep nginx

重新加载配置文件
nginx -s reload
```

# 部署静态资源

Nginx可以作为静态web服务器来部署静态资源。静态资源指在服务端真实存在并且能够直接展示的一些文件，比如常见的htm[页面、css文件、js文件、图片、视频等资源。相对于Tomcat，Nginx处理静态资源的能力更加高效，所以在生产环境下，一般都会将静态资源部署到Nqinx中将静态资源部署到Nginx非常简单，只需要将文件复制到Nginx安装目录下的html目录中即可

```nginx
server {
    listen 80;     # 监听端口
    server_name localhost; # 服务器名称
    location / {           # 匹配客户端请求url
        root html;         # 指定静态资源根目录
        index index.html;  # 指定默认首页
    }
}
```

# 反向代理

```nginx
# 将 80 端口的请求转发给 81
server {
    listen 80;     # 监听端口
    server_name localhost; # 服务器名称
    location / {           # 匹配客户端请求url
        proxy_pass http://192.168.138.101:8081; #反向代理配置，将请求转发到指定服务
    }
}
```

# 负载均衡

```nginx
upstream targetserverf {           #upstream指令可以定义一组服务器
    server 192.168.138.101:8080;
    server 192.168.138.101:8081;
}
server {
    listen 8080;
    server_name localhost;
    location / {
        proxy_pass http://targetserver;
    }
}
```
