---
outline: deep
---

# WSL

Windows Subsystem for Linux

## .wslconfig

> [!NOTE] Note
> 全局配置文件 `.wslconfig` 默认不存在, 需要创建于windows的`~`目录下(非wsl), 只适用于wsl2

> [!TIP] Tip
> WSL Settings can be found in the Start menu.

网络模式镜像, 主机地址环回, 自动内存回收

```ini
[wsl2]
networkingMode=mirrored

[experimental]
autoMemoryReclaim=gradual
hostAddressLoopback=true
```

参考: [Main WSL settings](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#main-wsl-settings)

## Basic commands

### Install

```powershell
# valid list of distribution names
wsl --list --online
# install
wsl --install <Distribution Name> [--name <Name>]
# list of the installed Linux distributions
wsl --list --verbose


# Change the default user for a distribution
# 可以去wsl中编辑`/etc/wsl.conf`修改default user
<Distribution Name> config --default-user <Username>
# set default Distribution
wsl --set-default <Distribution Name>
# Run a specific Linux distribution with a specific user
wsl --distribution <Distribution Name> --user <User Name>

# uninstall a Linux distribution
wsl --unregister <DistributionName>
```

### status

```powershell
wsl --version
wsl --status
wsl --update

# shutdown
wsl --shutdown
wsl --terminate <Distribution Name>
```

### Backup & Recovery

```powershell
# Export
wsl --export <Distribution Name> <FileName>

# Import
wsl --import <Distribution Name> <InstallLocation> <FileName>
```

### issue

error running windows EXEs "exec format error", such as vscode `code` command

With WSL 2.6.3 running Ubuntu 22.04, adding this to `/etc/wsl.conf`:

```ini
[interop]
enabled = true
```
