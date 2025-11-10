# 内联样式

```html
<div style="background-color: rgb(51, 51, 51);"></div>
```



# 背景

```css
background-color
background-image
background-repeat
background-position       // 用来设置背景图片的位置
background-size           // 设置背景图片的大小
background-origin         // 背景图片的偏移量计算的原点
background-clip           // 设置背景的范围
background-attachment     // 背景图片是否跟随元素移动

backgound 背景相关的简写属性，所有背景相关的样式都可以通过该样式来设置
并且该样式没有顺序要求，也没有哪个属性是必须写的

注意：
background-size必须写在background-position的后边，并且使用/隔开
background-position/background-size
默认值 /auto

background-origin background-clip 两个样式 ，orgin要在clip的前边
```

```css
background-image: url("");
background-size: contain;
background-size: 100px 10px;
background-repeat: no-repeat;

background: url("") center/contain no-repeat;
```

- `cover`：图片的比例不变，将元素铺满

- `contain`：图片比例不变，将图片在元素中完整显示（用这个）

- `linear-gradient()`

  to left、 to right、 to bottom、to top、turn 表示圈

  deg：0：to top，90：to right、180：to bottom、270：to left



# Image

```css
display: block;
```



# 三角形

```css
/* 20 * 10 正三角形 */
width: 0;
height: 0;
border-left: 20px solid transparent;
border-right: 20px solid transparent;
border-bottom: 20px solid red;
```



# Word

- 段落开头空两格 **text-indent: 2em;**

- 当文字是纯英文或者数字的时候注意使用`word-break: break-all;`

- 一行字显示

  ```css
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ```

- 三行字显示

  此时会有一个bug，如果容器的高度固定，例如是`height: 1000px`，如果第三行的字任然会显示。
  解决办法：1000px的容器里再加一个无固定高度的盒子
  
  ```css
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ```



# input

**placeholder**样式

```css
input::-webkit-input-placeholder { /* WebKit browsers */
    color: #9B9B9B;
    font-size: 15px;
}
```





# 点击元素样式

含有点击事件的元素建议增加：

```css
cursor: pointer;
user-select: none;
&:active {
    opacity: 0.7;
}
```



# css 选取第几个元素

```html
<ul>
    <li></li>
    <li></li>
</ul>
```

1. `first-child`

   表示选择列表中的第一个标签

   ```css
   li:first-child{background: #000}
   ```

2. `last-child`

   表示选择列表中的最后一个标签

3. `nth-child(1)`

   表示选择列表中的第1个标签

4. `nth-child(2n)`

   表示选择列表中的偶数标签，即选择 第2、第4、第6…… 标签。

5. `nth-child(2n-1)`

   表示选择列表中的奇数标签，即选择 第1、第3、第5、第7……标签。

6. `nth-child(n+3)`

   表示选择列表中的标签从第3个开始到最后。

7. `nth-child(-n+3)`

   表示选择列表中的标签从0到3，即小于3的标签。

8. `nth-last-child(3)`

   表示选择列表中的倒数第3个标签。

9. `li:nth-last-child(-n+2)`

   选择最后两个 `<li>` 元素




# 0.5px物理像素

1. translateY

   ```css
   transform: translateY(50%);
   overflow: hidden;
   ```

2. scale

   ```css
   transform: scaleY(0.5);
   overflow: hidden;
   ```

3. 使用vw(viewport)

   ```css
   border: 0.1vw solid #000;
   ```

4. background-image

   ```css
   background-image: linear-gradient(to bottom, #000 50%, transparent 50%);
   ```

   
