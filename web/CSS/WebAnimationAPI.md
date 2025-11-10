# animate(keyframes, options)

```typescript
keyframes: Keyframe[] | PropertyIndexedKeyframes | null
options: number | KeyframeAnimationOptions
```

- `keyframes`：关键帧对象数组，**或**一个关键帧对象（其属性为可迭代值的数组）

  ```typescript
  const keyframes: Keyframe[] = [
      { opacity: 1, easing: "ease-out" },
      { opacity: 0.1, easing: "ease-in" },
      { opacity: 0 },
  ],
  ```

  ---

  ```typescript
  interface Keyframe {
      composite?: CompositeOperationOrAuto;
      easing?: string;
      offset?: number | null;
      [property: string]: string | number | null | undefined;
  }
  ```

  `offset`：对每个关键帧的偏移可以通过提供一个`offset`来指定，设置每一帧所占时间的比例。 `offset` 的值必须是在 **[0.0, 1.0]** 这个区间内，且须升序排列（动画的百分之几，不写就按照`0-1`均匀分配）

  ```javascript
  [
      { opacity: 1, offset: 0 },
      { opacity: 0, offset: 1 }
  ]
  ```

- `options`：**代表动画持续时间的整数**（以毫秒为单位），或者一个包含一个或多个时间属性

  ```typescript
  const options: KeyframeAnimationOptions = {
      duration: 2000,               // 动画的执行时间
      direction: "alternate",       // 动画的运行方向
      iterations: "normal",         // 动画执行的次数
      fill: 'forwards',             // 动画的填充模式
      easing: 'cubic-bezier(.23,1,.68,1)', // 
  }
  ```
  
  ```typescript
  interface EffectTiming {
      delay?: number;
      direction?: PlaybackDirection;
      duration?: number | CSSNumericValue | string;
      easing?: string;
      endDelay?: number;
      fill?: FillMode;
      iterationStart?: number;
      iterations?: number;
      playbackRate?: number;
  }
  ```
  
  **`options` 的属性**
  
  | **属性名**               | **类型** | **默认值**  | **描述**                                                     |
  | ------------------------ | -------- | ----------- | ------------------------------------------------------------ |
  | **`delay`**              | `number` | `0`         | 动画开始前的延迟时间（毫秒）。                               |
  | **`direction`**          | `string` | `"normal"`  | 动画的方向。可选值：`"normal"`、`"reverse"`、`"alternate"`、`"alternate-reverse"`。 |
  | **`duration`**           | `number` | `0`         | 动画的持续时间（毫秒）。                                     |
  | **`easing`**             | `string` | `"linear"`  | 动画的缓动函数（类似 CSS 的 `transition-timing-function`）。 |
  | **`endDelay`**           | `number` | `0`         | 动画结束后的延迟时间（毫秒）。                               |
  | **`fill`**               | `string` | `"none"`    | 动画填充模式，决定动画开始前和结束后的表现。可选值：`"none"`、`"forwards"`、`"backwards"`、`"both"`。 |
  | **`iterations`**         | `number` | `1`         | 动画的循环次数（小数值表示部分循环）。                       |
  | **`iterationStart`**     | `number` | `0`         | 动画从第几次循环的部分开始（0 表示从第一帧开始）。           |
  | **`composite`**          | `string` | `"replace"` | 决定如何合成多个动画的效果。可选值：`"replace"`、`"add"`、`"accumulate"`。 |
  | **`iterationComposite`** | `string` | `"replace"` | 循环内动画如何合成。可选值：`"replace"`、`"accumulate"`。    |



## 相关函数

```javascript
const animation = element.animate(keyframes, options)

animation.pause(); // 暂停动画
animation.play();  // 继续动画
animation.reverse(); // 反转动画
// 动画结束时候触发
animation?.finished.then(() => {
}, () => {})
```

---

示例：

```typescript
const wrapperElementRef = useRef<HTMLUListElement | null>(null)

const updateAnimate = (transformY: number | string, transitionDuration = 0) => {
    const { transform } = window.getComputedStyle(wrapperElementRef.current as HTMLUListElement)
    const currentTransformY = transform.slice(7, transform.length - 1).split(", ")[5] || '0'
    const keyframes: Keyframe[] = [
        {
            transform: `translateY(${currentTransformY}px)`,
        },
        {
            transform: `translateY(${transformY}px)`,
        },
    ]
    const options: KeyframeAnimationOptions = {
        duration: transitionDuration,
        fill: 'forwards',
        easing: 'cubic-bezier(.23,1,.68,1)',
    }
    // 取消之前的动画
    wrapperElementRef.current?.getAnimations().forEach(animation => animation.cancel())
    // 执行动画
    wrapperElementRef.current?.animate(keyframes, options)
}
```



