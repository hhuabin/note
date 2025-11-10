# 基础

初始化仓库

```shell
git init
```

暂存所有

```shell
git add ./
```

提交

```shell
git commit -m 'commit'
```

更改分支名

```shell
git branch -M main
```

创建仓库别名

```shell
git remote add origin link
```

默认推送分支

```shell
git push -u origin main
```

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

显示仓库url

```shell
git remote -v
```

删除仓库别名

```shell
git remote rm 仓库别名
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

