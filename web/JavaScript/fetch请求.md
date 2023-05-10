# fetch 关注分离的设计思想

1. 联系服务器
2. 将信息封装在 response.json() 中

发送 fetch 请求

```javascript
fetch('/api1/users/search')
.then(response => {
    console.log('联系服务器成功了');
    return response.json()
},error => {
    console.log('联系服务器失败了',error);
    return new Promise(()=>{})
})
.then(response => {
    console.log('获取数据成功了',response);
},error => {
    console.log('获取数据失败了',error);
})
```

部分优化：

```javascript
fetch('/api1/users/search')
.then(response => {
    console.log('联系服务器成功了');
    return response.json()
})
.then(response => {
    console.log('获取数据成功了',response);
})
.catch(error => {
    console.error(error);
})
```

请求优化：

```javascript
try {
    const response= await fetch('/api1/users/search')
    const data = await response.json()
    console.log(data);
} catch (error) {
    console.log('请求出错',error);
}
```

