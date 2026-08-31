# Vmware

[Vmware官网下载](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion "Vmware下载")

1. 搜索 **VMware Workstation**
2. 选择最新版本的 **VMware Workstation Pro for Windows**
3. 同意 Terms and Conditions
4. 填写基本信息后下载



# CentOS

[CentOS官网下载](https://www.centos.org/download/ "CentOS下载") 下载 `x86_64` `iso` 镜像



# 连接网络

```shell
# 查看 ip
ip addr

# 直接查看 ens33 名的 ip
ip addr show ens33

# 查看路由
ip route

# ip 地址在 ens33 中，如 inet 192.168.11.128
# 如果没有则大概率是虚拟机的网络适配器（网卡）有问题了
```

> `ens33` 一般是动态 `ip`，它会带有 `dynamic` 等说明
>
> 如果虚拟机需要用 `xshell` 连接，需要配置`静态 ip`，具体 `ai` 查怎么配置就行，不同的操作系统版本配置方式可能不太一样。注意：生产环境不要乱配`静态 ip`

---

- 问题解决：虚拟机的 `ip` 地址不一定能用，也可能是 `windows` 的问题

    ```shell
    ens33: <NO-CARRIER,BROADCAST,MULTICAST,UP>
    ```

    `ens33` 报了这个，不显示 `ip` 地址，原因是 `VMware` 的 **NAT 服务**（`VMware NAT Service`）在 `Windows` 中没有正常运行，需要手动重启

    ```shell
    # 以 管理员身份 打开 Windows CMD（命令提示符）
    net stop "VMware NAT Service"
    net stop "VMware DHCP Service"
    net start "VMware DHCP Service"
    net start "VMware NAT Service"
    
    # 重启完再执行 ip addr 应该就可以看到 ens33 的 ip 地址了
    ```

    同时，可以将 `Windows` 的 `VMware NAT Service`、`VMware DHCP Service` 服务把手动设置为自动(延迟启动)；（手动的情况下，Windows 无法自动启动服务，不会自动为虚拟机分配 IP 地址（DHCP 功能））

    1. `Win + R` → 输入 `services.msc` → 回车
    2. 找到 `VMware NAT Service`、`VMware DHCP Service`
    3. 右键 → **属性**
    4. **启动类型** 改为 **"自动"**（或"自动（延迟启动）"更稳定）
    5. 点击 **应用** → **确定**



# Xshell

[Xshell、Xftp个人版下载](https://www.xshell.com/zh/free-for-home-school/ "Xshell个人版" )

[Xshell、Xftp下载](https://www.xshell.com/zh/all-downloads/ "Xshell下载")

1. 查看虚拟机 `IP` 地址

    ```shell
    ip addr
    ```

2. 看 SSH 服务有没有启动

    ```shell
    systemctl status sshd          # Active: active (running) 是运行
    ```

3. 没有启动 `SSH`，可以启动

    ```shell
    systemctl start sshd
    
    # 设置开机自启动
    systemctl enable sshd
    ```

4. 使用 ip 地址，默认端口号：22 连接



# Linux `/` 目录结构

```mermaid
graph TB
	subgraph 系统数据
        etc[etc配置文件]
        opt[opt第三方软件]
        run[run运行时数据]
        srv[srv服务数据]
        var[var经常变化的数据]
   	end
   	
   	subgraph 挂载与临时
        media[media自动挂载设备]
        mnt[mnt临时挂载点]
        tmp[tmp临时文件]
    end
    
    subgraph 用户
        home[home普通用户家目录]
        root[root用户家目录]
        usr[usr用户程序资源]
    end
    
    subgraph 启动与设备
        boot[boot启动文件]
        dev[dev设备文件]
        proc[proc内核与进程信息]
        sys[sys系统硬件信息]
    end
   	
   	subgraph 系统核心
        bin[bin基础命令]
        sbin[sbin系统命令]
        lib[lib系统库文件]
    end

```



# 克隆 `Linux`

克隆虚拟机操作（`CentOS 10`）

1. mac 地址

    在 设置(Settings) -> 网络适配器(Network Adapter) -> 高级 中修改

2. 主机名

    ```shell
    sudo vim /etc/hostname
    ```

3. ip 地址

    动态 ip 可以不管。

    ```shell
    # 查看 ip
    ip addr
    
    sudo nmcli connection modify ens33 ipv4.addresses 192.168.11.129/24    # 128 + 1 = 129 修改后面的数字即可
    
    # 重新启用网络连接
    sudo nmcli connection down ens33
    sudo nmcli connection up ens33
    
    # 再次查看ip
    ip addr
    ```

4. UUID

    ```shell
    # 查看 UUID
    sudo nmcli connection show            # 记录下 UUID ；如 ba6946fb-bfd1-3c9b-b1a4-7b87a37b5448
    
    # 删除连接
    sudo nmcli connection delete ens33
    
    # 重新创建
    sudo nmcli connection add type ethernet ifname ens33 con-name ens33
    
    # 再查看，就能看到新的 UUID 了
    sudo nmcli connection show 
    ```

    
