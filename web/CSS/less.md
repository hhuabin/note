# less 变量

```less
@aw: (100 / 750vw);
width: 750 * @aw;
```



# 混合

```less
.bordered {
  border: solid 1px black;
}

.post a {
    .bordered();
 	color: red;
}
```





# 嵌套

##  @规则嵌套和冒泡

```less
.component {
  	width: 300px;
  	@media (min-width: 768px) {
    	width: 600px;
    	@media  (min-resolution: 192dpi) {
      		background-image: url(/img/retina2x.png);
    	}
  	}
  	@media (min-width: 1280px) {
    	width: 800px;
  	}
}
```

编译为

```less
.component {
  	width: 300px;
}
@media (min-width: 768px) {
  	.component {
    	width: 600px;
  	}
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  	.component {
    	background-image: url(/img/retina2x.png);
  	}
}
@media (min-width: 1280px) {
	.component {
   	 	width: 800px;
  	}
}
```



# 运算

算术运算符 `+`、`-`、`*`、`/` 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```



# 转义

```less
@min768: ~"(min-width: 768px)";
.element {
  	@media @min768 {
    	font-size: 1.2rem;
  	}
}
```

编译为

```less
@media (min-width: 768px) {
  	.element {
    	font-size: 1.2rem;
  	}
}
```



# 函数



# 命名空间和访问符

```less
#bundle() {
  	.button {
        display: block;
        &:hover {
          	background-color: white;
        }
  	}
}

#header a {
    color: orange;
    #bundle.button();  // 还可以书写为 #bundle > .button 形式
}
```



# 映射

```less
#colors() {
  	primary: blue;
  	secondary: green;
}

.button {
  	color: #colors[primary];
  	border: 1px solid #colors[secondary];
}
```

编译为

```less
.button {
    color: blue;
    border: 1px solid green;
}
```



# 作用域

```less
@var: red;

#page {
 	 @var: white;
  	#header {
    	color: @var; // white
  	}
}
```



# 注释

```less
/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
```



# 导入

“导入”的工作方式和你预期的一样。你可以导入一个 `.less` 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 `.less` 扩展名，则可以将扩展名省略掉：

```less
@import "library"; // library.less
@import "typo.css";
```

