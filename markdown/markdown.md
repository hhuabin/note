# markdown 语法

# 1. 标题

```
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```



# 2. 段落

要创建段落，请使用空白行将一行或多行文本进行分隔



# 3. 换行

在一行的末尾添加两个或多个空格，然后按回车键，即可创建一个换行(`<br>`)



# 4. 强调语法

## 粗体

要加粗文本，请在单词或短语的前后各添加两个星号（`**`）或下划线（`__`）

**粗体**    __粗体__



## 斜体

要用斜体显示文本，请在单词或短语前后添加一个星号(`*`)或下划线(`_`)

*斜体*    _斜体_



## 粗斜体

要同时用粗体和斜体突出显示文本，请在单词或短语的前后各添加三个星号(`***`)或下划线(`___`)

***粗斜体***    ___粗斜体___



## 删除线

要用删除线显示文本，请在单词或短语前后添加(`~~`)

~~删除线~~



## 文字颜色

1. 要使用此功能，首先，请在 `偏好设置` 面板 -> `Markdown扩展语法` 选项卡中启用它。然后用 `==` 来包裹高亮内容（Typora使用）

   ==高亮==

2. 可以使用html标签，`<span>`或者`<font>`

   `<span style="color: #F00">span标签红色</span>`：<span style="color: #F00">span标签红色</span>

   `<font color="#F00">font标签红色</font>`：<font color="#F00">font标签红色</font>

   



# 5. 引用语法

要创建块引用，请在段落前添加一个`>`符号

> 引用
>
> > 二级引用



# 6. 列表语法

## 有序列表

1. 有序列表

2. 有序列表

## 无序列表

要创建无序列表，请在每个列表项前面添加破折号 (`-`)、星号 (`*`) 或加号 (`+`) 。缩进一个或多个列表项可创建嵌套列表

- 无序列表

- 无序列表
* 无序列表

* 无序列表
+ 无序列表

+ 无序列表
- 无序列表
  - 无序列表



# 7. 代码语法

要将单词或短语表示为代码，请将其包裹在反引号  (`` ` ``)中

`代码块`

如果你要表示为代码的单词或短语中包含一个或多个反引号，则可以通过将单词或短语包裹在双反引号(`` ` ` ``)中

代码段：代码块之前和之后的行上使用三个反引号(` ``` `)或三个波浪号(` ~~~ `)

```java
int a = 0;
```



# 8. 分隔线语法

要创建分隔线，请在单独一行上使用三个或多个星号 (`***`)、破折号 (`---`) 或下划线 (`___`) ，并且不能包含其他内容

***

---

___



# 9. 链接语法

`<https://github.com/hhuabin>`

`[github](https://github.com/hhuabin "github")`

链接文本放在中括号内，链接地址放在后面的括号中，链接title可选

<https://github.com/hhuabin>

[github](https://github.com/hhuabin "github")



# 10. 图片语法

！！！不建议使用图片，删除本地图片即不可见

`![]()`

插入图片Markdown语法代码：`![图片alt](图片链接 "图片title")`。

对应的HTML代码：`<img src="图片链接" alt="图片alt" title="图片title">`

```
![这是图片](/assets/img/philly-magic-garden.jpg "Magic Gardens")
```

<img title="avatat" src="./Image/avatar.jpg" alt="" width="245">

```
链接图片
[![沙漠中的岩石图片](/assets/img/shiprock.jpg "Shiprock")](https://markdown.com.cn)
```

[<img title="avatar" src="./Image/avatar.jpg" alt="" width="252">](https://github.com/hhuabin)



# 11. 字符语法

- 转义字符：要显示原本用于格式化 Markdown 文档的字符，请在字符前面添加反斜杠字符`\`

- 特殊字符：
  - 使用HTML实体代码`&pi;`(&pi;)
  - 使用Unicode字符`&#960;`(&#960;)



# 12. 内嵌HTML语法

直接加标签写即可，如`<div></div>`

<div>
    <p>
        <a href="https://github.com/hhuabin">github</a>
    <p/>
    <p>
        <h1>这是HTML内容</h1>
    </p>
</div>




# 13. 表格

1. 请使用三个或多个连字符（`---`）创建每列的标题，并使用管道（`|`）分隔每列。您可以选择在表的任一端添加管道`|--|--|`

   特性：**可以做居中**，可读性好，但是不能合并单元格

2. 使用 html 的 table，`colspan`多列，`rowspan`多行

   特性：**可以合并单元格**。居中只能使用CSS做，可读性差

```
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

<table>
    <tr style="text-align:center;">
        <td>行一：列一</td> 
        <td colspan="2">行一：列二三</td> 
    </tr>
    <!-- tr内为每一行的内容 -->
    <tr>
        <!-- 定义一个占两行的单元格 -->
        <td rowspan="2">占两行（行二，三）：列一</td>    
        <td >行二：列二</td> 
        <td >行二：列三</td> 
    </tr>
    <tr>
        <!-- 由于上面第一列占了两行，所以该行不用写 -->
        <td >行三：列二，行三：列二</td>  
        <td >行三：列三，行三：列三</td>  
    </tr>
    <tr>
        <!-- 两行已经用完，所以在下一行开始需要写第一列 -->
        <td >行四：列一</td> 
        <td >行四：列二</td>  
        <td >行四：列三</td>  
    </tr>
</table>



# 14. 任务列表语法

```
- [x] 任务一
- [ ] 任务二
```

- [x] 任务一
- [ ] 任务二



# 15. 标题编号custom-id {#custom-id}

**标题编号仅限英文**

也可以使用 html 定义标题

`<h1 id="custom-id">custom-id</h1>`

<h1 id="custom-id2">custom-id2</h1>

[custom-id](#custom-id)

[custom-id2](#custom-id2)



# 16. 数学公式

markdown使用LaTeX语法来编写数学公式。下面是一些常用的数学公式语法示例：

1. 行内公式：使用单个美元符号 `$` 包裹公式内容。例如：`$E=mc^{2}$`。（记得打开文件->偏好设置->Markdown的内联公式等）

   $E=mc^2$  (只有一个数的时候`{}`可以省略)

2. 块级公式：使用双美元符号 `$$` 包裹公式内容。例如：

   ```latex
   $$
   \sum_{i=1}^{n} i = \frac{n(n+1)}{2}
   $$
   ```

   $$
   \sum_{i=1}^{n} i = \frac{n(n+1)}{2}
   $$

3. 上标和下标：使用 `_` 表示下标，使用 `^` 表示上标。例如：`$x_i^{2}$`。

4. 分数：使用 `\frac{numerator}{denominator}` 表示分数。例如：`$\frac{1}{2}$`。

5. 根号：使用 `\sqrt{expression}` 表示根号。例如：`$\sqrt{2}$`。

6. 求和、积分等符号：使用 `\sum`、`\int` 等符号表示相应的数学操作。例如：`$\sum_{i=1}^{n} i$`。

7. 求积： `$\prod$`

8. 极限：`$\mathrm{d}x$`

9. 微分：`$\lim_{i=0}$`



# 17. Emoji表情

语法：` :**: `

建议第一个冒号前、第二个冒号后都加上空格，保证在`github`上显示正常

> :zero:、:one:、:two:、:ok:、:information_source:
>
> :no_entry_sign:、:white_check_mark:、:negative_squared_cross_mark:、:clock3:、:x:、:heavy_check_mark:、:exclamation:、:warning:、:triangular_flag_on_post:、:bulb:、:bell:、:star:、
>
> :bangbang:、:red_circle:、:small_red_triangle:、:alarm_clock:、:question:
>
> :lock:、 :accept:、:pencil: 、:pencil2:、:hearts:、:closed_book:、:file_folder:、:dog:、:thumbsup:、:pray:、:fire:、:neutral_face:、:expressionless:、:sob:
>
>  :point_right: 、 :point_left: 、 :point_down: 、 :point_up: 、 :point_up_2: 、 :fu: 、 :+1: 、 :-1: 

[表情符号简码列表](https://gist.github.com/rxaviers/7360908)

> :bulb: Tip：表情符号简码因应用程序而异



# 18. 流程图

## mermaid 基本流程图绘制

````
```mermaid
graph 方向
内容 ……
```
````

**方向**：

- 从上到下：TB （有时候也写作 TD）
- 从下到上：BT
- 从左到右：LR
- 从右到左：RL

**内容：**

- 基本节点图形
- 连接线
- 连接线上的注释

1. 基本节点

   基本节点图像由两部分组成，一个唯一的id，用于标记节点的身份；节点内的注释内容。基本图像如图所示

   ```mermaid
   graph TB
   	A[矩形]
       B(圆角矩形)
       C>不对称矩形]
       D{菱形}
       id((圆形))
   ```

2. 连接线

   `-` `.` `=` 可适当增加延长长度

   - A --> B：      A带箭头指向B
   - A --- B：       A不带箭头指向B
   - A -.- B：       A用虚线指向B
   - A -.-> B：     A用带箭头的虚线指向B
   - A ==> B：    A用加粗的箭头指向B

   ```mermaid
   graph TD
       A[A] ---> B[B]
       A1[A1] --- B1[B1]
       A4[A4] -..- B4[B4]
       A5[A5] -.-> B5[B5]
       A7[A7] ===> B7[B7]
   ```


3. 连接线上的注释

   可以在中间加描述

   - A--描述--- B ：A不带箭头指向B并在中间加上文字描述
   - A --描述--> B： A带箭头指向B并在中间加上文字描述
   - A -.描述.-> B ：A用带箭头的虚线指向B并在中间加上文字描述
   - A \==描述==> B ：A用加粗的箭头指向B并在中间加上文字描述

   或者在后面加用 `|` 引起来

   - A[A] ---|描述| B[B]

   ```mermaid
   graph TB
       A[A]--描述---B[B]
       A2[A]--描述-->B2[B]
       A3[A]-.描述.->B3[B]
       A4[A]==描述==>B4[B]
       A5[A]-.描述.- B5[B]
   
   	A6[A6] ---|描述| B6[B6]
   	A7[A7] -->|描述| B7[B7]
   	A8[A8] -.->|描述| B8[B8]
   	A9[A9] ==>|描述| B9[B9]
   	A7[A7] -.-|描述| B7[B7]
   ```




## flow标准流程图源码格式：

(right)：横向

```flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
cond2=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框

st(right)->op->cond
cond(yes)->cond2(no, bottom)->io->e
cond(no)->sub1(right)->op
```

## sequence UML时序图源码样例：

```sequence
对象A->对象B: 对象B你好吗?（请求）
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象A->对象B: 你真的好吗？
```



















