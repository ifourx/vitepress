# ssh

## 创建密钥

不推荐使用 rsa，推荐逐步迁移到更安全的 ed25519

```sh
ssh-keygen -t ed25519 -N "" -C "" -f ~/.ssh/i4x_ed25519
```

### 通过私钥获取公钥

私钥生成公钥,需要先将私钥文件的权限改成 0600,`chmod 0600 i4x_ed25519`

```sh
ssh-keygen -y -f fox_ed25519 >> fox_ed25519.pub
```

## vps 免密登录

配置指定公钥文件免密登陆服务器

```sh
ssh-copy-id -i ~/.ssh/i4x_ed25519.pub root@192.168.xxx.xxx
```

使用指定公钥文件登陆服务器

```sh
ssh -i ~/.ssh/i4x_ed25519.pub root@192.168.xxx.xxx
```

## ssh config

配置文件: `~/.ssh/config`

实现使用自定义私钥从 github 或 gitlab 上 clone 项目

```ssh-config
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3

Host githubifourx
    User git
    Hostname github.com
    Port 22
    IdentityFile ~/.ssh/i4x_ed25519

Host gitlab
    User git
    Hostname gitlab.com
    Port 22
    IdentityFile ~/.ssh/i4x_ed25519

# vps
Host osaka-500
    HostName netease.flygar.org
    User ifox
    Port 998
    IdentityFile ~/.ssh/fox_ed25519
```

测试与 github 的通信

clone 使用`git clone githubifourx:<username>/<repo>.git`

而不是 `git clone git@github.com:<username>/<repo>.git`

```sh
ssh -T githubifourx
```

测试 vps 免密登录

```sh
ssh osaka-500
```

### OpenSSL

加密

```sh
openssl enc -aes-256-cbc -pbkdf2 -iter 100000 -salt \
  -in flygar_ed25519 \
  -out flygar_ed25519.enc
```

解密

```sh
openssl enc -d -aes-256-cbc -pbkdf2 -iter 100000 \
  -in flygar_ed25519.enc -out flygar_ed25519
```
