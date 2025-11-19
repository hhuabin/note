| 用法                    | 示例                          |
| ----------------------- | ----------------------------- |
| 遍历 `list`             | `for x in arr:`               |
| 遍历 `dict` `key/value` | `for k, v in d.items():`      |
| 索引 + 值               | `for i, v in enumerate(arr):` |
| range                   | `for i in range(n):`          |
| for-else                | `for..else:`                  |
| 多变量解包              | `for a, b in arr:`            |
| 列表推导                | `[i*2 for i in ...]`          |



## range

```python
range(start, stop, step)
```

```python
list(range(5))        # [0,1,2,3,4]
list(range(2, 8))     # [2,3,4,5,6,7]
list(range(10, 2, -2))# [10,8,6,4]
list(range(5,5,1))    # []
```





## 遍历 range() 序列

```python
for i in range(5):  # 0~4
    print(i)

for i in range(1, 6):  # 1~5
    print(i)

for i in range(10, 0, -1):  # 倒序
    print(i)
```



##  使用 enumerate 获取索引 + 值

```python
arr = ['a', 'b', 'c']

for i, v in enumerate(arr):
    print(i, v)
    
"""
0 a
1 b
2 c
"""
```



## 列表解析（for 的简写）

最常用 Python 语法之一：

```python
arr = [i * 2 for i in range(5)]

# arr = [0, 2, 4, 6, 8]
```

带条件：

```python
arr = [i for i in range(10) if i % 2 == 0]
# arr = [0, 2, 4, 6, 8]
```



## 多层嵌套解析

```python
res = [(i, j) for i in range(2) for j in range(3)]
# res = [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2)]
```

