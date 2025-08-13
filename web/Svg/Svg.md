# Svg

SVG（Scalable Vector Graphics）可缩放矢量图形

- `fill`：填充，`fill='currentColor'`继承父级`color`颜色 

- `stroke`：边颜色，`stroke='currentColor'`继承父级`color`颜色 

- `stroke-width`：边宽度

- `stroke-linecap`：笔画笔帽属性

  - `butt`：没有线帽
  - `round`：圆形线帽，线条会比没有线帽**长一点**
  - `square`：方形线帽，线条和圆形线帽一样长

- `stroke-linejoin`：连接处形状

  - `round`：连接处圆形

- `stroke-dasharray`：虚线序列

  ```xml
  <svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20 50 L80 50' fill='none' stroke='#f00' strokeWidth='4' />
      <path d='M20 50 L80 50' fill='none' stroke='#333' strokeWidth='4' strokeDasharray='20 5 5 5' />
      <!-- 20 5 5 5 -->
      <!-- 20实线 5实线 5实线 5实线 -->
      <!-- 往复循环，实线先开始，实虚交替 -->
  </svg>
  ```

间隔符问题：

在坐标中，正数可以使用空格` `或者`,`连接。而带有符号的数可以不使用空格` `或者逗号`,`连接，如`d='M-100-100'`，负号会被自动识别

- `M100 100`=`M100,100`=`M+100+100`等价



## rect 矩形

```xml
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <rect x='20' y='30' width='60' height='40' rx='10' ry='10' fill='none' stroke='#333' strokeWidth='4'></rect >
</svg>
```

- `width`：宽
- `height`：高
- `x`：距离 x 轴的距离
- `y`：距离 y 轴的距离
- `rx`：x 方向的圆角
- `ry`：：y 方向的圆角，`rx = ry`是圆形圆角，不相等为椭圆形圆角



## circle 圆形

```xml
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='50' cy='50' r='30' fill='none' stroke='#333' strokeWidth='4'></circle>
</svg>
```

- `cx`：定义圆心的 x 坐标
- `cy`：定义圆心的 y 坐标
- `r`：定义圆的半径



## ellipse 椭圆

```xml
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <ellipse cx='50' cy='50' rx='30' ry='20' fill='none' stroke='#333' strokeWidth='4'></ellipse>
</svg>
```

- `cx`：定义椭圆中心的 x 坐标
- `cy`：定义椭圆中心的 y 坐标
- `rx`：定义椭圆水平半径
- `ry`：定义椭圆垂直半径



## line 线条

```xml
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <line x1='20' y1='50' x2='80' y2='50' stroke='#333' strokeWidth='8' strokeLinecap='round' />
</svg>
```

- `x1`：直线开始 x 坐标
- `y1`：直线开始 y 坐标
- `x2`：直线结束 x 坐标
- `y2`：直线结束 y 坐标



## polyline 多线条折线

```xml
<!-- 楼梯 -->
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <polyline points='20,20 20,40 40,40 40,60 60,60 60,80 80,80' fill='none' stroke='#333' strokeWidth='4' strokeLinejoin='round' />
</svg>
```



## polygon 封闭多边形

```xml
<!-- 五角星 -->
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <polygon points='50,20 30,80 80,40 20,40 70,80' fill='none' stroke='#333' strokeWidth='4' strokeLinejoin='round' />
</svg>
```

- `points`：多个点，点与点直接用**空格**隔开，点坐标用**逗号**隔开



## text 文本



## path 路径

```xml
<!-- 斜线 -->
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <path d='M20 20 L80 80' fill='none' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
</svg>

<!-- 贝塞尔曲线 -->
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='50' cy='20' r='4' fill='#f00' />
    <circle cx='20' cy='80' r='4' fill='#f00' />
    <circle cx='80' cy='80' r='4' fill='#f00' />
    <path d='M20,80 Q50,20 80,80 ' fill='none' stroke='#333' strokeWidth='4' strokeLinecap='round' />
</svg>
```

### d

大写字母：相对于坐标原点的位置，即左上角

小写字母：相对于上一个绘制点的位置

- `M`：`move to`起点位置
- `L`：`line to`绘制直线
- `Q`：二次贝塞尔曲线
- `C`：`Curve to`三次贝塞尔曲线
- `Z`：关闭路径



## g 组

可以为一组标签定义相同的属性

```xml
<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <g r='4' fill='#f00'>
        <circle cx='50' cy='20' r='4' />
        <circle cx='20' cy='80' r='4' />
        <circle cx='80' cy='80' r='4' />
    </g>
    <path d='M20 80 Q50 20 80 80 ' fill='none' stroke='#333' strokeWidth='4' strokeLinecap='round' />
</svg>
```



## filter 高斯模糊与阴影效果

```xml
<defs>
    <filter id='filter1'></filter>
</defs>
```



## linearGradient 线性渐变

```xml
<defs>
    <linearGradient id='grad1'></linearGradient>
</defs>
```

- 比如背景渐变

  ```xml
  <svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
      <defs>
          <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='currentColor' stopOpacity='0' />
              <stop offset='100%' stopColor='currentColor' stopOpacity='1' />
          </linearGradient>
      </defs>
      <rect x='20' y='30' width='60' height='40' rx='10' ry='10' fill='url(#grad1)' stroke='currentColor' strokeWidth='4'></rect >
  </svg>
  ```

  

