# Cheat sheet

## How To

[How To Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)

## Run fast

```sh
time
htop btop
ss
perf
```

如果某个commit没有被任何引用,并且没有声明分支名,那么就会被git自动垃圾回收
Btrfs 或 ZFS 文件系统

## Command

### host IP

```sh
ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
```

外网 ip

```sh
curl https://ipinfo.io
```

### curl & wget

```sh
# -f：如果失败就返回错误码
# -s：不打印下载进度
# -S：显示错误信息
# -L 自动跟踪重定向。curl 默认不跟随重定向。
curl -fsSL https://get.docker.com -o get-docker.sh
curl -fsSL https://get.docker.com | sh

# wget适用于没有 curl 的系统（如最小安装的 Linux）
wget -qO- https://get.docker.com | sh
```

### 文件大小排序

```sh
du -sh * | sort -h
```

### 流

重定向

```sh
# 将标准输出（stdout）重定向到文件（覆盖）
echo "hello" > output.txt

# 将标准输出（stdout）重定向到文件（追加）
echo "world" >> output.txt

# 将标准错误（stderr）重定向到文件
ls foobar 2> errors.txt

# 将标准输出和标准错误同时重定向到同一个文件
ls foobar &> all_output.txt

# 从文件中重定向标准输入（stdin）
grep "pattern" < input.txt

# 通过重定向到 /dev/null 来丢弃输出
cmd > /dev/null 2>&1
cmd &> /dev/null
```

## 环境变量

定义的环境变量只会作用于当前shell, 使用export可以继承到当前shell的子程序中
