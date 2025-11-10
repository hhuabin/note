# 图片懒加载

1. **HTML 结构：** 在 HTML 结构中，将需要懒加载的图片的 `src` 属性设置为一个占位符，例如一个小的透明图片或者一个空字符串。

   ```html
   <img class="lazy-load" src="placeholder.png" data-src="image-to-lazy-load.jpg" alt="Lazy Loaded Image">
   ```

2. **CSS 样式（可选）：** 可以为懒加载的图片设置一些样式，使其在加载前不显示，以及在加载时添加过渡效果

   ```css
   .lazy-load {
       opacity: 0;
       transition: opacity 0.3s ease-in-out;
   }
   .lazy-load.loaded {
   	opacity: 1;
   }
   ```

3. **JavaScript：** 使用 JavaScript 监听滚动事件，并在图片进入可视区域时加载图片。

   ```javascript
   // 获取所有需要懒加载的图片
   const lazyImages = document.querySelectorAll('.lazy-load');
   
   // 监听滚动事件
   window.addEventListener('scroll', lazyLoad);
   
   // 执行懒加载
   function lazyLoad() {
     lazyImages.forEach(image => {
       // 获取图片相对于视口的位置
       const rect = image.getBoundingClientRect();
   
       // 如果图片在视口中可见（顶部在视口底部上方），则加载图片
       if (rect.top < window.innerHeight && rect.bottom >= 0) {
         // 将图片的data-src属性赋值给src属性，实现图片加载
         image.src = image.dataset.src;
         // 添加一个类，用于添加加载效果（可选）
         image.classList.add('loaded');
       }
     });
   
     // 移除滚动事件监听器，以避免频繁触发
     window.removeEventListener('scroll', lazyLoad);
   }
   
   // 页面加载时执行一次懒加载，确保可见区域内的图片被加载
   lazyLoad();
   ```

在上述代码中，我们通过监听滚动事件，在图片进入可视区域时将 `data-src` 属性的值赋值给 `src` 属性，从而实现了图片的懒加载。同时可以添加一些过渡效果，使图片在加载时有动画效果



# React中实现

封装一个懒加载组件\<LazyImage/>即可，antd也有自带的

```tsx
import { useEffect, useState, useRef } from 'react';

type Props = {
	src: string;
	defaultSrc?: string;
	alt?: string
}

function LazyImage({ src, defaultSrc, alt }: Props) {

	const imgRef = useRef<HTMLImageElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(imgRef.current as HTMLElement);
				}
			});
		});
		observer.observe(imgRef.current as HTMLElement);

		return () => {
			imgRef.current && observer.unobserve(imgRef.current)
		};
	}, [])

	return (
		<>
			<img
				ref={imgRef}
				src={isVisible ? src : (defaultSrc || "")} alt={alt || ""}
				className="block w-full h-full"
			/>
		</>
	);
}

export default LazyImage;

// 使用
<LazyImage src={""}></LazyImage>

```

