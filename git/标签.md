# 标签

列出标签

```shell
git tag
```

创建标签

```shell
git tag v1.0
```

给指定版本创建标签

```shell
git tag v1.0 commitHash
```



```shell
git tag -l 'v1.0'
```

查看特定标签

```shell
git show v1.0
```

删除标签

```shell
git tag -d v1.0
```

创建标签分支

```shell
git checkout -b 'v1.0'
```

推送指定分支

```shell
git push origin v1.0
```

推送所有分支

```shell
git push origin --tags
```

