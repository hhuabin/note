# Flex

## flex

- **`flex-grow`：** 控制项目的放大比例。默认值为 0，即不放大
- **`flex-shrink`：** 控制项目的缩小比例。默认值为 1，即可以缩小
- **`flex-basis`：** 定义了在分配多余空间之前，项目占据的主轴空间
- **默认值：**0 1 auto

| Class         | Properties      |
| ------------- | --------------- |
| flex-[2_2_0%] | flex: 2 2 0%;   |
| flex-none     | flex: none;     |
| flex-1        | flex: 1 1 0%;   |
| flex-auto     | flex: 1 1 auto; |
| flex-initial  | flex: 0 1 auto; |

### flex-grow

| Class    | Properties    |
| -------- | ------------- |
| grow-[2] | flex-grow: 2; |
| grow     | flex-grow: 1; |
| grow-0   | flex-grow: 0; |

### flex-shrink

| Class      | Properties      |
| ---------- | --------------- |
| shrink-[2] | flex-shrink: 2; |
| shrink     | flex-shrink: 1; |
| shrink-0   | flex-shrink: 0; |

### flex-basis

| Class               | Properties                       |
| ------------------- | -------------------------------- |
| basis-[14.2857143%] | flex-basis: 14.2857143%;         |
| basis-0             | flex-basis: 0px;                 |
| basis-4             | flex-basis: 1rem;     /* 16px */ |
| basis-1/2           | flex-basis: 50%;                 |
| basis-full          | flex-basis: 100%;                |



## order 

| Class       | Properties    |
| ----------- | ------------- |
| order-1     | order: 1;     |
| order-first | order: -9999; |
| order-last  | order: 9999;  |
| order-none  | order: 0;     |



## flex-direction

| Class            | Properties                      |
| ---------------- | ------------------------------- |
| flex-row         | flex-direction: row;            |
| flex-col         | flex-direction: column;         |
| flex-row-reverse | flex-direction: row-reverse;    |
| flex-col-reverse | flex-direction: column-reverse; |



## flex-wrap

| Class             | Properties               |
| ----------------- | ------------------------ |
| flex-wrap         | flex-wrap: wrap;         |
| flex-nowrap       | flex-wrap: nowrap;       |
| flex-wrap-reverse | flex-wrap: wrap-reverse; |



## justify-content

| Class           | Properties                      |
| --------------- | ------------------------------- |
| justify-normal  | justify-content: normal;        |
| justify-start   | justify-content: flex-start;    |
| justify-end     | justify-content: flex-end;      |
| justify-center  | justify-content: center;        |
| justify-between | justify-content: space-between; |
| justify-around  | justify-content: space-around;  |
| justify-evenly  | justify-content: space-evenly;  |
| justify-stretch | justify-content: stretch;       |



## align-items

| Class          | Properties               |
| -------------- | ------------------------ |
| items-start    | align-items: flex-start; |
| items-end      | align-items: flex-end;   |
| items-center   | align-items: center;     |
| items-baseline | align-items: baseline;   |
| items-stretch  | align-items: stretch;    |



## align-self

| Class         | Properties              |
| ------------- | ----------------------- |
| self-auto     | align-self: auto;       |
| self-start    | align-self: flex-start; |
| self-end      | align-self: flex-end;   |
| self-center   | align-self: center;     |
| self-stretch  | align-self: stretch;    |
| self-baseline | align-self: baseline;   |
