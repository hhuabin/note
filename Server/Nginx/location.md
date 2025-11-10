# location

**匹配规则的优先级顺序**

1. **精确匹配 (`=`)**
2. **前缀匹配，使用通配符 (`^~`)**
3. **正则匹配 (`~` 和 `~\*`)**
4. **前缀匹配（默认）**

**Nginx 在找到最合适的 `location` 后就会停止继续查找，因此，顺序非常重要**

匹配规则

1. 精确匹配

   ```nginx
   location = /exact {
       # 当请求的 URI 完全是 "/exact" 时匹配此规则
       ...
   }
   ```

2. 前缀匹配，使用通配符 (`^~`)

   ```nginx
   location ^~ /static/ {
       # 匹配所有以 "/static/" 开头的 URI，并停止正则匹配
       ...
   }
   ```

3. 正则匹配 (`~` 和 `~\*`)

   ```nginx
   location ~* \.(jpg|jpeg|png|gif)$ {
       # 匹配所有 .jpg .jpeg .png .gif 不区分大小写
   }
   ```
   
4. 前缀匹配（默认）

   ```nginx
   location /images/ {
       # 匹配所有以 "/images/" 开头的 URI
       ...
   }
   ```



## root和alias

`root` 指令用于设置请求 URI 对应的根目录路径。即，所有请求的路径会基于此根目录进行查找

`alias` 指令用于将请求 URI 显式地映射到不同的文件路径。这种情况下，URI 的一部分不会直接附加到路径后面

示例

```nginx
location /images/ {
    root /var/www;
}
```

当请求 `/images/photo.jpg` 时，Nginx 会在 `/var/www/images/photo.jpg` 路径下查找该文件

```nginx
location /images/ {
    alias /var/www/pictures/;
}
```

当请求 `/images/photo.jpg` 时，Nginx 会在 `/var/www/pictures/photo.jpg` 路径下查找该文件



## rewrite

`rewrite` 是 Nginx 中用于重写或修改请求 URI 的指令。通过 `rewrite` 指令，可以根据一定的规则将请求重定向到另一个 URI 或者内部处理不同的请求路径，也可用于隐藏真正的请求路径

rewrite指令语法

```nginx
location {
	rewrite regex replacement [flag];
}
```

- **`regex`**：正则表达式，用于匹配请求的 URI
- **`replacement`**：匹配成功时，将请求 URI 重写为这个值
- **`flag`**：可选参数，用于指定重写的行为
  - **`last`**：**默认值**。停止重写并将请求转发到新的位置，继续向下匹配。(可隐藏真实请求地址)
  - **`break`**：停止重写，并且不再向下匹配。(可隐藏真实请求地址)
  - **`redirect`**：返回 HTTP 302 临时重定向。
  - **`permanent`**：返回 HTTP 301 永久重定向

**使用正则时，`()` 可以用于捕获匹配的部分，`$1`, `$2` 用于引用捕获组**

---

1. 简单的重写规则

   ```nginx
   location /old-path {
       rewrite ^/old-path(.*)$ /new-path$1 permanent;
   }
   ```

   匹配所有以 `/old-path` 开头的请求，并将其重定向到 `/new-path`，使用 HTTP 301 永久重定向。

   例如：`/old-path/test` 将被重定向到 `/new-path/test`

2. 去掉 URI 中的特定部分

   ```nginx
   location / {
       rewrite /images/(.*)$ /pics/$1 last;
   }
   ```

   将 URI 中的 `/images/` 部分替换为 `/pics/`，并停止重写

   例如：`/images/photo.jpg` 会被内部重写为 `/pics/photo.jpg`

3. 根据条件重写

   ```nginx
   location / {
       if ($http_user_agent ~* MSIE) {
           rewrite ^(.*)$ /msie.html break;
       }
   }
   ```

   如果用户代理（浏览器）是 Internet Explorer，则将请求重写为 `/msie.html`，并停止重写。

   `$http_user_agent` 是一个内置变量，表示请求的用户代理字符串

4. 使用正则表达式进行重写

   ```nginx
   location / {
       rewrite ^/product/([0-9]+)/?$ /show_product.php?id=$1 break;
   }
   ```

   将 `/product/123` 的请求重写为 `/show_product.php?id=123`，并停止重写

   `([0-9]+)` 匹配一个或多个数字，并将其作为参数传递给 `replacement`

5. 配合 `try_files` 实现更复杂的重写逻辑

   ```nginx
   location / {
       try_files $uri $uri/ /index.php?$args;
   }
   ```

   尝试访问请求的 URI，如果失败，则尝试访问目录形式的 URI（在结尾加上 `/`），最后如果仍然无法匹配，则重写为 `/index.php` 并传递原始的查询参数 `$args`

**`rewrite` 指令的注意事项**

1. **性能考虑**：过多的 `rewrite` 规则可能影响 Nginx 的性能，因为每个请求都需要进行正则匹配。
2. **优先级和顺序**：`rewrite` 规则按顺序匹配，因此顺序非常重要，放在前面的规则优先级更高。
3. **避免无限重写**：使用 `rewrite` 时要防止出现无限重写循环，例如同一个 URI 不断被重写为相同的 URI



## proxy_pass（负载均衡）

1. proxy_pass

   `proxy_pass`与`root`、`index`是冲突的，配置了`proxy_pass`就不用配置`root`、`index`

   对服务器的请求会被代理到proxy_pass后面的网址去，后面的网址默认使用 `http` 协议(不配置就使用http)，不能使用https(证书关系)

   单个反向代理

   ```nginx
   server {
   	location / {
           proxy_pass bilibili.com;
           # proxy_pass 192.168.0.1:80;
           # root   /bin2;
           # index  index.html index.htm;
       }
   }
   ```

   **注意代理路径后面的`/`**

   - `/api`被代理到`bilibili.com`的路径是`bilibili.com/api`
   - `/api`被代理到`bilibili.com/`的路径是`bilibili.com`

2. 反向代理一组服务(平均负载)

   ```nginx
   upstream yourname {
   	server 192.168.0.1:80;
   	server 192.168.0.2:80;
   }
   
   server {
   	location / {
           proxy_pass yourname;
           # root   /bin2;
           # index  index.html index.htm;
       }
   }
   ```

3. 权重负载均衡(weight)

   按照配置weight的比例来分权

   ```nginx
   upstream httpds {
   	server 192.168.0.1:80 weight 8;
   	server 192.168.0.2:80 weight 2;
   }
   ```

4. `down`、`backup`

   `down`：ip已下线，不会代理到此服务器中

   `backup`：备用服务器，正常情况下不会代理到此服务器中，当其他服务器不能使用时，使用该服务器

   ```nginx
   upstream httpds {
   	server 192.168.0.1:80 weight 8 down;
   	server 192.168.0.2:80 weight 2 backup;
   }
   ```

5. `ip_hash`、`least_conn`、`url_hash`、`fair`

   以上基本不用，都有各式的问题，可以用其他方式解决

   `ip_hash`：通过计算客户端 IP 地址的哈希值，将每个客户端的请求固定分配到特定的后端服务器。虽然 `ip_hash` 有助于**保持会话的一致性**（即同一客户端的请求始终分配到同一台后端服务器），但也可能会带来一些不利影响，如负载不均衡、不支持`backup`等。不使用`ip_hash`可以使用cookie、token等方式解决
   
   ```nginx
   upstream yourname {
       ip_hash;      # 启用 ip_hash 负载均衡策略
   
   	server 192.168.0.1:80;
   	server 192.168.0.2:80;
   }
   
   server {
   	location / {
           proxy_pass yourname;
           # root   /bin2;
           # index  index.html index.htm;
       }
   }
   ```
   
   



## 动静分离

/css、/js、/img下的请求会在本机服务器获取。其他请求会被代理到192.168.0.1:80

```nginx
server {
	location / {
        proxy_pass 192.168.0.1:80;
        # root   /bin2;
        # index  index.html index.htm;
    }
    
    location /css {
        root   html;
        index  index.html index.htm;
    }
    
    location /js {
        root   html;
        index  index.html index.htm;
    }
    
    location /img {
        root   html;
        index  index.html index.htm;
    }
    
    # 也可以是使用正则
    # location ~*/(css|js|img) {
    #     root   html;
    #     index  index.html index.htm;
    # }
}
```



## 防盗链配置valid_referers

在 Nginx 中配置防盗链主要是通过检查 HTTP 请求的 `Referer` 头部来实现的。防盗链的目的是防止其他网站直接链接你的资源（如图片、视频等），从而保护你的带宽和资源

```nginx
server {
    listen 80;
    server_name example.com;

    location /images/ {  # 假设要保护的资源目录为 /images/
        # 允许特定的域名访问
        valid_referers none blocked example.com *.example.com;

        # 如果 Referer 不是有效的来源，则返回403错误
        if ($invalid_referer) {
            # return 403;
            rewrite ^/ /image/error.jpg break;     # 非法请求将图片用错误图片代替
        }
        
        # 其他处理配置
        root /var/www/html;  # 资源存放路径
    }
}
```

- **`location /images/`**：指定要保护的资源目录。你可以根据需要调整路径。

- **`valid_referers`**：

  - `none`：表示没有 Referer 头部。

  - `blocked`：表示 Referer 头部被屏蔽（即用户在浏览器中手动访问 URL，而不是通过链接）。

  - `example.com` 和 `*.example.com`：允许的来源域名，`*` 表示子域名。

- **`if ($invalid_referer)`**：检查请求的 Referer 是否有效。如果无效，返回 403 错误，或者自定义的其他页面。
- **`return 403;`**：如果 Referer 不符合要求，返回 403 Forbidden 错误，拒绝访问



# keepalived

`Keepalived` 是一个用于高可用性和负载均衡的工具，它主要通过虚拟路由冗余协议（VRRP）来实现主备节点的自动切换。在 `Keepalived` 的配置中，`interface` 指定了要绑定的网络接口，起到了关键的作用

[keepalived下载](https://keepalived.org/download.html# "keepalived")

linux命令下载，安装完成后在`/etc/keepalived/keepalived.conf`

```shell
yum install -y keepalived
```

```nginx
vrrp_instance VI_1 {
    state MASTER
    interface ens33  # 指定网络接口
    virtual_router_id 51
    priority 100     # 优先级
    advert_int 1
    authentication {   # 认证，同一组机器需要保持一致
        auth_type PASS
        auth_pass 1234
    }
    virtual_ipaddress { # 虚拟IP
        192.168.1.100   # 要绑定的虚拟 IP 地址
        192.168.1.101   # 要绑定的虚拟 IP 地址
    }
}
```

