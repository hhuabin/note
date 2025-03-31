# JSON Web Token

JWT（JSON Web Token）是一种 **轻量级、自包含** 的安全令牌标准（RFC 7519），用于在各方之间安全地传输信息。它通常用于 **身份认证（Authentication）** 和 **授权（Authorization）**。



## JWT的核心组成

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ium7hOS6uiIsImlhdCI6MTUxNjIzOTAyMn0.5mhBHqs5_DTLdINd9p5m7ZJ6XD0Xc55kIaCRY5r6HRA
```

JWT由三部分组成，用点号(.)分隔：

1. **头部(Header)**

   - 包含令牌类型和签名算法

   ```json
   {
       "alg": "HS256",  // 签名算法
       "typ": "JWT"     // 令牌类型
   }
   ```

2. **载荷(Payload)**

   - 包含实际传递的数据（声明）

   ```json
   {
       "sub": "1234567890",  // 主题/用户ID
       "name": "张三",
       "admin": true,
       "exp": 1516239022     // 过期时间
   }
   ```

3. **签名(Signature)**

   - 对前两部分进行加密签名，确保数据不被篡改



## JWT 的工作流程

1. **用户登录**：客户端提交用户名/密码到服务器。
2. **服务器验证**：校验成功后，生成 JWT 并返回。
3. **客户端存储**：将 JWT 保存在 LocalStorage 或 Cookie 中。
4. **后续请求**：客户端在 `Authorization` 头中携带 JWT（如 `Bearer <token>`）。
5. **服务器验证**：解析 JWT，检查签名和有效期，授权访问。



## JWT vs. Session vs. OAuth

| 特性         | JWT                 | Session                | OAuth 2.0                     |
| :----------- | :------------------ | :--------------------- | :---------------------------- |
| **存储方式** | 客户端存储          | 服务器存储（Redis/DB） | 客户端 + 授权服务器存储       |
| **状态**     | 无状态（Stateless） | 有状态（Stateful）     | 混合模式                      |
| **适用场景** | API 认证、微服务    | 传统 Web 应用          | 第三方授权（如微信/谷歌登录） |
| **安全性**   | 依赖签名/加密       | 依赖 Session ID        | 依赖 Token + 加密流程         |



## JWT 的安全注意事项

- **不要存储敏感信息**：Payload 只是 Base64 编码，可被解码，避免存放密码、银行卡号等。
- **使用 HTTPS**：防止 Token 被拦截。
- **设置短有效期**：通过 `exp` 字段控制 Token 过期时间。
- **使用强签名算法**：推荐 HS256（对称加密）或 RS256（非对称加密）。
- **防范 CSRF/XSS**：如果存储在 LocalStorage，需防范 XSS；如果使用 Cookie，设置 `HttpOnly` 和 `SameSite`。