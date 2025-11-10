# CSSProperties



# 通过自定义CSS变量改变DOM的CSS

```tsx
<div
    className={style['picker-popup']}
    style={{ '--primary-color': primaryColor }}
>
```

这样子会报`CSSProperties`错误，因为`--primary-color`不在`CSSProperties`中

解决办法

类型断言为 `React.CSSProperties` 或者 `Record<string, string>`

```tsx
<div
    className={style['picker-popup']}
    style={{ '--primary-color': primaryColor } as React.CSSProperties}
>
```

```tsx
<div
    className={style['picker-popup']}
    style={{ '--primary-color': primaryColor } as Record<string, string>}
>
```

这样就能愉快的自定义样式啦

