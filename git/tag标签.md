# 标签

1. 列出标签

   ```bash
   # 查看所有标签（按字母排序）
   git tag
   
   # 查看带详细信息的标签
   git tag -n
   
   # 查看带提交信息的标签
   git tag -l -n
   ```

2. 创建标签

   ```bash
   git tag v1.0
   ```

3. 给指定版本创建标签

   ```bash
   git tag v1.0 commitHash
   ```

4. 查看带提交信息的标签

   ```bash
   git tag -l 'v1.0'
   ```

5. 查看特定标签

   ```bash
   git show v1.0
   ```

6. 删除标签

   ```bash
   git tag -d v1.0
   ```

7. 创建标签分支

   ```bash
   git checkout -b 'v1.0'
   ```

8. 推送指定分支

   ```bash
   git push origin v1.0
   ```

9. 推送所有分支

   ```bash
   git push origin --tags
   ```
