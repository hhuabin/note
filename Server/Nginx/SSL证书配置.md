# Nginx SSL 配置

- **HTTP** 的默认端口是 **80**
- **HTTPS** 的默认端口是 **443**

```nginx
server {
    listen 443 ssl;  # 监听 443 端口，启用 SSL
    server_name example.com www.example.com;  # 你的域名

    # SSL 证书文件
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;   # 证书位置的绝对路径
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;  # 使用安全的 TLS 版本
    ssl_ciphers HIGH:!aNULL:!MD5;   # 安全密码套件

    # 你的站点其他配置，比如根目录和索引文件
    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```



# http重定向到https

```nginx
server {
    listen 80;  # 监听 HTTP 端口
    server_name example.com www.example.com;  # 替换为你的域名

    # 将所有请求重定向到 HTTPS
    return 301 https://$host$request_uri;
}
```

