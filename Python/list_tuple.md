# `tuple` 元组

`()`或`tuple()`：不可变、数组

```python
empty_tuple = ()      # 空元组

tup = (1, 2, 3)
```



## `tuple` 常用方法

```python
t = (1, 2, 2, 3)
t.count(2)  # 统计元素2的个数 → 2
t.index(3)  # 查找元素3的位置 → 3
```



# `list` 列表

`[ ]` 或 `list()`：可变

```python
list = []             # 空列表

list = [1, 2, 3]
```



##　`list` 常用方法

```python
lst = [3, 1, 2]
lst.append(4)        # 追加元素
lst.extend([5, 6])   # 扩展多个元素
lst.insert(1, 100)   # 指定位置插入
lst.remove(3)        # 删除元素3
lst.pop()            # 删除最后一个
lst.sort()           # 原地排序
lst.reverse()        # 反转
```





# `tuple` 、`list`对比

| 操作     | 列表 list                              | 元组 tuple                      |
| -------- | -------------------------------------- | ------------------------------- |
| 索引访问 | ✅ `lst[0]`                             | ✅ `tup[0]`                      |
| 切片     | ✅ `lst[1:3]`                           | ✅ `tup[1:3]`                    |
| 遍历     | ✅                                      | ✅                               |
| 添加元素 | ✅ `append()` / `extend()` / `insert()` | ❌ 不可变                        |
| 删除元素 | ✅ `remove()` / `pop()` / `del`         | ❌ 不可变                        |
| 修改元素 | ✅ `lst[0] = 9`                         | ❌ 不可变                        |
| 拼接     | ✅ `lst1 + lst2`                        | ✅ `tup1 + tup2`                 |
| 重复     | ✅ `lst * 2`                            | ✅ `tup * 2`                     |
| 成员检测 | ✅ `'a' in lst`                         | ✅ `'a' in tup`                  |
| 长度     | ✅ `len(lst)`                           | ✅ `len(tup)`                    |
| 排序     | ✅ `lst.sort()`                         | ❌ 需用 `sorted(tup)` 返回新列表 |



### 相互转换

```python
lst = [1, 2, 3]
tup = tuple(lst)  # → (1, 2, 3)

t2 = (4, 5, 6)
l2 = list(t2)     # → [4, 5, 6]
```

