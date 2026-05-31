# vps 安全指北

vps 安全指北,以重装的 ubuntu 为例

## 变更 ssh 端口

```sh
# root用户执行
apt update && apt upgrade && apt autoremove

# 变更ssh端口 vim /etc/ssh/sshd_config
# 或者 /etc/ssh/sshd_config.d/50-cloud-init.conf
Port 998

systemctl disable ssh.socket
systemctl stop ssh.socket
systemctl enable ssh.service
systemctl restart ssh.service

# 加载配置文件或重启
systemctl reload ssh
```

## 创建非 root 用户

1. 创建其他用户如: `ifox`，最好不要使用以下会被扫描命中的名字：`admin`,`test`,`testuser1`, `foobar`等;
2. 赋予 `ifox` 用户免密使用 `sudo` 命令

```sh
# adduser 比 useradd 命令更加友好
# 使用 `deluser ifox` 删除创建的 `ifox` 用户
adduser ifox

# 更改默认编辑器为 vim
update-alternatives --config editor

# 设置用户ifox免密使用sudo命令.
# 特别注意：可以使用visudo命令追加到文件中的最后一行。
# 因为变量读取是从上往下，避免被sudo组的权限覆盖。
visudo
# ifox	ALL=(ALL:ALL) NOPASSWD:ALL
```

## 设置使用密钥免密登录

本地主机执行

```sh
# ssh-copy-id ${shortName} -i 指定私钥或公钥文件,这里使用公钥文件
ssh-copy-id -p ${PORT} -i ${fox_ed25519.pub} ${USERNAME}@${IP_address}
# 本地测试登录 -i 记得指定公钥对应的私钥,如果使用默认密钥也可以不指定-i参数
ssh -i ${fox_ed25519} -p ${PORT} ${USERNAME}@${IP_address}
```

## 设置只允许使用密钥来登录并禁止 root 用户登录

编辑配置文件 `vim /etc/ssh/sshd_config`

或者 `vim /etc/ssh/sshd_config.d/50-cloud-init.conf`

```sh
# 禁止密码验证登录。
# 如果启用(yes)的话,RSA认证登录就没有意义了，需要取消注释修改为 no
PasswordAuthentication no

# 禁用root账户登录，非必要;
# 这里只是禁止root用户登录,vps上还是可以使用root用户执行命令
PermitRootLogin no

# 服务器每 60 秒发一次心跳(保活)
ClientAliveInterval 60
```

重新加载配置 `systemctl reload ssh`

使用 root 账号来验证,因为我们之前设置了 ifox 账户的密钥免密登录
`ssh -p ${PORT} ${USERNAME}@${IP_address}`

ps: # 如果哪天你本地的密钥丢了或重置了，那只能进入 vps 官网使用 VNC 的方式进入服务器上传你的公钥到服务器的 authorized_keys 文件了。

## TCP 拥塞控制算法

```sh
# 查看当前可用的 TCP 拥塞控制算法
sysctl net.ipv4.tcp_available_congestion_control

# 查看当前 TCP 使用的算法
sysctl net.ipv4.tcp_congestion_control

# 查看是否已加载 BBR 模块
lsmod | grep bbr
```

### 永久开启 BBR

```sh
# 切换到root用户执行
wget --no-check-certificate \
-O /opt/bbr.sh https://github.com/teddysun/across/raw/master/bbr.sh

chmod 755 /opt/bbr.sh

/opt/bbr.sh
```

## 设置时区

```sh
# 查看当前时区
timedatectl

# 列出所有可用时区,过滤出亚洲时区
timedatectl list-timezones | grep Asia

# 设置新的时区为 Asia/Shanghai
timedatectl set-timezone Asia/Shanghai
```

## ufw

`ufw` 相当于简化了 `iptables` 命令.

查看 vps 防火墙全部规则以 `iptables --list` 为准

```sh
# apt update && apt install ufw && apt autoremove
ufw status
ufw enable # WARNING: 开启后默认关了所有端口 [!code error]

# 先查看vps哪些端口在LISTEN,用的是什么协议tcp/udp,然后开放它(例如 22)
ss -ntulp
# 开放ssh端口，默认的是22
ufw allow 22/tcp
# 端口范围内只允许tcp协议使用
ufw allow 2290:2300/tcp
# 端口范围内只允许udp协议使用
ufw allow 2290:2300/udp

# 基于IP地址的规则,我比较中意这个。 允许自已指定的IP访问vps上的所有服务(端口)
ufw allow from 192.168.0.104
# 也可以使用子网掩码来扩宽范围
ufw allow form 192.168.0.0/24
# 来自 192.168.0.104 的 IP 只能访问998端口
ufw allow from 192.168.0.104 to any port 998
# 限制来自 192.168.0.104 的 IP 只能使用 tcp 协议和通过 22端口 来访问
ufw allow from 192.168.0.104 proto tcp to any port 22

# nmap检查本地正在监听的端口
nmap -p- 127.0.0.1

# update配置(将开放的端口禁用，例如禁用ftp)
ufw deny ftp
ufw delete allow 22 # 删除某个规则
ufw delete allow ftp # 删除某个规则
ufw reset  # 重置所有规则后需重新启用ufw

# nginx
ufw app list
ufw allow 'Nginx Full' # 放行80和443
# ufw allow 'Nginx HTTP' # 放行80端口
# ufw allow 'Nginx HTTPS' # 放行443端口

# 关闭ufw功能
ufw disable


```

## 部署 docker

官方文档: [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

> [!tip]
> 授权非 root 用户使用 docker 命令 [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/)

## Misc.

### vps 评测脚本

```sh
# from 秋水逸冰:https://github.com/teddysun/across/blob/master/bench.sh
wget -qO- bench.sh | bash
curl -Lso- bench.sh | bash

# YABS.sh https://github.com/masonr/yet-another-bench-script
wget -qO- yabs.sh | bash
curl -sL https://yabs.sh | bash
```

### 使用 `vim` 时显示行号

```sh
# vim ~/.vimrc
set nu
```

### `who` 或 `w` 查看当前登陆的用户

```sh
# 检查日志和登陆记录
less /var/log/auth.log
who /var/log/wtmp

# 查看操作系统相关信息
hostnamectl
```
