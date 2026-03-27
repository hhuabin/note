# `svg`

`svg`在微信小程序中只能以`image`的形式引入，且`svg`不能使用`currentColor`

```wxml
<image src="../../static/images/qrcode-title-bg.svg" class="title-bg"></image>

image {
    display: block;
    width: 100%;
    height: 100%;
}
```

> 相对路径不行就换绝对路径
>
> PS：`uniapp`的热更新很烂，看不见`svg`就重启，实在不行就删`unpackage`文件夹
