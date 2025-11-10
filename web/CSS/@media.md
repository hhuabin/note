# @media

## 常用屏幕宽度

1. **小屏幕 (手机)：**

   典型宽度范围：320px 到 767px

   ```css
   @media screen and (max-width: 767px) {
     /* 在宽度小于等于767px时应用的样式 */
   }
   ```

2. **中等屏幕 (平板)：**

   典型宽度范围：768px 到 1023px

   ```css
   @media screen and (min-width: 768px) and (max-width: 1023px) {
     /* 在宽度在768px到1023px之间时应用的样式 */
   }
   ```

3. **大屏幕 (桌面)：**

   典型宽度范围：1024px 及以上

   ```css
   @media screen and (min-width: 1024px) {
     /* 在宽度大于等于1024px时应用的样式 */
   }
   ```



## 基本语法

```css
@media media_type and (media_feature) {
  /* 在满足媒体查询条件时应用的样式 */
}
```

- `media_type`：指定媒体类型，例如 screen（屏幕）、print（打印机）等
- `media_feature`：指定媒体特性，例如 width（宽度）、height（高度）等



## 常见用法

1. **根据屏幕宽度应用样式：**

   ```css
   @media screen and (min-width: 768px) {
     /* 在宽度大于等于768px时应用的样式 */
   }
   ```

2. **根据屏幕宽度范围应用样式：**

   ```css
   @media screen and (min-width: 768px) and (max-width: 1024px) {
     /* 在宽度在768px到1024px之间时应用的样式 */
   }
   ```

3. **根据设备类型应用样式：**

   ```css
   @media print {
     /* 在打印时应用的样式 */
   }
   ```

4. **根据设备分辨率应用样式：**

   ```css
   @media screen and (min-resolution: 300dpi) {
     /* 在分辨率大于等于300dpi时应用的样式 */
   }
   ```

5. **根据屏幕方向应用样式：**

   ```css
   @media screen and (orientation: landscape) {
     /* 在横向屏幕方向时应用的样式 */
   }
   ```

6. **组合多个条件：**

   ```css
   @media screen and (min-width: 768px) and (orientation: landscape) {
     /* 在宽度大于等于768px且横向屏幕方向时应用的样式 */
   }
   ```



# 常用屏幕

- xm：<576px，超小屏幕
- sm：≥576px，小屏幕
- md：≥768px，中屏幕
- lg：≥992px，大屏幕
- xl：≥1200px，超大屏幕
- xxl：≥1600px，超超大屏幕
