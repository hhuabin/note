# transition

过渡：通过过渡可以指定一个属性发生变化时的切换方式

- **transition-duration**：过度持续时间，单位有 s 和 ms

   ```css
   transition-duration: 0.25s;
   ```

- **transition-property**：执行过度属性，可选值 `all` 等

   ```css
   transition-property: height, width;
   ```

- **transition-delay**：过渡效果的延迟

  ```css
  transition-delay: 2s;
  ```

- **transition-timing-function**：过渡的时序函数，贝塞尔曲线等 [cubic-bezier](https://cubic-bezier.com "cubic-bezier") 

  - ease：**默认值**，慢速开始，先加速，再减速

  - linear：匀速运动

  - ease-in：加速运动

  - ease-out：减速运动

  - ease-in-out：先加速 后减速

  -  cubic-bezier()：来指定时序函数

  - steps()：分步执行过渡效果 `steps(2, end)`，

    end：在时间结束时执行过渡(默认值)，当10s分两步走时，到第5s才执行第一步

    start：在时间开始时执行过渡

  ```css
  transition-timing-function: cubic-bezier(.24,.95,.82,-0.88);
  ```

总：`duration` 要在 `delay` 之前

```css
transition: 2s margin-left 1s cubic-bezier(.24,.95,.82,-0.88);
```



# animation

- animation-name：要对当前元素生效的关键帧的名字

- animation-duration：设置动画的执行时间

- animation-delay：设置动画的延迟

- animation-iteration-count：设置动画执行的次数，默认值1

  - **infinite**：无限执行

  ```css
  animation-iteration-count: 20;
  ```

- animation-direction：设定动画的运行方向

  - **normal**：默认值 从 from 到 to 每次都是这样
  - reverse：从 to 到 from 每次都是这样
  - alternate：从 from 向 to运行 重复执行动画时反向执行
  - alternate-reverse：从 to 向 from运行 重复执行动画时反向执行

  ```css
  animation-direction: normal;
  ```

- animation-play-state：设置动画的执行状态

  - running：默认值 动画执行
  - paused：动画暂停

  ```css
  animation-play-state: running;
  ```

- animation-fill-mode：设置动画的填充模式

  - **none**：默认值 动画执行完毕元素回到原来位置
  - forwards：动画执行完毕元素会停止在动画结束的位置
  - backwards：动画延时等待时，元素就会处于开始位置
  - both：结合了forwards 和 backwards

  ```css
  animation-fill-mode: none;
  ```

- 关键帧

  ```css
  @keyframes fade {
      /* from表示动画开始的位置 / 也可以使用0%*/
      from {
           transform: translateX(-50%);
      }
      /* to 动画结束的位置 / 也可以使用100%*/
      to {
          transform: translateX(0);
      }
  }
  ```

总：`duration` 要在 `delay` 之前

```css
animation: fade 2s 1s infinite;
```

！！！attention：在设置关键帧的时候不能将元素设置成`display: none;`，否则元素动画将不会执行



### 注意

1. `display` 不可作为动画，如`display: none;`

2. `css`无法实现从固定高度到auto的动画。故而`height: auto;`无法设置动画

   可以使用`grid-template-rows`解决

   `grid-template-rows: 10px 0fr;` -> `grid-template-rows: 10px 1fr;`

   ```css
   .box {
       display: grid;
       grid-template-rows: 10px 0fr;
       transition: all 150ms ease;
   }
   .hidden {
       overflow: hidden;
   }
   .open {
       grid-template-rows: 10px 1fr;
   }
   ```


# transform

变形就是指通过CSS来改变元素的形状或位置，变形不会影响到页面的布局

- translate：平移元素，百分比是**相对于自身**计算的

  - translateX()：沿着x轴方向平移
  - translateY()：沿着y轴方向平移
  - translateZ()：沿着z轴方向平移，z轴平移属于**立体效果**(近大远小)

  ```css
  transform: translateX(-50%) translateY(-50%);
  transform: translate3d(x,y,z);
  ```

- rotate：旋转

  - rotateX()：沿X轴旋转
  - rotateY()：沿Y轴旋转
  - rotateZ()：沿Z轴旋转

  ```css
  transform: rotateZ(180deg);
  ```

  ```css
  // 照片镜像
  transform: rotateY(180deg);
  backface-visibility: hidden; // 是否显示元素背面，默认显示
  ```

- scale：缩放

  - scaleX()：水平方向缩放
  - scaleY()：垂直方向缩放
  - scale()：双方向的缩放

  ```css
  transform: scale(1.2);
  ```


```css
/* 设置3d变形效果 */
transform-style: preserve-3d;
```





# 事件

## `onTransitionEnd`

`onTransitionEnd` 是一个与 CSS 动画相关的事件，用于监听元素完成 CSS `transition` 动画后的回调。它在过渡结束时触发，无论动画是否成功完成

1. **动画结束后触发逻辑**：
   - 隐藏或移除动画元素。
   - 在动画结束后执行后续操作。
2. **优化性能**：
   - 避免动画进行时触发不必要的操作。
   - 确保操作在动画完成后才进行。

```javascript
box.addEventListener('transitionend', (e) => {
    console.log('Transition complete:', e.propertyName);
    alert('Animation finished!');
});
```

1. **事件触发条件**：

   - 仅在 **`transition` 属性指定的动画**完成时触发。
   - 如果没有定义 `transition` 或动画时间为 `0s`，不会触发事件。

2. **多个动画属性**：

   - **当多个属性同时发生动画时，每个属性都会触发一次 `transitionend`**

     注意，这里多个动画属性，每个属性都会触发一次，比如 `boder` 属性会触发4次，因为 `border` 包含了 `border-top-left`、`border-top-right`、`border-bottom-left`、`border-bottom-right`

### 相关事件

- `animationend`：用于监听 CSS `@keyframes` 动画结束事件。
- `onAnimationEnd`：React 中对应的事件处理属性。























# \<transition/>

**vue独有，故不建议使用，建议使用 `animation` + `@keyframes`**

- v-enter-from：定义进入过渡的开始状态；
- v-enter-active：定义进入过渡生效状态，在这里可以定义进入过渡的时间、延迟、曲线函数等；
- v-enter-to：定义进入过渡结束状态；
- v-leave-from：定义离开过渡的开始状态；
- v-leave-active：定义离开过渡生效状态，在这里可以定义离开过渡的时间、延迟、曲线函数等；
- v-leave-to：定义离开过渡结束状态；