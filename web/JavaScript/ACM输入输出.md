# 单行输入

`line.split(' ').map(Number)`

```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const data = line.trim().split(' ').map(Number);
    console.log(data.reduce((a, b) => a + b, 0)); // 示例：计算和

    // 可以选择关闭，不关闭则会继续执行该函数
    rl.close();
});
```

监听关闭

```javascript
rl.on('close', () => {
    // 关闭执行
});
```



# 多行输入

`readline` + `lines` 数组

```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line.trim().split(' ').map(Number));

    // 控制输入行数，这里设置为1行
    if (lines.length >= 1) {
        console.log(lines);
        rl.close();
    }
});
```

