github可以使用凭据管理器登录

gitlab可以使用ssh登录



# `SSH`登录

1. 找到 `C` 盘目录

   ```bash
   C:\Users\usename\.ssh
   ```

2. 在 `git` 控制台生成密钥

   ```bash
   # 邮箱替换成自己的   git config --list
   ssh-keygen -t rsa -C "your_email@example.com"              # 或者下面那个
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"      # 使用 rsa 加密生成 4096 位密钥，默认是 2048
   
   
   ssh-keygen -t ed25519 -C "your_email@example.com"          # 使用 ed25519 加密（兼容性不好）
   ```

   一路 `Enter`

3. 将生成的公钥（`.pub`结尾）复制到`github`的`SSH and GPG keys`的`SSH keys`中的`New SSH key`

   ```bash
   C:\Users\usename\.ssh\***.pub
   ```

   ```bash
   github -> (用户)Settings -> SSH and GPG keys -> SSH keys -> New SSH key
   ```

   `Title`随便填，不知道就填`window`用户名，复制到 `key` 即可







### Windows 系统上的git对本地文件的大小写不敏感

如果你希望在 Windows 或 macOS 上让 Git 强制区分大小写，可以通过以下方式配置：

方法 1：启用 `core.ignoreCase`

Git 有一个配置项 `core.ignoreCase`，默认情况下在 Windows 和 macOS 上为 `true`（即忽略大小写）。你可以将其设置为 `false`，以强制 Git 区分大小写：

```bash
git config core.ignoreCase false
```

