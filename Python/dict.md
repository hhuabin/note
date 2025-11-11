# `dict` 字典

`key-value` 键值对

```python
# ✅ 1. 直接定义
d = {"a": 1, "b": 2}

# ✅ 2. 使用 dict() 函数
d = dict(a=1, b=2)

# ✅ 3. 使用列表或元组构造
d = dict([("a", 1), ("b", 2)])

# ✅ 4. 字典推导式
d = {i: i ** 2 for i in range(3)}  # {0:0, 1:1, 2:4}
```





### 1️⃣ 访问

```python
person = {"name": "Alice", "age": 25}

print(person["name"])       # 直接访问 → Alice
print(person.get("age"))    # 安全访问 → 25
print(person.get("sex", "未知"))  # 默认值 → 未知
```

`python`不可使用 `person.name` 的方式访问对象。类才可以这样访问`class.name`



### 2️⃣ 新增 / 修改

```python
person["city"] = "Guangzhou"    # 新增
person["age"] = 30              # 修改
```



### 3️⃣ 删除

```python
person.pop("age")               # 删除并返回值
del person["city"]              # 删除键值对
person.clear()                  # 清空字典
```





## 遍历字典

```python
d = {"a": 1, "b": 2, "c": 3}

# 遍历键
for k in d:
    print(k)

# 遍历值
for v in d.values():
    print(v)

# 遍历键值对
for k, v in d.items():
    print(k, v)
```



## 字典的推导式

```python
# 键是数字，值是平方
squares = {x: x**2 for x in range(5)}
print(squares)  # {0:0, 1:1, 2:4, 3:9, 4:16}

# 过滤
even_squares = {x: x**2 for x in range(5) if x % 2 == 0}
print(even_squares)  # {0:0, 2:4, 4:16}
```

