# reduce

将其结果汇总为单个返回值

reduce方法可做的事情特别多，就是循环遍历能做的，reduce都可以做，比如数组求和、数组求积、数组中元素出现的次数、数组去重等等

```javascript
arr.reduce(function(preview,current,index,arr){
	...
}, init);
```

- prev 必需。累计器累计回调的返回值; 表示上一次调用回调时的返回值，或者初始值 init;
- current 必需。表示当前正在处理的数组元素；
- index 可选。表示当前正在处理的数组元素的索引，若提供 init 值，则起始索引为- 0，否则起始索引为1；
- arr 可选。表示原数组；
- init 可选。表示初始值。