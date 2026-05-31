# H-UI 面板

使用 [h-ui 面板](https://github.com/jonssonyan/h-ui)

## docker 部署 {#docker-deployment}

> [!TIP]
> 可以使用 [shell 脚本](https://github.com/jonssonyan/h-ui?tab=readme-ov-file#deployment)一键部署,也是 h-ui 作者推荐的方式

> port default 8081
>
> 额外映射 `/h-ui/my_acme_dir` 目录

```sh
docker run -d --cap-add=NET_ADMIN \
  --name h-ui --restart always \
  --network=host \
  -e TZ=Asia/Shanghai \
  -v /h-ui/bin:/h-ui/bin \
  -v /h-ui/data:/h-ui/data \
  -v /h-ui/export:/h-ui/export \
  -v /h-ui/logs:/h-ui/logs \
  -v /h-ui/my_acme_dir:/h-ui/my_acme_dir \
  jonssonyan/h-ui \
  ./h-ui -p 8081
```

### 开放防火墙端口

```sh
sudo ufw allow 8081/tcp
sudo ufw allow "Nginx Full"
```

### docker uninstall

```sh
# 删除container
docker rm -f h-ui
# 删除image
docker rmi jonssonyan/h-ui
# 删除本地映射
rm -rf /h-ui
```

## nginx 反向代理{#nginx-reverse-proxy}

实现访问泛域名(不加端口号)跳转到 vps 上指定端口上的服务

**需要替换变量 `${example.com}`**

`vim /etc/nginx/sites-available/${example.com}`

```sh
server {
    server_name ${example.com};

    location / {
        proxy_pass http://localhost:8081;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

    }

    listen [::]:443 ssl ipv6only=on;
    listen 443 ssl;
    ssl_certificate /h-ui/my_acme_dir/certificates/acme-v02.api.letsencrypt.org-directory/${example.com}/${example.com}.crt;
    ssl_certificate_key /h-ui/my_acme_dir/certificates/acme-v02.api.letsencrypt.org-directory/${example.com}/${example.com}.key;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

}


server {
    listen 80;
    listen [::]:80;
    server_name ${example.com};

    # 重定向
    return 301 https://$host$request_uri;
}
```

### nginx reload

```sh
# 软链
sudo ln -s /etc/nginx/sites-available/${example.com} /etc/nginx/sites-enabled/

# 生成 `options-ssl-nginx.conf` 文件
# sudo curl -o /etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf

# reload
sudo nginx -t
sudo systemctl reload nginx
```

## shadowrocket 分流规则

[国内外划分](https://github.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever#%E5%9B%BD%E5%86%85%E5%A4%96%E5%88%92%E5%88%86)

[国内外划分 + 去除广告](https://github.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever#%E5%9B%BD%E5%86%85%E5%A4%96%E5%88%92%E5%88%86--%E5%B9%BF%E5%91%8A)

### 网速影响

- 上千行的代理规则，会对上网速度产生影响吗？

  > 我之前也认为这是一个每次网络数据包经过都会执行一次的规则文件，逐行匹配规则，所以需要尽可能精简。但后来和 SR 作者交流后发现这是一个误区，SR 在每次加载规则时都会生成一棵搜索树，可以理解为对主机名从后往前的有限状态机 DFA，并不是逐行匹配，并且对每次的匹配结果还有个哈希缓存。
  >
  > 换句话说，2000 行的规则和 50 行的规则在 SR 中均为同一量级的时间复杂度 O(1)。

- 无法正常跳转 Safari 对 google.cn 的请求
  > 轻击配置 -> 轻击本地文件中正在使用的规则文件后的ℹ️ -> HTTPS 解密 -> 将右上角开关启动 -> 安装证书 -> 允许 -> 打开系统设置 -> 已下载描述文件 -> 安装 -> 输入密码 -> 安装 -> 通用 -> 关于本机 -> 证书信任设置 -> 对刚刚安装的根证书完全信任 即可正常跳转。
