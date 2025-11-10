[Tailwind](https://www.tailwindcss.cn/docs/installation/using-postcss "Tailwind")

# install

1. 安装`tailwindcss`，`postcss`

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   yarn add tailwindcss postcss autoprefixer -D
    
   npx tailwindcss init           // 在根目录生成 tailwind.config.js 文件   // 最保险的方法
   npx tailwindcss init --esm     // 在根目录生成 tailwind.config.js 文件 ESM风格
   npx tailwindcss init --ts      // 在根目录生成 tailwind.config.ts 文件   // tailwind有可能失效
   
   npx tailwindcss init -p        // 生成 tailwind.config.js 和 postcss.config.js 配置文件
   ```

2. `tailwind.config.js`

   **推荐使用**

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
   	content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
   	theme: {
   		extend: {},
   	},
   	plugins: [],
   }
   ```

   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
   	content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
   	theme: {
   		extend: {},
   	},
   	plugins: [],
   }
   ```

   **tailwind有失效的风险**

   ```typescript
   import type { Config } from 'tailwindcss'
   
   export default {
       content: ['./src/pages/**/*.{vue,js,ts,jsx,tsx}'],
       theme: {
           extend: {},
       },
       plugins: [],
   } satisfies Config
   ```

3. 配置`postcss.config.js`

   ```javascript
   module.exports = {
       plugins: {
           tailwindcss: {},
           autoprefixer: {},
       }
   }
   ```

4. 入口文件加入tailwindcss

   ```css
   /* tailwind.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

   或者：

   ```css
   @import 'tailwindcss/base';
   @import 'tailwindcss/components';
   @import 'tailwindcss/utilities';
   ```

   ```tsx
   /* main.tsx */
   import ReactDOM from 'react-dom/client'
   
   import './styles/tailwind.css'
   ```



# tailwind.config.js

==tail不能使用css表达式(如clac())，如需使用，请自写样式==

## content

可以配置任何包含Tailwind类名的**文件的路径**

```typescript
import type { Config } from 'tailwindcss'

export default {
	content: [
		'./pages/**/*.{html,js}',
    	'./components/**/*.{html,js}',
	],
} satisfies Config
```



## theme

配置 color palette, fonts, type scale, border sizes, breakpoints 或者任何与网站设计相关的东西

```typescript
import type { Config } from 'tailwindcss'

export default {
    content: ['./src/pages/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            'color-primary': '#333',
            'blue': '#1fb6ff',
        },
        borderRadius: {
            'none': '0',
            'sm': '.125rem',
            DEFAULT: '.25rem',
            'lg': '.5rem',
            'full': '9999px',
        }
        extend: {
            spacing: {
                '8xl': '96rem',
                '9xl': '128rem',
            },
        }
    },
    plugins: [],
} satisfies Config
```

```html
<div className="bg-color-primary">
```



1. 在theme中，键决定生成类的后缀，值决定生成类的值，如上面的 borderRadius 生成

   DEFAULT：默认，无后缀

   ```css
   .rounded-none { border-radius: 0 }
   .rounded-sm   { border-radius: .125rem }
   .rounded      { border-radius: .25rem }
   .rounded-lg   { border-radius: .5rem }
   .rounded-full { border-radius: 9999px }
   ```



### theme.extend

保留主题选项的默认值，同时添加新值，此键下的值将与现有主题值合并，并自动变为可以使用的新类

==与此相对，`extend`之外的`theme`将会覆盖默认的`theme`==

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            screens: {
                '3xl': '1600px', // Adds a new `3xl:` screen variant
            },
            fontFamily: {
                display: 'Oswald, ui-serif', // Adds a new `font-display` class
            }
        }
    }
}
```

```jsx
<blockquote class="text-base md:text-md 3xl:text-lg">
	Oh I gotta get on that internet, I'm late on everything!
</blockquote>
```



### screens

```javascript
module.exports = {
    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        }
    }
}
```



1. 增加比640更小的屏幕时不能用`extend`

   ```javascript
   const defaultTheme = require('tailwindcss/defaultTheme')
   
   module.exports = {
       theme: {
           screens: {
               'xs': '475px',
               ...defaultTheme.screens,
           },
       },
       plugins: [],
   }
   ```

2. 增加比1536px更大的尺寸时可以使用extend

3. 可以自定义覆盖尺寸

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
       theme: {
           screens: {
               'tablet': '640px',
               // => @media (min-width: 640px) { ... }
   
               'laptop': '1024px',
               // => @media (min-width: 1024px) { ... }
   
               'desktop': '1280px',
               // => @media (min-width: 1280px) { ... }
           },
       }
   }
   ```



### spacing

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
			spacing: {
				unit1: '0.0625rem',   // 1px
                unit3: '0.1875rem',   // 3px
                unit5: '0.3125rem',
                unit7: '0.4375rem',
                unit9: '0.5625rem',
                unit11: '0.6875rem',
                unit13: '0.8125rem',
                unit15: '0.9375rem',
                unit18: '1.125rem',
                unit22: '1.375rem',
                unit26: '1.625rem',
                unit30: '1.875rem',
			}
		},
    }
}
```

```html
<div className="bg-white w-unit30"></div>
    
<div className="bg-white w-[1.875rem]"></div>
```

默认的`spacing`（都是双数倍的），所以我们非常有必要扩展一下`spacing`

`padding`, `margin`, `width`, `minWidth`, `maxWidth`, `height`, `minHeight`, `maxHeight`, `gap`, `inset`, `space`, `translate`, `scrollMargin`, and `scrollPadding`

| Name | Size     | Pixels |
| ---- | -------- | ------ |
| 0    | 0px      | 0px    |
| px   | 1px      | 1px    |
| 0.5  | 0.125rem | 2px    |
| 1    | 0.25rem  | 4px    |
| 1.5  | 0.375rem | 6px    |
| 2    | 0.5rem   | 8px    |
| 2.5  | 0.625rem | 10px   |
| 3    | 0.75rem  | 12px   |
| 3.5  | 0.875rem | 14px   |
| 4    | 1rem     | 16px   |
| 5    | 1.25rem  | 20px   |
| 6    | 1.5rem   | 24px   |
| 7    | 1.75rem  | 28px   |
| 8    | 2rem     | 32px   |
| 9    | 2.25rem  | 36px   |
| 10   | 2.5rem   | 40px   |
| 11   | 2.75rem  | 44px   |
| 12   | 3rem     | 48px   |
| 14   | 3.5rem   | 56px   |
| 16   | 4rem     | 64px   |
| 20   | 5rem     | 80px   |
| 24   | 6rem     | 96px   |
| 28   | 7rem     | 112px  |
| 32   | 8rem     | 128px  |
| 36   | 9rem     | 144px  |
| 40   | 10rem    | 160px  |
| 44   | 11rem    | 176px  |
| 48   | 12rem    | 192px  |
| 52   | 13rem    | 208px  |
| 56   | 14rem    | 224px  |
| 60   | 15rem    | 240px  |
| 64   | 16rem    | 256px  |
| 72   | 18rem    | 288px  |
| 80   | 20rem    | 320px  |
| 96   | 24rem    | 384px  |



## plugins

注册插件使用

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('tailwindcss-children'),
    ],
}
```



## presets

预设部分允许您指定自己的自定义基本配置，而不是使用Tailwind的默认基本配置

1. 启用预设

   ```javascript
   /* my-presets.js */
   module.exports = {
       theme: {
       	colors: {
               blue: {
                   light: '#85d7ff',
                   DEFAULT: '#1fb6ff',
                   dark: '#009eeb',
               },
           },
       },
   }
   ```

   ```javascript
   /* tailwind.config.js */
   
   /** @type {import('tailwindcss').Config} */
   module.exports = {
       presets: [
       	require('./my-preset.js'),
       ],
   }
   ```

2. 禁用预设

   ```javascript
   /* tailwind.config.js */
   
   /** @type {import('tailwindcss').Config} */
   module.exports = {
       presets: [
       	// 不引入即可
       ],
   }
   ```



## prefix

公共前缀，解决应用样式的命名冲突问题

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
}
```

1. Tailwind生成的所有样式都会带有公共前缀，所以使用时，要带上公共前缀

   ```html
   <div class="tw-text-lg md:tw-text-xl tw-bg-red-500 hover:tw-bg-blue-500">
   	<!-- -->
   </div>
   ```

2. 负数的公共前缀要加在负号后面，如`class="-mt-8"`，写成如下

   ```html
   <div class="-tw-mt-8">
   	<!-- -->
   </div>
   ```

3. 公共前缀只会影响 Tailwind 的类，不会影响自己定义的类



## important

!不建议使用，全部样式加上`!important`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
}
```



## separator

分隔符：`md`，`hover`，`focus`等，默认使用`:`

```html
<div class="md:tw-text-xl hover:tw-bg-blue-500">
	<!-- -->
</div>
```

但是如果模板语言中不支持类名中使用特殊语言，则可以更改它

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
	separator: '_',
}
```



## blocklist

阻止某些类在内容中生成

```js
module.exports = {
    blocklist: [
        'container',
        'collapse',
    ],
}
```



## corePlugins

不想为某个核心插件生成任何类，最好在corePlugins配置中将该插件设置为false

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
    	opacity: false,
        preflight: false,  // 禁用preflight
    }
}
```

