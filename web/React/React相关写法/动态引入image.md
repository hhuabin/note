# 静态引入

```tsx
<img src="./assets/logo.png" alt="Logo" />
```

在`Vite`+`React`中，`logo.png`需要放在`public`中才能使用此方法

使用`css background`啦，注意`background`不能使用`@`作为根路径

# URL 引入

```typescript
const homeUrl = new URL('/images/home-selected.png', import.meta.url).href;
(homeRef.value as HTMLImageElement).src = homeUrl;
```



# import引入

静态引入（`Vite + React`使用）

```tsx
import logo from './assets/logo.png';

function App() {
	return <img src={logo} alt="Logo" />;
}
```

动态引入

```tsx
import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        import('./path/to/image.jpg')
        .then(img => {
        	setImage(img.default);
    	});
    }, []);

    if (!image) return <p>Loading...</p>;

    return <img src={image} alt="description" />;
}
```



# require 引入

仅限`Webpack`

```typescript
const image = require("@/images/sk-offiaccount.jpg")

<img src={image} alt="" />
```



# input

```tsx
<input onChange={event => this.saveFormData('username',event) } type="text" value={username}/>
```

