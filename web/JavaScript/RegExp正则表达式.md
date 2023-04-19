# 构造方法

- new(pattern: RegExp | string): RegExp;
- new(pattern: string, flags?: string): RegExp;

以下三个表达式创建相同的正则表达式：

```javascript
/ab+c/i
new RegExp(/ab+c/, 'i') // 字面量
new RegExp('ab+c', 'i') // 构造函数
```

flags

- g            全局匹配
- i             忽略大小写
- m          多行匹配
- s            点号匹配所有字符
- u            unicode
- y            sticky，粘性匹配



# 常用元字符

- ^          匹配字符串的开始位置，当 ^ 用在方括号以内，表示除…之外。` \^a[^ab\]\`
- $          匹配字符串的结尾位置
- \b        匹配单词边界
- \B        匹配非单词边界
- .           任意字符
- \d         digit 数字：[0-9]
- \D         非数字
- \s          任意空格类字符： [\t\n\x0B\f\r]
- \S          非空格类字符
- \w         word 任一标识符字符：[a-zA-Z_0-9]
- \W        非标识符字符
- g           全局匹配
- i            忽略大小写



# 常用方括号表达式

- [xyz]                       x、y、z 中任一字符
- [^xyz]                     除 x、y、z 外任一字符
- [a-d]                       a~d 任一字符
- [a-zA-Z]                 a~z 或 A~Z 任一字符
- [a-d[m-q]]            a~d 或 m~q 任一字符，等价于 [a-dm-q]
- [a-z&&[def]]        a~z 并 def 任一字符，等价于 [def]
- [a-f&&[ ^de]]       a~f 并 de 外任一字符，等价于[abcf]



# 常用限定字符

- X?                    ?前的X最多出现一次，等价于{0，1}
- X*                   *前的出现0次或多次，等价于{0，}
- (X+)                 +前的出现1次或多次，等价于{1，}
- X{n}                X刚好出现 n 次
- X{n,}               X至少出现 n 次
- X{n,m}           X出现 n~m 次
- (X|Y)               X或Y



# 属性

**lastIndex**、**source** 常用，剩下的不记

- dotAll                         dotAll 属性表明是否在正则表达式中一起使用"s"修饰符

- **flags**                           flags属性返回一个字符串，由当前正则表达式对象的标志组成。

- global                         global 属性表明正则表达式是否使用了 "g" 标志。

- hasIndices                 hasIndices 访问器属性指示 d 标志是否与正则表达式一起使用。

- ignoreCase                ignoreCase 属性表明正则表达式是否使用了 "i" 标志。 

- **lastIndex**                  lastIndex 是正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引。

  ```javascript
  const reg = new RegExp(/[abc]/, 'g')
  console.log(reg.lastIndex);  // 1
  
  const reg = new RegExp(/[abc]/, 'i')
  console.log(reg.lastIndex);  // 0
  ```

- multiline                    multiline 属性表明正则表达式是否使用了 "m" 标志
- **source**                       source 属性返回一个值为当前正则表达式对象的模式文本的字符串
- sticky                         sticky 属性反映了搜索是否具有粘性（仅从正则表达式的 lastIndex 属性表示的索引处搜索）
- unicode                     unicode 属性表明正则表达式带有"u" 标志。

```javascript
const reg = new RegExp(/[abc]/, 'g')

console.log(reg.exec("ae")); 
console.log(reg.dotAll);     // false
console.log(reg.flags);      // g
console.log(reg.source);     // [abc]
console.log(reg.lastIndex);  // 1,lastIndex在启用 g 时候才会生效
```





# 方法

## RegExp.prototype.exec()

exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果**数组**或 null。

```javascript
const regex1 = RegExp('foo*', 'g');
const str1 = 'table football, foosball';
let array1;

while ((array1 = regex1.exec(str1)) !== null) {
  console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
  // Expected output: "Found foo. Next starts at 9."
  // Expected output: "Found foo. Next starts at 19."
}
```



## RegExp.prototype.test()

test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。

```javascript
const str = 'table football';

const regex = new RegExp('foo*');
const globalRegex = new RegExp('foo*', 'g');

console.log(regex.test(str));
// Expected output: true

console.log(globalRegex.lastIndex);
// Expected output: 0

console.log(globalRegex.test(str));
// Expected output: true

console.log(globalRegex.lastIndex);
// Expected output: 9

console.log(globalRegex.test(str));
// Expected output: false
```



## RegExp.prototype.toString()

toString() 返回一个表示该正则表达式的字符串。

```javascript
const reg = new RegExp(/[abc]/, 'g')
console.log(reg.toString());  // /[abc]/g
```

