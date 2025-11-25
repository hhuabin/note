# 创建连接

```typescript
const createWS = () => {
    let ws = new WebSocket("wss://example.com/ws");

    // 连接成功
    ws.onopen = () => {
        console.log("connected");
        ws.send("hello");
    };

    // 收到消息
    ws.onmessage = (event) => {
        console.log("server:", event.data);
    };

    // 错误
    ws.onerror = (error) => {
        console.error("error:", error);
    };

    // 连接关闭
    ws.onclose = () => {
        console.log("closed");
        setTimeout(createWs, 2000);    // 自动重连
    };
    
    return ws;
}
```

