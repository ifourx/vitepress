---
outline: deep
---

## How To

[How To Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04)

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
