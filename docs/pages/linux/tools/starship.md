# starship

探索[Starship 文档](https://starship.rs/zh-CN/guide/)来安装

```sh
# 检查字体是否能正常显示. 这个字体是通过本地terminal显示给你看的,并不需要去vps上安装
echo "\uf303 \uf4fc \ue0a0 \ue0b0"

# 记得 vim ~/.zshrc 文件末尾添加
eval "$(starship init zsh)"
```

## config

写入配置文件: `mkdir -p ~/.config && touch ~/.config/starship.toml`

```toml
# 根据 schema 提供自动补全: 在vscode中编辑starship.toml时会自动提示补全?
"$schema" = 'https://starship.rs/config-schema.json'

# 在提示符之间插入空行
add_newline = true

# format = '$all${line_break}$cmd_duration$character'

# 将提示符中的 '❯' 替换为 '➜'
[character] # 此组件名称为 'character'

# 将 'success_symbol' 字段设置成颜色为 'bold green' 的 '➜'
success_symbol = '[➜](bold green)'
error_symbol = '[✗](bold red)'
vimcmd_symbol = '[V](bold green)'

[localip]
ssh_only = false
format = '@[$localipv4](bold red) '
disabled = true

[username]
#style_user = '#CD5C5C'
format = '[$user]($style) at '
show_always = true

[time]
disabled = true

[aws]
symbol = "  "

[buf]
symbol = " "

[bun]
symbol = " "

[c]
symbol = " "

[cpp]
symbol = " "

[cmake]
symbol = " "

[cmd_duration]
min_time = 0
show_milliseconds = true

[conda]
symbol = " "

[crystal]
symbol = " "

[dart]
symbol = " "

[deno]
symbol = " "

[directory]
truncation_length = 0
truncate_to_repo = false
read_only = " 󰌾"

[docker_context]
symbol = " "

[elixir]
symbol = " "

[elm]
symbol = " "

[fennel]
symbol = " "

[fossil_branch]
symbol = " "

[gcloud]
symbol = "  "

[git_branch]
symbol = " "

[git_commit]
tag_symbol = '  '

[golang]
symbol = " "

[guix_shell]
symbol = " "

[haskell]
symbol = " "

[haxe]
symbol = " "

[hg_branch]
symbol = " "

[hostname]
style = 'bold green'
ssh_only = true
ssh_symbol = " "


[java]
symbol = " "

[julia]
symbol = " "

[kotlin]
symbol = " "

[lua]
symbol = " "

[memory_usage]
symbol = "󰍛 "

[meson]
symbol = "󰔷 "

[nim]
symbol = "󰆥 "

[nix_shell]
symbol = " "

[nodejs]
symbol = " "

[ocaml]
symbol = " "

[os]
format = "on [($name $symbol)]($style)"
style = "bold blue"
disabled = true

[os.symbols]
Alpaquita = " "
Alpine = " "
AlmaLinux = " "
Amazon = " "
Android = " "
Arch = " "
Artix = " "
CachyOS = " "
CentOS = " "
Debian = " "
DragonFly = " "
Emscripten = " "
EndeavourOS = " "
Fedora = " "
FreeBSD = " "
Garuda = "󰛓 "
Gentoo = " "
HardenedBSD = "󰞌 "
Illumos = "󰈸 "
Kali = " "
Linux = " "
Mabox = " "
Macos = " "
Manjaro = " "
Mariner = " "
MidnightBSD = " "
Mint = " "
NetBSD = " "
NixOS = " "
Nobara = " "
OpenBSD = "󰈺 "
openSUSE = " "
OracleLinux = "󰌷 "
Pop = " "
Raspbian = " "
Redhat = " "
RedHatEnterprise = " "
RockyLinux = " "
Redox = "󰀘 "
Solus = "󰠳 "
SUSE = " "
Ubuntu = " "
Unknown = " "
Void = " "
Windows = "󰍲 "

[package]
symbol = "󰏗 "

[perl]
symbol = " "

[php]
symbol = " "

[pijul_channel]
symbol = " "

[pixi]
symbol = "󰏗 "

[python]
symbol = " "

[rlang]
symbol = "󰟔 "

[ruby]
symbol = " "

[rust]
symbol = "󱘗 "

[scala]
symbol = " "

[swift]
symbol = " "

[zig]
symbol = " "

[gradle]
symbol = " "
```
