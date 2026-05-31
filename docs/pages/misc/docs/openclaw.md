---
outline: deep
---

# 🦞OpenClaw — Personal AI Assistant

## TODO

smart home 家具自动化 通过自然语言控制和自动化 Home Assistant 设备。
对话控制扫地机器人

https://github.com/ngutman/openclaw-ha-addon

灯泡: Philips Hue

## installation

```sh
sudo apt update && sudo apt upgrade -y

# Install Node.js 24
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v

# install openclaw
curl -fsSL https://openclaw.ai/install.sh | bash
# Run onboarding
openclaw onboard --install-daemon

# Create the non-root user that will own OpenClaw state and services.
adduser openclaw
usermod -aG sudo openclaw
loginctl enable-linger openclaw

su - openclaw
openclaw --version
```

## Gateway

关闭代理

```sh
unset HTTPS_PROXY HTTP_PROXY NO_PROXY
curl -kIv https://bwh-jp.tail2276f1.ts.net
```

```sh
# Verify the gateway
openclaw status
openclaw gateway status
openclaw gateway run

# stop/start gateway
openclaw gateway stop
Or: systemctl --user stop openclaw-gateway.service
curl http://localhost:18789/health

# 检查
curl -I http://127.0.0.1:18789
# 查询当前用户下的gateway service
systemctl --user status openclaw-gateway.service
# 查询当前用户下的gateway日志
journalctl --user -u openclaw-gateway.service -f
```

### Control UI(Dashboard)

`gateway token` 可以在配置文件 `~/.openclaw/openclaw.json` 中找到

#### Option A: SSH tunnel

```sh
# From your local machine
ssh -N -L 18789:127.0.0.1:18789 user@YOUR_DROPLET_IP
```

Then open: `http://127.0.0.1:18789/`

#### Option B: Tailscale Serve

```sh
curl -fsSL https://tailscale.com/install.sh | sudo sh
sudo tailscale up
# To not require root, use 'sudo tailscale set --operator=$USER' once.
openclaw config set gateway.tailscale.mode serve
openclaw gateway restart

# 啥
gateway.auth.allowTailscale: true
```

Then open `https://<magicdns>/` from any device on your tailnet.

Tailscale Serve authenticates Control UI and WebSocket traffic via tailnet identity headers, which assumes the gateway host itself is trusted. HTTP API endpoints follow the gateway’s normal auth mode (token/password) regardless. To require explicit shared-secret credentials over Serve, set `gateway.auth.allowTailscale: false` and use `gateway.auth.mode: "token"` or `"password"`.

#### Option C: Tailnet bind (no Serve)

```sh
openclaw config set gateway.bind tailnet
openclaw gateway restart
```

Then open `http://<tailscale-ip>:18789` (token required).

#### D: funnel

```sh
tailscale funnel --bg 18789
# tailscale funnel --https=443 off

# 因为从不信任的公网访问,需要把"允许不安全认证"设置为false
openclaw config set gateway.controlUi.allowInsecureAuth false
```

## config

所有的配置文件和运行状态都在 `~/.openclaw/` 目录下

```sh
tail ~/.openclaw/openclaw.json
```

# 运维

## 安全审计

```sh
# 扫描实例进行深度检查
openclaw security audit --deep
# 自动修复
openclaw security audit --fix
```

## 日志

```sh


tailf ~/.openclaw/logs/commands.log
# openclaw gateway日志
tail /tmp/openclaw/openclaw-2026-05-09.log
openclaw logs --follow
```

## 常用命令

```sh
# 检查版本状态自助诊断
openclaw --version
openclaw status
openclaw gateway status
openclaw dashboard
openclaw doctor

# 添加channel
openclaw channels add

# 文件路径
~/.openclaw/openclaw.json
~/.openclaw/workspace
~/.openclaw/agents/main/sessions

# search provider
openclaw configure --section web
```

## Troubleshooting

### gateway will not start

```sh
openclaw doctor --non-interactive
# gateway日志
journalctl --user -u openclaw-gateway.service -n 50
```

### Port already in use

```sh
lsof -i :18789
```

### out of memory

- Make sure the swap step above is in `/etc/fstab` so it survives reboots.
- Prefer API-based models (Claude, GPT) over local ones — local LLM inference does not fit in 1 GB.
- Set `agents.defaults.model.primary` to a smaller model if you hit OOMs on large prompts.
- Monitor with `free -h` and `htop`.

## OpenClaw Tray

### 1. 连接gateway

在网关主机上执行来获取设置码
openclaw qr --url ws://your-gateway-ip:18789

#### clash tailscale nameserver-policy

clash配置文件覆写追加

```sh
dns:
  nameserver-policy:
    <+.ts.net>:
      - "100.100.100.100"
```

rules添加直连规则

```sh
DOMAIN-SUFFIX,ts.net
```

### 2. 审批Node

```sh
# 逐一审批
openclaw devices approve abc123...
openclaw devices approve def456...

# 查看已连接的 Nodes
openclaw nodes status
```

### 代理问题

warn gateway/ws {"subsystem":"gateway/ws"} Proxy headers detected from untrusted address. Connection will not be treated as local. Configure gateway.trustedProxies to restore local client detection behind your proxy.

## node

```sh
openclaw node status

# Configure defaults (gateway config) gateway上执行
openclaw config set tools.exec.host node
openclaw config set tools.exec.security allowlist
openclaw config set tools.exec.node "<id-or-name>"
```
