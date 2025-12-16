# 分支

查看状态：**切换分支前，一定要查看状态，确认所有内容已提交再切换**

```shell
git status
```

新建分支

```shell
git branch branchName
```

查看分支

```shell
git branch -v
```

查看所有远程分支

```bash
git branch -r
```

查看本地和远程的所有分支

```bash
git branch -a
```

切换分支

```shell
git checkout branchName
```

合并分支

```shell
git merge branchName
```

修改分支名字

```shell
git branch -M newBranchName
```

删除分支

```shell
git branch -d branchName
```

强行删除分支

```shell
git branch -D branchName
```





# 切换分支

1. 切换到对应的 `commit`

   ```bash
   git checkout a1b2c3d
   ```

2. 切换到标签

   ```bash
   切换到标签# 临时切换到标签（分离头指针状态）
   git checkout v1.2.0
   
   # 或使用完整格式
   git checkout tags/v1.2.0
   ```

   
