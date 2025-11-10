# 访问 `/` 得到前端项目

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root /opt/projectname;       # 项目在linux中的位置(/opt/projectname/index.html)
        try_files $uri $uri/ /index.html;
        index index.html;
    }
}
```

## 对于多个项目

不同的项目可以运行在不同的端口号中，如此，一个域名下即可运行多个项目

```nginx
server {
    listen       443;
    server_name  hhuabin;

    location / {
        root /opt/projectname;       # 项目在linux中的位置(/opt/projectname/index.html)
        try_files $uri $uri/ /index.html;
		index index.html;
    }
}
```





# 访问 `/projectname` 得到前端项目

1. 直接重定向至项目的端口号

   ```nginx
   server {
       listen       80;
       server_name  localhost;
   
       location / {
           return 301 http://192.168.198.128:443/;
       }
   }
   ```

2. 对于多个项目部署在同一个端口号上的情况（例如默认的80端口）

   nginx的配置

   ```nginx
   server {
       listen       80;
       server_name  localhost;
   
       location /projectname {
           root /opt;       # 项目在linux中的位置(/opt/projectname/index.html)
           try_files $uri $uri/ /index.html;
   		index index.html;
       }
   }
   ```

   此时前端同样需要做出一定的调整（此处示例为vue3 + vite）

   1. `vite.config.ts`

      ```ts
      export default defineConfig({
          base: "/projectname/",     // 此处的 projectname 需要和上面保持一致
          build: {
              outDir: 'dist/projectname',   // 此处可以不配置，但是为了方便本地运行，建议加上
          }
      })
      ```

   2. `router.js`

      ```ts
      const router = createRouter({
          history: createWebHistory(import.meta.env.BASE_URL),  // import.meta.env.BASE_URL = /projectname/
      })
      ```

      
