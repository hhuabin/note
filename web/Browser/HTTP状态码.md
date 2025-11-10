# HTTP请求头

1. **Referer**：当前页面的上一个页面的路【当前页面通过哪个页面跳转过来的】，可以通过此路径跳转回上一个页面， 广告计费，防止盗链



# HTTP状态码

模拟错误

```typescript
https://httpstat.us/502     // 请求该地址即可看到对应错误码的请求返回
```

1. **1xx（Informational）**：服务器接收到请求，需要请求者继续操作。
   - **100 Continue**：服务器已经接收到请求的头部，并且客户端应该继续发送请求体（通常在POST请求中使用）。
2. **2xx（Success）**：请求被成功接收、理解和接受。
   - **200 OK**：请求成功，服务器已经处理请求。
   - **201 Created**：请求被成功处理，并且服务器创建了新的资源。
   - **204 No Content**：服务器成功处理请求，但没有返回任何内容。
3. **3xx（Redirection）**：需要客户端进行附加操作才能完成请求。
   - **301 Moved Permanently**：请求的资源已永久移动到新位置，将来的请求应该使用新的URL。
   - **302 Found (Moved Temporarily)**：请求的资源暂时移动到新的位置。新的URL应该在响应中给出。
   - **304 Not Modified**：客户端发送了一个条件请求（如：If-Modified-Since），服务器告诉客户端资源没有被修改，可以使用缓存的版本。
4. **4xx（Client Error）**：请求包含错误或无法完成。
   - **400 Bad Request**：服务器无法理解客户端的请求，通常因为语法错误。
   - **401 Unauthorized**：请求需要用户认证。
   - **403 Forbidden**：服务器拒绝请求，通常因为缺乏权限。
   - **404 Not Found**：请求的资源在服务器上未找到。
5. **5xx（Server Error）**：服务器在处理请求的过程中发生了错误。
   - **500 Internal Server Error**：服务器遇到了一个未知错误。
   - **502 Bad Gateway**：服务器作为网关或代理，从上游服务器收到无效响应。
   - **503 Service Unavailable**：服务器暂时不可用，通常是因为过载或维护。
   - **504 Gateway Timeout**：网关超时。