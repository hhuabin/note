# 本地版本回溯

回到指定版本，工作区内容不变，已提交信息放到**暂存区**

```shell
git reset --soft commitHash
```

回到指定版本，工作区内容不变，已提交信息为**新内容**

```shell
git reset [--mixed] commitHash
```

回到指定版本，版本穿梭

```shell
git reset --hard commitHash
```



# 本地提交信息修改

**attention：以下诸多命令都会修改 commitHash，对于已经推送远程的 commit 切勿使用**

---

修改本次提交信息（**该命令会修改commitHash值**）

```shell
git commit --amend
```

回到指定版本，并对信息作出修改

```shell
git rebase -i commitHash       选 edit
git rebase --continue          继续
git rebase --skip              跳过
git rebase --abort             中止
```



# 远程仓库版本回溯

## github

1. 使用 `git reset` 回到上一个版本，然后强制提交，远程仓库即可回到过去的版本

   ```bash
   git reset commitHash         # 回到过去版本
   
   # 中间可以提交新的版本
   
   git push --force             # 强制提交
   ```

   只要有相同的 `commitHash` 即可强制推送



## gitlab

**首先说明，远程仓库的 commit 不可删除**



1. **创建新的分支：** 在主分支上创建一个新的分支，让你的修改在这个分支上进行。这样可以避免直接修改主分支，保持主分支的稳定性。

   ```shell
   git checkout -b new-branch main
   ```

2. **进行修改：** 在新的分支上进行你的修改，包括修复、添加、删除等。

3. **提交新的 commit：** 将你的修改提交为新的 commit。

   ```
   git add .
   git commit -m "Your new commit message"
   ```

4. **合并到主分支：** 将新的分支合并到主分支。

   ```
   git checkout main
   git merge new-branch
   ```

5. **解决冲突（如果有的话）：** 如果在合并时发生冲突，需要解决冲突。解决冲突后，继续合并。

6. **推送到远程仓库：** 将主分支的修改推送到远程仓库。

   ```
   git push origin main
   ```

请注意，如果你已经将不希望存在的 commit 推送到了远程仓库，并且其他人也已经基于这个 commit 进行了工作，强制推送（`git push --force`）可能会导致问题。在进行强制推送之前，请确保你了解你的团队成员是否受到影响，并且他们知道如何处理这种情况。通常情况下，避免在主分支上进行强制推送，以免引起团队合作的问题
