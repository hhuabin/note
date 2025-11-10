# transition

## transition-property

| Class                   | Properties                                                   |
| ----------------------- | ------------------------------------------------------------ |
| **transition-[height]** | transition-property: height;                                 |
| transition-none         | transition-property: none;                                   |
| transition-all          | transition-property: all;<br />transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);<br />transition-duration: 150ms; |
| transition              | transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;<br />transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);<br />transition-duration: 150ms; |
| transition-colors       | transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;<br />transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);<br />transition-duration: 150ms; |
| transition-opacity      | transition-property: opacity;<br />transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);<br />transition-duration: 150ms; |
| transition-shadow       | transition-property: box-shadow;<br />transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);<br /> transition-duration: 150ms; |
| transition-transform    | transition-property: transform;<br />transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);<br />transition-duration: 150ms; |



## transition-duration

| duration-0            | transition-duration: 0s;     |
| --------------------- | ---------------------------- |
| **duration-[2000ms]** | transition-duration: 2000ms; |
| duration-75           | transition-duration: 75ms;   |
| duration-100          | transition-duration: 100ms;  |
| duration-150          | transition-duration: 150ms;  |
| duration-200          | transition-duration: 200ms;  |
| duration-300          | transition-duration: 300ms;  |
| duration-500          | transition-duration: 500ms;  |
| duration-700          | transition-duration: 700ms;  |
| duration-1000         | transition-duration: 1000ms; |

## transition-timing-function

| Class                                      | Properties                                                   |
| ------------------------------------------ | ------------------------------------------------------------ |
| ease-[cubic-bezier(0.95,0.05,0.795,0.035)] | transition-timing-function: cubic-bezier(0.95,0.05,0.795,0.035); |
| ease-linear                                | transition-timing-function: linear;                          |
| ease-in                                    | transition-timing-function: cubic-bezier(0.4, 0, 1, 1);      |
| ease-out                                   | transition-timing-function: cubic-bezier(0, 0, 0.2, 1);      |
| ease-in-out                                | transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);    |

## transition-delay

| Class          | Properties                |
| -------------- | ------------------------- |
| delay-[2000ms] | transition-delay: 2000ms; |
| delay-0        | transition-delay: 0s;     |
| delay-75       | transition-delay: 75ms;   |
| delay-100      | transition-delay: 100ms;  |
| delay-150      | transition-delay: 150ms;  |
| delay-200      | transition-delay: 200ms;  |
| delay-300      | transition-delay: 300ms;  |
| delay-500      | transition-delay: 500ms;  |
| delay-700      | transition-delay: 700ms;  |
| delay-1000     | transition-delay: 1000ms; |



# animation

| animate-none                             | animation: none;                                             |
| ---------------------------------------- | ------------------------------------------------------------ |
| animate-[wiggle_1s_ease-in-out_infinite] | animation: wiggle 1s ease-in-out infinite;                   |
| animate-spin                             | animation: spin 1s linear infinite;<br />@keyframes spin {<br />  from {<br />    transform: rotate(0deg);<br />  }<br />  to {<br />    transform: rotate(360deg);<br />  }<br />} |
| animate-ping                             | animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;<br />@keyframes ping {<br />  75%, 100% {<br />    transform: scale(2);<br />    opacity: 0;<br />  }<br />} |
| animate-pulse                            | animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;<br />@keyframes pulse {<br />  0%, 100% {<br />    opacity: 1;<br />  }<br />  50% {<br />    opacity: .5;<br />  }<br />} |
| animate-bounce                           | animation: bounce 1s infinite;<br />@keyframes bounce {<br />  0%, 100% {<br />    transform: translateY(-25%);<br />    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);<br />  }<br />  50% {<br />    transform: translateY(0);<br />    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);<br />  }<br />} |



# transform

## scale

| Class       | Properties             |
| ----------- | ---------------------- |
| scale-[1.7] | transform: scale(1.7); |
| scale-0     | transform: scale(0);   |
| scale-x-0   | transform: scaleX(0);  |
| scale-y-0   | transform: scaleY(0);  |
| scale-50    | transform: scale(.5);  |
| scale-x-50  | transform: scaleX(.5); |
| scale-y-50  | transform: scaleY(.5); |
| scale-100   | transform: scale(1);   |
| scale-x-100 | transform: scaleX(1);  |
| scale-y-100 | transform: scaleY(1);  |

## rotate

| Class          | Properties                 |
| -------------- | -------------------------- |
| rotate-[17deg] | transform: rotate(17deg);  |
| rotate-0       | transform: rotate(0deg);   |
| rotate-1       | transform: rotate(1deg);   |
| rotate-2       | transform: rotate(2deg);   |
| rotate-3       | transform: rotate(3deg);   |
| rotate-6       | transform: rotate(6deg);   |
| rotate-12      | transform: rotate(12deg);  |
| rotate-45      | transform: rotate(45deg);  |
| rotate-90      | transform: rotate(90deg);  |
| rotate-180     | transform: rotate(180deg); |

## translate

| Class               | Properties                    |
| ------------------- | ----------------------------- |
| translate-y-[17rem] | transform: translateY(17rem); |
| translate-x-0       | transform: translateX(0px);   |
| translate-y-0       | transform: translateY(0px);   |
| translate-x-px      | transform: translateX(1px);   |
| translate-y-px      | transform: translateY(1px);   |
| translate-x-4       | transform: translateX(1rem);  |
| translate-y-4       | transform: translateY(1rem);  |
| translate-x-1/2     | transform: translateX(50%);   |
| translate-y-1/2     | transform: translateY(50%);   |
| translate-x-full    | transform: translateX(100%);  |
| translate-y-full    | transform: translateY(100%);  |



## skew

| Class          | Properties               |
| -------------- | ------------------------ |
| skew-y-[17deg] | transform: skewY(17deg); |
| skew-x-0       | transform: skewX(0deg);  |
| skew-y-0       | transform: skewY(0deg);  |
| skew-x-1       | transform: skewX(1deg);  |
| skew-y-1       | transform: skewY(1deg);  |
| skew-x-2       | transform: skewX(2deg);  |
| skew-y-2       | transform: skewY(2deg);  |
| skew-x-3       | transform: skewX(3deg);  |
| skew-y-3       | transform: skewY(3deg);  |
| skew-x-6       | transform: skewX(6deg);  |
| skew-y-6       | transform: skewY(6deg);  |
| skew-x-12      | transform: skewX(12deg); |
| skew-y-12      | transform: skewY(12deg); |



## transform-origin

| Class               | Properties                      |
| ------------------- | ------------------------------- |
| origin-[33%_75%]    | transform-origin: 33% 75%;      |
| origin-center       | transform-origin: center;       |
| origin-top          | transform-origin: top;          |
| origin-top-right    | transform-origin: top right;    |
| origin-right        | transform-origin: right;        |
| origin-bottom-right | transform-origin: bottom right; |
| origin-bottom       | transform-origin: bottom;       |
| origin-bottom-left  | transform-origin: bottom left;  |
| origin-left         | transform-origin: left;         |
| origin-top-left     | transform-origin: top left;     |
