# 基础

1. 初始化仓库

   ```bash
   git init
   ```

2. 暂存所有

   ```bash
   git add ./
   ```

3. 提交

   ```bash
   git commit -m 'commit'
   ```

4. 更改分支名

   ```bash
   git branch -M main
   ```

5. 创建仓库别名

   ```bash
   git remote add origin link
   ```

   ```bash
   git remote set-url origin <new_url>  # 重设仓库地址
   ```

   ```bash
   git remote rm 仓库别名       # 删除仓库别名
   ```

6. 显示仓库 `url`

   ```bash
   git remote -v
   ```

7. 默认推送分支

   ```bash
   git push -u origin main
   ```



## 推送

推送默认分支

```shell
git push
```

推送指定分支

```shell
git push origin branchName
```

拉取

```shell
git pull origin branchName
```

强制推送

```shell
git push --force
```



# 版本信息

查看版本信息

```shell
git reflog
```

查看版本详细日志信息

```shell
git log
```

查看版本信息，一行显示

```shell
git log --oneline
```



# 用户信息

设置用户信息

```shell
git config --global user.name "name"
git config --global user.email email
```

查看用户信息

```shell
git config --list
```

